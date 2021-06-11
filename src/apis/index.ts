import { get, post, put } from '../utils/network';
import { ProfilePayload } from '../modules/profile/types';
import { AllJobResponse } from '../modules/job/types';

export const registerUser = (data: any) => post('/mobile/register', data).then((res) => res.data);

export const getProfile = () => get('/mobile/profile').then((res) => res.data);

export const updateProfile = (data: Partial<ProfilePayload>) => put('/mobile/profile', data).then((res) => res.data);

export const getWallet = () => get('/mobile/wallet').then((res) => res.data);

export const getCategories = () => get('/job/categories').then((res) => res.data);
export const getJobStatus = () => get('/job/status').then((res) => res.data);
export const getApplicationStatus = () => get('/job/application/status').then((res) => res.data);

export const getAllJobs = (params = { sort: 'desc' }): Promise<AllJobResponse> =>
  get('/mobile/job', { params }).then((res) => res.data);
