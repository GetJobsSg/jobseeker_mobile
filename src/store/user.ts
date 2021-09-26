import { Instance, SnapshotOut, types, flow, toGenerator } from 'mobx-state-tree';
import * as apis from '../apis';
import { withErrorHandler, withRootStore } from './extensions';
import {
  PersonalInfoFormData,
  NricFormData,
  NRICPayload,
  PersonalPhotoData,
  PersonalPhotoPayload,
  OTPVerifyType,
} from '../modules/profile/types';
import { IVerificationStatus } from '../constants/types';
import { constructUploadImagePayload } from '../utils/image';

const parseVaccinatedStatus = (vaccinated: boolean | null) => {
  if (vaccinated === null) return null;
  if (vaccinated === true) return 1;
  return 0;
};

export const UserStore = types
  .model('UserStore')
  .props({
    // user profile
    profileImg: types.optional(types.string, ''),
    firstName: types.optional(types.string, ''),
    lastName: types.optional(types.string, ''),
    birthDate: types.optional(types.string, ''),
    email: types.optional(types.string, ''),
    mobile: types.optional(types.string, ''),
    nric: types.optional(types.string, ''),
    nricFront: types.optional(types.string, ''),
    nricBack: types.optional(types.string, ''),
    educationLevelID: types.maybeNull(types.number),
    emailVerified: types.optional(types.boolean, false),
    mobileVerified: types.optional(types.boolean, false),
    vaccinated: types.maybeNull(types.number),
    verificationStatus: types.optional(types.number, IVerificationStatus.NOT_INITIATED),
    gender: types.maybeNull(types.number),
    trainingCompleted: types.optional(types.boolean, false),
    rating: types.optional(types.number, 0),
    completedJobs: types.optional(types.number, 0),
    totalWorkHours: types.optional(types.number, 0),
    isLoading: types.optional(types.boolean, false),
    isUpdating: types.optional(types.boolean, false),
    error: types.optional(types.string, ''),
    // mobile or email otp
    isSendingOTP: types.optional(types.boolean, false),
    sendOTPError: types.optional(types.string, ''),
    isVerifyingOTP: types.optional(types.boolean, false),
    verifyOTPError: types.optional(types.string, ''),
  })
  .views((self) => ({
    get name() {
      return `${self.firstName} ${self.lastName}`;
    },
    get isPersonalPhotoUploaded() {
      return !!self.profileImg;
    },
    get isPersonalInfoCompleted() {
      // either email or mobile is not verify === profile incomplete
      if (!self.emailVerified || !self.mobileVerified) return false;

      // either one field is not updated = profile incomplete
      const requiredItem = [self.firstName, self.lastName, self.mobile, self.gender, self.educationLevelID];
      const incompleteField = requiredItem.filter((value) => !value);
      return incompleteField.length === 0;
    },
    get isNRICInfoCompleted() {
      return !!(self.nricFront && self.nricBack);
    },
    get isTrainingCompleted() {
      return self.trainingCompleted;
    },
  }))
  .extend(withErrorHandler)
  .extend(withRootStore)
  .actions((self) => ({
    getUser: flow(function* getUser() {
      try {
        self.isLoading = true;
        const res = yield* toGenerator(apis.getProfile());
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { profile, job_statistics } = res.data;

        self.profileImg = profile.profile_img || '';
        self.firstName = profile.first_name || '';
        self.lastName = profile.last_name || '';
        self.email = profile.email || '';
        self.mobile = profile.mobile || '';
        self.nric = profile.nric_no || '';
        self.nricFront = profile.nric_front_img || '';
        self.nricBack = profile.nric_back_img || '';
        self.birthDate = profile.dob || '';
        self.educationLevelID = profile.education_level_id || null;
        self.emailVerified = profile.email_verified || false;
        self.mobileVerified = profile.mobile_verified || false;
        self.verificationStatus = profile.verification_status?.id || IVerificationStatus.NOT_INITIATED;
        self.vaccinated = parseVaccinatedStatus(profile.vaccinated);
        self.gender = profile.gender?.id || null;
        self.trainingCompleted = profile.training_completed;
        self.rating = job_statistics.rating;
        self.completedJobs = job_statistics.completed_jobs;
        self.totalWorkHours = job_statistics.total_work_hours;
      } catch (e) {
        self.error = self.getErrMsg(e);
      } finally {
        self.isLoading = false;
      }
    }),
  }))
  .actions((self) => ({
    updateUser: flow(function* updateUser(values: PersonalInfoFormData) {
      try {
        self.isUpdating = true;
        self.rootStore.uiStore.showLoadingSpinner();
        yield apis.updateProfile({
          first_name: values.firstName,
          last_name: values.lastName,
          dob: values.birthDate,
          gender_id: values.gender,
          education_level_id: values.educationLevelID,
          vaccinated: values.vaccinated === 1,
        });
        yield self.getUser();
      } catch (e) {
        self.error = self.getErrMsg(e);
      } finally {
        self.isUpdating = false;
        self.rootStore.uiStore.hideLoadingSpinner();
      }
    }),

    uploadPersonalPhoto: flow(function* uploadPersonalPhoto(value: PersonalPhotoData) {
      try {
        self.isUpdating = true;
        self.rootStore.uiStore.showLoadingSpinner();
        const data: PersonalPhotoPayload = { profile_img: constructUploadImagePayload(value.profileImage) };
        yield apis.updateProfile(data);
        yield self.getUser();
      } catch (e) {
        self.error = self.getErrMsg(e);
      } finally {
        self.isUpdating = false;
        self.rootStore.uiStore.hideLoadingSpinner();
      }
    }),

    updateNricInfo: flow(function* updateNricInfo(values: NricFormData) {
      try {
        self.isUpdating = true;
        self.rootStore.uiStore.showLoadingSpinner();

        const data: NRICPayload = {};

        if (values.nricNo) data.nric_no = values.nricNo.toUpperCase();
        if (values.nricFront) data.nric_front_img = constructUploadImagePayload(values.nricFront);
        if (values.nricBack) data.nric_back_img = constructUploadImagePayload(values.nricBack);

        yield apis.updateProfile(data);
        yield self.getUser();
      } catch (e) {
        self.error = self.getErrMsg(e);
      } finally {
        self.isUpdating = false;
        self.rootStore.uiStore.hideLoadingSpinner();
      }
    }),

    updateMobileNumber: flow(function* updateMobileNumber(mobile: string) {
      try {
        self.isSendingOTP = true;
        self.verifyOTPError = '';
        self.rootStore.uiStore.showLoadingSpinner();
        yield apis.updateProfile({ mobile });
        yield apis.resendOTP('mobile');
      } catch (e) {
        self.sendOTPError = self.getErrMsg(e);
      } finally {
        self.rootStore.uiStore.hideLoadingSpinner();
        self.isSendingOTP = false;
      }
    }),

    resendOTP: flow(function* resendOTP(contactType: OTPVerifyType) {
      try {
        self.isSendingOTP = true;
        self.rootStore.uiStore.showLoadingSpinner();
        yield apis.resendOTP(contactType);
      } catch (e) {
        self.sendOTPError = self.getErrMsg(e);
      } finally {
        self.rootStore.uiStore.hideLoadingSpinner();
        self.isSendingOTP = false;
      }
    }),

    verifyOTP: flow(function* verifyOTP(contactType: OTPVerifyType, code: string) {
      try {
        self.isVerifyingOTP = true;
        self.verifyOTPError = '';
        self.rootStore.uiStore.showLoadingSpinner();
        yield apis.verifyOTP(contactType, code);
        yield self.getUser();
      } catch (e) {
        self.verifyOTPError = self.getErrMsg(e);
      } finally {
        self.rootStore.uiStore.hideLoadingSpinner();
        self.isVerifyingOTP = false;
      }
    }),

    completeTraining: flow(function* completeTraining() {
      try {
        self.isUpdating = true;
        self.rootStore.uiStore.showLoadingSpinner();
        yield apis.updateProfile({
          training_completed: true,
        });
        yield self.getUser();
      } catch (e) {
        self.error = self.getErrMsg(e);
      } finally {
        self.isUpdating = false;
        self.rootStore.uiStore.hideLoadingSpinner();
      }
    }),
  }));

type UserStoreInstance = Instance<typeof UserStore>;
export interface User extends UserStoreInstance {}

type UserStoreSnapshotType = SnapshotOut<typeof UserStore>;
export interface UserStoreSnapshot extends UserStoreSnapshotType {}
