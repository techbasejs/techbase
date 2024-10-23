import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { AxiosAdapter, APIClientConfig, HTTPMethod } from "../types";

export class AxiosAdapterImpl implements AxiosAdapter {
  axiosInstance: AxiosInstance;

  constructor(config: APIClientConfig) {
    this.axiosInstance = axios.create(config);
  }

  async request<T = any>(
    config: APIClientConfig & {
      method: HTTPMethod;
      url: string;
      data?: any;
      params?: any;
    },
  ): Promise<any> {
    const response = await this.axiosInstance.request<T>(config);
    return response;
  }

  setInterceptors(interceptors: {
    request: (config: APIClientConfig) => APIClientConfig;
    requestError: (error: any) => Promise<any>;
    response: (response: any) => any | Promise<any>;
    responseError: (error: any) => Promise<any>;
  }): void {
    this.axiosInstance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const apiClientConfig = config as APIClientConfig;
        const transformedConfig = await interceptors.request(apiClientConfig);
        return transformedConfig as InternalAxiosRequestConfig;
      },
      interceptors.requestError,
    );
    this.axiosInstance.interceptors.response.use(
      interceptors.response as (response: AxiosResponse) => AxiosResponse,
      interceptors.responseError,
    );
  }

  cancelRequests(message?: string): void {
    const source = axios.CancelToken.source();
    this.axiosInstance.defaults.cancelToken = source.token;
    if (message) {
      source.cancel(message);
    }
  }
}
