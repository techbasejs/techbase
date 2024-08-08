import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { APIClientConfig, HTTPMethod } from "./types";
import { mergeConfigs } from "./utils/merge-configs";
import { appendQueryParams } from "./utils/query-params";
import { Utils } from "./utils";
import {
  handleRequestError,
  handleRequestSuccess,
  handleResponseError,
  handleResponseSuccess,
} from "./utils/index";
import { handleRetry } from "./utils/handle-retry";

class APIClient {
  private axiosInstance: AxiosInstance;
  private config: APIClientConfig;
  private refreshSubscribers: Array<(token: string) => void> = [];
  constructor(config: APIClientConfig) {
    this.config = config;
    this.axiosInstance = axios.create(config);
    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.axiosInstance.interceptors.request.use(
      (config) => handleRequestSuccess(config, this.config),
      (error) => Promise.reject(handleRequestError(error)),
    );

    this.axiosInstance.interceptors.response.use(
      async (response) => await handleResponseSuccess(response, this.config),
      async (error: AxiosError) => await this.handleResponseCondition(error),
    );
  }

  private async handleResponseCondition(
    error: AxiosError,
  ): Promise<AxiosResponse> {
    if (this.config.isRetry) {
      const retryRequest = await handleRetry(
        () =>
          this.axiosInstance.request({
            method: this.config.method,
            url: this.config.url,
            data: this.config.data,
          }),
        this.config,
      );
      return retryRequest;
    }
    return handleResponseError(error, this.config);
  }

  private async request<T>(
    method: HTTPMethod,
    url: string,
    data?: any,
    params?: any,
    config?: APIClientConfig,
  ): Promise<AxiosResponse<T>> {
    let modifyUrl = Utils.isValidUrl(this.config?.baseURL + url)
      ? this.config?.baseURL + url
      : this.config?.baseURL;
    this.config = mergeConfigs(this.config, config || {});
    modifyUrl = params ? appendQueryParams(modifyUrl, params) : modifyUrl;
    this.config.url = modifyUrl;
    this.config.method = method;
    this.config.data = data;

    return await this.axiosInstance.request<T>({
      method: method,
      url: modifyUrl,
      data: data,
    });
  }

  public async get<T>(
    url: string,
    params?: any,
    config?: APIClientConfig,
  ): Promise<AxiosResponse<T>> {
    return await this.request<T>("GET", url, null, params, config);
  }

  public async post<T>(
    url: string,
    data: any,
    config?: APIClientConfig,
  ): Promise<AxiosResponse<T>> {
    return await this.request<T>("POST", url, data, null, config);
  }

  public async put<T>(
    url: string,
    data: any,
    config?: APIClientConfig,
  ): Promise<AxiosResponse<T>> {
    return await this.request<T>("PUT", url, data, null, config);
  }

  public async delete<T>(
    url: string,
    config?: APIClientConfig,
  ): Promise<AxiosResponse<T>> {
    return await this.request<T>("DELETE", url, null, null, config);
  }

  cancelRequests(message?: string): void {
    this.axiosInstance.defaults.cancelToken = new axios.CancelToken((cancel) =>
      cancel(message),
    );
  }
}

export default APIClient;
