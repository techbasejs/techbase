import { AxiosRequestConfig, AxiosResponse, AxiosInstance } from "axios";
import queryString from "query-string";

export interface RequestOptions extends Partial<APIClientConfig> {
  method: HTTPMethod;
  url: string;
  data?: any;
  params?: Record<string, any>;
}
export interface Interceptor<T> {
  onFulfilled?: (value: T) => T | Promise<T>;
  onRejected?: (error: any) => any | Promise<any>;
}

export type ResponseHook = (
  response: AxiosResponse,
) => AxiosResponse | Promise<AxiosResponse>;
export type ErrorHook = (error: any) => any | Promise<any>;
export type RetryHook = (
  retryCount: number,
  error: any,
) => boolean | Promise<boolean>;
export type RequestHook = (
  config: APIClientConfig,
) => Promise<APIClientConfig> | APIClientConfig;
export type RedirectHook = (
  url: string,
  response: AxiosResponse,
) => string | Promise<string>;
export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface RetryConfig {
  attempts: number;
  delay: number;
  statusCodes?: number[];
  httpMethods?: HTTPMethod[];
}
export interface APIClientConfig extends Omit<AxiosRequestConfig, "method"> {
  method?: HTTPMethod;
  baseURL?: string;
  headers?: Record<string, string>;
  timeout?: number;
  useAuth?: boolean;
  isRefreshing?: boolean;
  url?: string;
  body?: any;
  data?: any;
  retry?: RetryConfig;
  cache?: {
    provider: CacheProvider;
    ttl?: number; // Time to live in seconds
    keyPrefix?: string;
  };
  hooks?: {
    afterResponse?: ResponseHook[];
    beforeError?: ErrorHook[];
    beforeRetry?: RetryHook[];
    beforeRequest?: RequestHook[];
    beforeRedirect?: RedirectHook[];
  };
  queryConfig?: queryString.StringifyOptions | undefined;
  _retry?: boolean;
}
export interface CustomRequestConfig extends AxiosRequestConfig {
  type?: "json" | "text" | "blob" | "arrayBuffer";
  parseResponse?: (response: any) => any;
}

export const CONTENT_TYPES = {
  html: "text/html",
  json: "application/json",
  xml: "application/xml",
  urlencoded: "application/x-www-form-urlencoded",
  form: "application/x-www-form-urlencoded",
  formData: "multipart/form-data",
  text: "text/plain",
  "octet-stream": "application/octet-stream",
};
export interface RequestAdapter {
  request<T = any>(config: APIClientConfig): Promise<T>;

  setInterceptors(interceptors: {
    request: (
      config: APIClientConfig,
    ) => APIClientConfig | Promise<APIClientConfig>;
    requestError: (error: any) => Promise<any>;
    response: (response: any) => any | Promise<any>;
    responseError: (error: any) => Promise<any>;
  }): void;

  cancelRequests(message?: string): void;
}

export interface FetchAdapter extends RequestAdapter {
  // Fetch-specific methods or properties can be added here
}

export interface AxiosAdapter extends RequestAdapter {
  // Axios-specific methods or properties can be added here
  axiosInstance: AxiosInstance;
}
export interface RefreshTokenConfig {
  refreshTokenUrl: string;
  getRefreshToken: () => Promise<string | null>;
  getAccessToken: () => Promise<string | null>;
  extractAccessToken: (response: any) => string;
  onRefreshSuccess?: (newToken: string, response: any) => Promise<void>;
  onRefreshFailure?: (error: any) => Promise<void>;
  createRefreshRequest?: (refreshToken: string) => {
    method: string;
    url: string;
    data?: any;
    headers?: Record<string, string>;
  };
}
export type ContentType = keyof typeof CONTENT_TYPES;
export interface CacheProvider {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttl?: number): Promise<void>;
  clear(): Promise<void>;
}
