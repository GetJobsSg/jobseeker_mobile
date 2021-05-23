import axios, { AxiosRequestConfig } from 'axios';
import config from '../config';

const defaultRequestConfig: AxiosRequestConfig = {
  baseURL: config.apiHost,
  timeout: config.networkTimeout,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const agent = axios.create({ ...defaultRequestConfig });

const appendHeader = (axiosConfig: AxiosRequestConfig) => axiosConfig; // TODO: add authorization token header from storage
const errorHandler = (err: any) => Promise.reject(err);

agent.interceptors.request.use(appendHeader, errorHandler);

export const get = (_uri: string, _config?: AxiosRequestConfig) => agent.get(_uri, _config);
export const post = (_uri: string, _data?: any, _config?: AxiosRequestConfig) => agent.post(_uri, _data, _config);
export const put = (_uri: string, _data?: any, _config?: AxiosRequestConfig) => agent.post(_uri, _data, _config);
export const patch = (_uri: string, _data?: any, _config?: AxiosRequestConfig) => agent.patch(_uri, _data, _config);
export const del = (_uri: string, _config?: AxiosRequestConfig) => agent.delete(_uri, _config);
