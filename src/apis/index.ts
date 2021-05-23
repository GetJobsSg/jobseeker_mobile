import { post } from '../utils/network';

export const registerUser = (data: any) => post('/mobile/register', data);
