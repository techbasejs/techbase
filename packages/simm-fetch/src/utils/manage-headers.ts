import { AxiosRequestConfig } from 'axios';
import { APIClientConfig } from '../types';

export const setHeaders = (config: AxiosRequestConfig, headers: Record<string, string>): AxiosRequestConfig => {
  config.headers = { ...config.headers, ...headers };
  return config;
};

export const setAuthHeader = (config: APIClientConfig, token: string, type: 'Bearer' | 'APIKey'): AxiosRequestConfig => {
  config.headers['Authorization'] = `${type} ${token}`;
  return config;
};

export const setContentTypeHeader = (config: APIClientConfig, contentType: string): APIClientConfig => {
  config.headers['Content-Type'] = contentType;
  return config;
};
