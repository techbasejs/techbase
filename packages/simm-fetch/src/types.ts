import { AxiosRequestConfig, AxiosResponse, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import queryString from "query-string";
// export interface RequestConfig {
//   baseURL?: string;
//   headers?: { [key: string]: string };
//   timeout?: number;
//   auth?:
//     | {
//         username: string;
//         password: string;
//       }
//     | {
//         token: string;
//       };
//   graphql?: {
//     endpoint: string;
//     query: string;
//     variables?: { [key: string]: any };
//   };
//   retry?: number;
//   useAuthorization?: boolean;
// }
// export interface RequestOptions extends RequestConfig {
//   method: "GET" | "POST" | "PUT" | "DELETE";
//   url: string;
//   data?: any;
//   params?: { [key: string]: any };
// }
// export interface Response<T = any> {
//   data: T;
//   status: number;
//   statusText: string;
//   headers: { [key: string]: string };
//   config: RequestOptions;
// }
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

export type HTTPMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH";
export interface APIClientConfig extends Omit<AxiosRequestConfig, 'method'> {
  method?: HTTPMethod;
  baseURL?: string;
  headers?: Record<string, string>;
  timeout?: number;
  isRetry?: boolean;
  retries?: number;
  retryCount?: number;
  useAuth?: boolean;
  isRefreshing?: boolean;
  url?: string;
  body?: any;
  data?: any;
  retry?: {
    attempts: number;
    delay?: number;
  };
  hooks?: {
    beforeRequest?: Array<
      (
        config: AxiosRequestConfig,
      ) => AxiosRequestConfig | Promise<AxiosRequestConfig>
    >;
    afterResponse?: Array<
      (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>
    >;
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
    request: (config: APIClientConfig) => APIClientConfig | Promise<APIClientConfig>;
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
