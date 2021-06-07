import axios, { AxiosRequestConfig } from 'axios';
import auth from '@react-native-firebase/auth';
import jwtDecode from 'jwt-decode';
import config from '../config';
import { getItem, StorageKey } from './storage';

const defaultRequestConfig: AxiosRequestConfig = {
  baseURL: config.apiHost,
  timeout: config.networkTimeout,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const agent = axios.create({ ...defaultRequestConfig });

const isTokenExpired = (token: string) => {
  const { exp } = jwtDecode(token) as any;
  const isExpired = Date.now() / 1000 > exp;
  return isExpired;
};

const appendHeader = async (axiosConfig: AxiosRequestConfig) => {
  const accessToken = await getItem(StorageKey.ACCESS_TOKEN);

  if (!accessToken) {
    // eslint-disable-next-line no-console
    console.log('access token not found or not required...');
    return axiosConfig;
  }

  if (!isTokenExpired(accessToken)) {
    // eslint-disable-next-line no-console
    console.log('access token is not expired yet...');
    axiosConfig.headers.Authorization = accessToken;
    return axiosConfig;
  }

  // handle edge case where token is expired and we need to regenerate a new one
  try {
    // eslint-disable-next-line no-console
    console.log('refreshing new token...');

    // this should trigger idTokenChanged @see AuthProvider component
    const token = await auth().currentUser?.getIdToken();
    axiosConfig.headers.Authorization = token;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('error on refresh new token', e);
  }

  return axiosConfig;
};
const errorHandler = (err: any) => Promise.reject(err);

agent.interceptors.request.use(appendHeader, errorHandler);

export const get = (_uri: string, _config?: AxiosRequestConfig) => agent.get(_uri, _config);
export const post = (_uri: string, _data?: any, _config?: AxiosRequestConfig) => agent.post(_uri, _data, _config);
export const put = (_uri: string, _data?: any, _config?: AxiosRequestConfig) => agent.put(_uri, _data, _config);
export const patch = (_uri: string, _data?: any, _config?: AxiosRequestConfig) => agent.patch(_uri, _data, _config);
export const del = (_uri: string, _config?: AxiosRequestConfig) => agent.delete(_uri, _config);
