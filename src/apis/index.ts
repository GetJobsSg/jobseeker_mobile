import { get, post, put } from '../utils/network';

export const registerUser = (data: any) => post('/mobile/register', data).then((res) => res.data);

export const getProfile = () => get('/mobile/profile').then((res) => res.data);
export const updateProfile = (data: any) => put('/mobile/profile', data).then((res) => res.data);
