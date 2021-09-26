import { Asset } from 'react-native-image-picker';
import { Routes } from '../../navigator/routes';

export type ProfileParamList = {
  [Routes.profile_completion]: undefined;
  [Routes.personal_photo]: undefined;
  [Routes.personal_info]: undefined;
  [Routes.nric_info]: undefined;
  [Routes.training]: undefined;
  [Routes.editMobile]: { mobile: string };
  [Routes.verifyEmail]: { email: string };
};

export interface PersonalInfoFormData {
  firstName: string;
  lastName: string;
  birthDate: string;
  educationLevelID: number | null;
  gender: number | null;
  vaccinated: number | null;
}

export type PersonalPhotoData = { profileImage: Asset };
export type PersonalPhotoPayload = Pick<ProfilePayload, 'profile_img'>;

export interface NricFormData {
  nricNo?: string;
  nricFront?: Asset;
  nricBack?: Asset;
}

export interface ProfilePayload {
  first_name: string;
  last_name: string;
  mobile: string;
  dob: string;
  gender_id: number | null;
  nric_no: string;
  nric_front_img: { ext: string; base64: string };
  nric_back_img: { ext: string; base64: string };
  profile_img: { ext: string; base64: string };
  education_level_id: number | null;
  vaccinated: boolean;
  training_completed: boolean;
}

export type OTPVerifyType = 'email' | 'mobile';

export type NRICPayload = Partial<Pick<ProfilePayload, 'nric_no' | 'nric_front_img' | 'nric_back_img'>>;

export interface ProfileInfoResponse {
  data: {
    profile: ProfileInfo;
    job_statistics: JobStatisticInfo;
  };
}

export interface ProfileInfo {
  id: number;
  profile_img: string | null;
  email: string;
  first_name: string;
  last_name: string;
  mobile: string;
  dob: string;
  nric_no: string;
  nric_front_img: string;
  nric_back_img: string;
  education_level_id: number | null;
  date_updated: string;
  date_created: string;
  email_verified: boolean;
  mobile_verified: boolean;
  verification_status: VerificationResponse;
  vaccinated: boolean | null;
  gender: GenderResponse | null;
  training_completed: boolean;
}

export interface GenderResponse {
  id: number;
  name: string;
  date_updated: string;
  date_created: string;
}

export interface VerificationResponse {
  id: number;
  name: string;
  date_created: string;
  date_updated: string;
}

export interface EducationResponse {
  id: number;
  name: string;
}

export interface JobStatisticInfo {
  rating: number;
  completed_jobs: number;
  total_work_hours: number;
}

export interface TrainingQuestion {
  question: string;
  isCompleted: number;
}
