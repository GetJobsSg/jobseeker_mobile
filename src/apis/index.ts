import { get, post } from '../utils/network';

export const registerUser = (data: any) => post('/mobile/register', data).then((res) => res.data);

export const getProfile = () => get('/mobile/profile').then((res) => res.data);
