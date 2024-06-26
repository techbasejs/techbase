import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import qs from "qs";
import { RequestConfig, RequestOptions, Response, Interceptor } from "./types";
import { Utils } from "./utils";

export class HttpClient {
  private instance: AxiosInstance;
  private defaults: RequestConfig;
  private isRefreshing: boolean;
  private refreshTokenPromise: Promise<string> | null;

  constructor(config: any = {}) {
    this.defaults = config;
    this.isRefreshing = false;
    this.refreshTokenPromise = null;

    this.instance = axios.create({
      baseURL: config.baseURL,
      headers: config.headers,
      timeout: config.timeout,
      auth: config.auth,
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: "brackets" }),
    });

    // Request interceptor
    this.instance.interceptors.request.use((config: any) => {
      // Set token from cookies if exists
      if (config.useAuthorization) {
        const token = Utils.getToken();
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
      }

      // Set Content-Type based on data
      if (config.data && !config.headers["Content-Type"]) {
        config.headers["Content-Type"] = Utils.getContentType(config.data);
      }

      return config;
    });

    // Response interceptor
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => this.handleResponseError(error),
    );
  }

  private async handleResponseError(error: any): Promise<any> {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      if (this.isRefreshing) {
        await this.refreshTokenPromise;
      } else {
        originalRequest._retry = true;
        this.isRefreshing = true;
        this.refreshTokenPromise = this.refreshToken();

        const newToken = await this.refreshTokenPromise;
        Utils.setToken(newToken);

        this.isRefreshing = false;
        this.refreshTokenPromise = null;

        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return this.instance(originalRequest);
      }
    }
    throw error;
  }

  private async refreshToken(): Promise<string> {
    // Implement your refresh token logic here, e.g., call refreshToken API
    const response = await this.instance.post("/refresh-token", {
      token: Utils.getRefreshToken(),
    });
    return response.data.token;
  }

  request<T = any>(options: RequestOptions): Promise<Response<T>> {
    const mergedOptions = { ...this.defaults, ...options };
    return this.instance
      .request<T>({
        method: mergedOptions.method,
        url: mergedOptions.url,
        data: mergedOptions.data,
        params: mergedOptions.params,
        headers: mergedOptions.headers,
        timeout: mergedOptions.timeout,
      })
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  private handleResponse<T>(response: AxiosResponse<T>): Response<T> {
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      config: response.config as RequestOptions,
    };
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error);
  }

  get<T = any>(url: string, config?: RequestConfig): Promise<Response<T>> {
    return this.request({ method: "GET", url, ...config });
  }

  post<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<Response<T>> {
    return this.request({ method: "POST", url, data, ...config });
  }

  put<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig,
  ): Promise<Response<T>> {
    return this.request({ method: "PUT", url, data, ...config });
  }

  delete<T = any>(url: string, config?: RequestConfig): Promise<Response<T>> {
    return this.request({ method: "DELETE", url, ...config });
  }

  upload(
    url: string,
    files: FileList | File,
    config?: RequestConfig,
  ): Promise<Response<any>> {
    const formData = new FormData();
    if (files instanceof FileList) {
      for (const file of files) formData.append("files", file);
    } else {
      formData.append("file", files);
    }

    return this.request({
      method: "POST",
      url,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        ...config?.headers,
      },
      ...config,
    });
  }

  setBaseURL(baseURL: string): void {
    this.instance.defaults.baseURL = baseURL;
  }

  setHeader(key: string, value: string): void {
    this.instance.defaults.headers[key] = value;
  }

  getHeaders(): { [key: string]: string } {
    return this.instance.defaults.headers;
  }

  mergeHeaders(headers: { [key: string]: string }): void {
    this.instance.defaults.headers = {
      ...this.instance.defaults.headers.common,
      ...headers,
    };
  }

  interceptRequest(
    onFulfilled?: (
      value: AxiosRequestConfig,
    ) => AxiosRequestConfig | Promise<AxiosRequestConfig>,
    onRejected?: (error: any) => any,
  ): number {
    return this.instance.interceptors.request.use(onFulfilled, onRejected);
  }

  interceptResponse(
    onFulfilled?: (
      value: AxiosResponse,
    ) => AxiosResponse | Promise<AxiosResponse>,
    onRejected?: (error: any) => any,
  ): number {
    return this.instance.interceptors.response.use(onFulfilled, onRejected);
  }

  ejectRequestInterceptor(id: number): void {
    this.instance.interceptors.request.eject(id);
  }

  ejectResponseInterceptor(id: number): void {
    this.instance.interceptors.response.eject(id);
  }

  graphql<T = any>(
    endpoint: string,
    query: string,
    variables?: { [key: string]: any },
    config?: RequestConfig,
  ): Promise<Response<T>> {
    return this.post(
      endpoint,
      {
        query,
        variables,
      },
      {
        ...config,
        headers: {
          "Content-Type": "application/json",
          ...config?.headers,
        },
      },
    );
  }
}
