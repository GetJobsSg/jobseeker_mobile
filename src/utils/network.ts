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

const testToken =
  'eyJhbGciOiJSUzI1NiIsImtpZCI6IjNkOWNmYWE4OGVmMDViNDI0YmU2MjA1ZjQ2YjE4OGQ3MzI1N2JjNDIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZ2V0am9icy1qb2JzZWVrZXItZGV2IiwiYXVkIjoiZ2V0am9icy1qb2JzZWVrZXItZGV2IiwiYXV0aF90aW1lIjoxNjIxNzc0MjU5LCJ1c2VyX2lkIjoidlRIcHdCbHJsSGVHTG52c05VVTZyVExGRFp4MiIsInN1YiI6InZUSHB3QmxybEhlR0xudnNOVVU2clRMRkRaeDIiLCJpYXQiOjE2MjE3NzQyNTksImV4cCI6MTYyMTc3Nzg1OSwiZW1haWwiOiJiZW5zb243NjY3QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJiZW5zb243NjY3QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.TD_paRqJE_8K2VDqlWhlmg-qYtv-Tlm1VJyDc8oPrkp1LUum8b89xY4zehpHRv_TWUk_XNj_xPiCi1sC6tpIg1u_UXCKgpRWCO7WvyiLerBUGpSKN99hy6FOKH2sAbFuzUkArxEy6-1K3yCYajIz_sfN5ROZIonqX1pr1sVgQm2tyiWONCTZvxfPtjat3jdYx5klFLANVWITwI32smDIjGF-uP5KKHFSlIitO9AchH6hEshKFMF6dWQt-0rpLCFKiv6p5oEGY1g41lDEhELeqkaeuGpDWPmYfzqPVKL_6zbaSyLr7I9oxFw9Nccuh35kzc0V2kDf6S_ItstPRnxJyw';

const appendHeader = (axiosConfig: AxiosRequestConfig) => {
  axiosConfig.headers.Authorization = testToken;
  return axiosConfig;
};

const errorHandler = (err: any) => Promise.reject(err);

agent.interceptors.request.use(appendHeader, errorHandler);

export const get = (_uri: string, _config?: AxiosRequestConfig) => agent.get(_uri, _config);
export const post = (_uri: string, _data?: any, _config?: AxiosRequestConfig) => agent.post(_uri, _data, _config);
export const put = (_uri: string, _data?: any, _config?: AxiosRequestConfig) => agent.post(_uri, _data, _config);
export const patch = (_uri: string, _data?: any, _config?: AxiosRequestConfig) => agent.patch(_uri, _data, _config);
export const del = (_uri: string, _config?: AxiosRequestConfig) => agent.delete(_uri, _config);
