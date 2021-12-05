import { Routes } from '../../navigator/routes';

interface ClockInParams {
  type: 'clock-in';
  jobId: number;
}
interface ClockOutParams {
  type: 'clock-out';
  jobId: number;
}

export type JobParamsList = {
  [Routes.job_details]: { id: number };
  [Routes.punch_clock]: ClockInParams | ClockOutParams;
};

export type MyJobsStatus = 'applied' | 'ongoing' | 'upcoming' | 'completed';
export interface MyJobsRequestParams {
  status: MyJobsStatus;
}

export interface CompanyInfo {
  id: number;
  name: string;
  desc: string; // description
  primary_contact: string;
  logo_img: string;
  date_updated: string;
  date_created: string;
}

export interface DressCodeInfo {
  id: number;
  name: string;
  date_updated: string;
  date_created: string;
}

export interface CategoryInfo {
  id: number;
  name: string;
  date_updated: string;
  date_created: string;
}

export interface JobStatus {
  id: number;
  name: string;
  date_updated: string;
  date_created: string;
}

export interface JobInfo {
  id: number;
  reference_code: string;
  title: string;
  desc: string;
  requirements: string;
  responsibilities: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  hourly_rate: number;
  hourly_bill_rate: number;
  start_code: string;
  end_code: string;
  company: CompanyInfo;
  dress_code: DressCodeInfo;
  job_category: CategoryInfo;
  job_status: JobStatus;
  date_updated: string;
  date_created: string;
}

export interface JobLocation {
  id: number;
  address: string;
  postal_code: string;
  block_no: string;
  unit_no: string;
  date_updated: string;
  date_created: string;
}

export interface JobDetails {
  job: JobInfo;
  job_locations: JobLocation[];
  job_application_status_id: number;
}

export type JobInfoResponse = {
  data: JobDetails;
};

export type AllJobResponse = {
  data: JobDetails[] | null;
};
