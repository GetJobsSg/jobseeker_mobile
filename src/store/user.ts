import { Instance, SnapshotOut, types, flow } from 'mobx-state-tree';
import * as apis from '../apis';
import { withErrorHandler } from './extensions/errorsHandler';
import { PersonalInfoFormData, NricFormData, ProfileInfoResponse, ProfilePayload } from '../modules/profile/types';
import { getExtension } from '../utils/image';

export const UserStore = types
  .model('UserStore')
  .props({
    profileImg: types.maybeNull(types.string),
    firstName: types.optional(types.string, ''),
    lastName: types.optional(types.string, ''),
    birthDate: types.optional(types.string, ''),
    email: types.optional(types.string, ''),
    mobile: types.optional(types.string, ''),
    nric: types.optional(types.string, ''),
    nricFront: types.optional(types.string, ''),
    nricBack: types.optional(types.string, ''),
    verified: types.optional(types.boolean, false),
    gender: types.maybeNull(types.number),
    rating: types.optional(types.number, 0),
    completedJobs: types.optional(types.number, 0),
    totalWorkHours: types.optional(types.number, 0),
    isLoading: types.optional(types.boolean, false),
    isUpdating: types.optional(types.boolean, false),
    error: types.optional(types.string, ''),
  })
  .views((self) => ({
    get name() {
      return `${self.firstName} ${self.lastName}`;
    },
    get isPersonalInfoCompleted() {
      const requiredItem = [self.firstName, self.lastName, self.mobile, self.gender];
      const incompleteField = requiredItem.filter((value) => !value);
      return incompleteField.length === 0;
    },
    get isNRICInfoCompleted() {
      return !!(self.nricFront && self.nricBack);
    },
  }))
  .extend(withErrorHandler)
  .actions((self) => ({
    transformToState: (data: ProfileInfoResponse) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { profile, job_statistics } = data;
      self.profileImg = profile.profile_img || null;
      self.firstName = profile.first_name || '';
      self.lastName = profile.last_name || '';
      self.email = profile.email || '';
      self.mobile = profile.mobile || '';
      self.nric = profile.nric_no || '';
      self.nricFront = profile.nric_front_img || '';
      self.nricBack = profile.nric_back_img || '';
      self.birthDate = profile.dob || '';
      self.verified = profile.verified || false;
      self.gender = profile.gender?.id || null;
      self.rating = job_statistics.rating;
      self.completedJobs = job_statistics.completed_jobs;
      self.totalWorkHours = job_statistics.total_work_hours;
    },
  }))
  .actions((self) => ({
    getUser: flow(function* getUser() {
      try {
        self.isLoading = true;
        const { data: resp } = yield apis.getProfile();
        self.transformToState(resp);
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
        yield apis.updateProfile({
          first_name: values.firstName,
          last_name: values.lastName,
          dob: values.birthDate,
          mobile: values.mobile,
          gender_id: values.gender,
        });
        yield self.getUser();
      } catch (e) {
        self.error = self.getErrMsg(e);
      } finally {
        self.isUpdating = false;
      }
    }),
    uploadNric: flow(function* uploadNric(values: NricFormData) {
      try {
        self.isLoading = true;

        const data: Partial<ProfilePayload> = {};

        // there is a possibility where user only upload just one image - front or back
        if (values.nricFront) {
          data.nric_front_img = {
            ext: getExtension(values.nricFront?.type as string),
            base64: values.nricFront?.base64 as string,
          };
        }

        if (values.nricBack) {
          data.nric_back_img = {
            ext: getExtension(values.nricFront?.type as string),
            base64: values.nricFront?.base64 as string,
          };
        }

        yield apis.updateProfile(data);
        yield self.getUser();
      } catch (e) {
        self.error = self.getErrMsg(e);
      } finally {
        self.isLoading = false;
      }
    }),
  }));

type UserStoreInstance = Instance<typeof UserStore>;
export interface User extends UserStoreInstance {}

type UserStoreSnapshotType = SnapshotOut<typeof UserStore>;
export interface UserStoreSnapshot extends UserStoreSnapshotType {}
