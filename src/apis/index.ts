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

export const applyJob = (id: number): Promise<{}> => put(`/mobile/job/${id}/apply`).then((res) => res.data);

export const acceptOffer = (id: number): Promise<{}> => put(`/mobile/job/${id}/accept`).then((res) => res.data);

export const declineOffer = (id: number): Promise<{}> => put(`/mobile/job/${id}/decline`).then((res) => res.data);

export const clockIn = (id: number, code: string): Promise<{}> =>
  put(`/mobile/job/${id}/attendance/in`, { code }).then((res) => res.data);

export const clockOut = (id: number, code: string): Promise<{}> =>
  put(`/mobile/job/${id}/attendance/out`, { code }).then((res) => res.data);

export const getAttendanceDetails = (id: number) => get(`/mobile/job/${id}/attendance`).then((res) => res.data);

export const getInbox = () => get(`/mobile/inbox`).then((res) => res.data);

export const getAllTransactions = () => get(`/mobile/transactions`).then((res) => res.data);

export const getTransactionDetails = (id: number) => get(`/mobile/transaction/${id}`).then((res) => res.data);
