import { Asset } from 'react-native-image-picker';

export interface PersonalInfoFormData {
  firstName: string;
  lastName: string;
  mobile: string;
  birthDate: string;
  gender: number | null;
}

export interface NricFormData {
  nricFront?: Asset;
  nricBack?: Asset;
}

export interface ProfilePayload {
  first_name: string;
  last_name: string;
  mobile: string;
  dob: string;
  gender_id: number | null;
  nric_front_img: { ext: string; base64: string };
  nric_back_img: { ext: string; base64: string };
  profileImg: string;
}

export type NRICPayload = Partial<Pick<ProfilePayload, 'nric_front_img' | 'nric_back_img'>>;

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
  verified: boolean;
  date_updated: string;
  date_created: string;
  gender: GenderResponse | null;
}

export interface GenderResponse {
  id: number;
  name: string;
  date_updated: string;
  date_created: string;
}

export interface JobStatisticInfo {
  rating: number;
  completed_jobs: number;
  total_work_hours: number;
}
