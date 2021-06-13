import { get, post, put } from '../utils/network';
import { ProfilePayload, ProfileInfoResponse } from '../modules/profile/types';
import { AllJobResponse, JobInfoResponse, MyJobsRequestParams } from '../modules/job/types';

export const registerUser = (data: any) => post('/mobile/register', data).then((res) => res.data);

export const getProfile = (): Promise<ProfileInfoResponse> => get('/mobile/profile').then((res) => res.data);

export const updateProfile = (data: Partial<ProfilePayload>) => put('/mobile/profile', data).then((res) => res.data);

export const getWallet = () => get('/mobile/wallet').then((res) => res.data);

export const getCategories = () => get('/job/categories').then((res) => res.data);

export const getJobStatus = () => get('/job/status').then((res) => res.data);

export const getApplicationStatus = () => get('/job/application/status').then((res) => res.data);

export const getAllJobs = (params = { sort: 'desc' }): Promise<AllJobResponse> =>
  get('/mobile/job', { params }).then((res) => res.data);

export const getMyJobs = (options: MyJobsRequestParams): Promise<AllJobResponse> =>
  get(`/mobile/job/mine`, { params: options }).then((res) => res.data);

export const getJobDetails = (id: number): Promise<JobInfoResponse> => get(`/mobile/job/${id}`).then((res) => res.data);

export const applyJob = (id: number): Promise<{}> => put(`/mobile/job/apply/${id}`).then((res) => res.data);
