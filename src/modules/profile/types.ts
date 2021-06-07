export interface PersonalInfoState {
  firstName: string;
  lastName: string;
  mobile: string;
  birthDate: string;
  gender: number | null;
}

export interface PersonalInfoPayload {
  first_name: string;
  last_name: string;
  mobile: string;
  dob: string;
  gender_id: number | null;
}

export interface ProfileInfoResponse {
  profile: ProfileInfo;
  job_statistics: JobStatisticInfo;
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
