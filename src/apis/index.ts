import { get, post, put } from '../utils/network';
import { ProfilePayload } from '../modules/profile/types';

export const registerUser = (data: any) => post('/mobile/register', data).then((res) => res.data);

export const getProfile = () => get('/mobile/profile').then((res) => res.data);

export const updateProfile = (data: Partial<ProfilePayload>) => put('/mobile/profile', data).then((res) => res.data);

export const getWallet = () => get('/mobile/wallet').then((res) => res.data);
