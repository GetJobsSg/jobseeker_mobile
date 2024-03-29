import { get, post, put, del } from '../utils/network';
import { ProfilePayload, ProfileInfoResponse, OTPVerifyType } from '../modules/profile/types';
import { AllJobResponse, JobInfoResponse, MyJobsRequestParams } from '../modules/job/types';
import { IInboxDetailsResponse } from '../modules/inbox/types';

export const registerUser = (data: any) => post('/mobile/register', data).then((res) => res.data);

export const updateUserFcmToken = (token: string): Promise<{}> =>
  put(`/mobile/notification/token`, { token }).then((res) => res.data);

export const getProfile = (): Promise<ProfileInfoResponse> => get('/mobile/profile').then((res) => res.data);

export const updateProfile = (data: Partial<ProfilePayload>) => put('/mobile/profile', data).then((res) => res.data);

export const resendOTP = (contactType: OTPVerifyType) =>
  post(`/mobile/verification/resend/${contactType}`).then((res) => res.data);

export const verifyOTP = (contactType: OTPVerifyType, code: string) =>
  post(`/mobile/verification/verify/${contactType}`, { code }).then((res) => res.data);

export const getEducationLevel = () => get('/educationlevel').then((res) => res.data);

export const getBanks = () => get('/mobile/banks').then((res) => res.data);

export const getWallet = () => get('/mobile/wallet').then((res) => res.data);

export const withdrawWallet = (id: number): Promise<{}> =>
  post(`/mobile/wallet/withdraw/${id}`).then((res) => res.data);

export const getBankAccount = (id: number) => get(`/mobile/wallet/bank/${id}`).then((res) => res.data);

export const getBankAccounts = () => get('/mobile/wallet/bank').then((res) => res.data);

export const addBankAccount = (data: any) => post('/mobile/wallet/bank', data).then((res) => res.data);

export const deleteBankAccount = (id: number) => del(`/mobile/wallet/bank/${id}`).then((res) => res.data);

export const updateBankAccount = (id: number, data: any): Promise<{}> =>
  put(`/mobile/wallet/bank/${id}`, data).then((res) => res.data);

export const getCategories = () => get('/job/categories').then((res) => res.data);

export const getJobStatus = () => get('/job/status').then((res) => res.data);

export const getApplicationStatus = () => get('/job/application/status').then((res) => res.data);

export const getAllJobs = (params = { sort: 'desc' }): Promise<AllJobResponse> =>
  get('/mobile/job', { params }).then((res) => res.data);

export const getCompanyJobs = (id: number, params = { sort: 'desc' }): Promise<AllJobResponse> =>
  get(`/mobile/job/company/${id}`, { params }).then((res) => res.data);

export const getMyJobs = (options: MyJobsRequestParams): Promise<AllJobResponse> =>
  get(`/mobile/job/mine`, { params: options }).then((res) => res.data);

export const getCompanyDetails = (id: number) => get(`/mobile/company/${id}`).then((res) => res.data);

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

export const getInboxDetails = (id: number): Promise<IInboxDetailsResponse> =>
  get(`/mobile/inbox/${id}`).then((res) => res.data);

export const updateSeenReceipt = (id: number): Promise<{}> => put(`/mobile/inbox/${id}`).then((res) => res.data);

export const getAllTransactions = () => get(`/mobile/transactions`).then((res) => res.data);

export const getTransactionDetails = (id: number) => get(`/mobile/transaction/${id}`).then((res) => res.data);
