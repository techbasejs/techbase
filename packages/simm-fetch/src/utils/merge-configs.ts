import { AxiosRequestConfig } from 'axios';
import { APIClientConfig } from '../types';

export function mergeConfigs(defaultConfig: APIClientConfig, userConfig: AxiosRequestConfig): APIClientConfig {
  return { ...defaultConfig, ...userConfig,
    headers: {
      ...defaultConfig?.headers,
      ...userConfig?.headers,
    }, 
  };
}

