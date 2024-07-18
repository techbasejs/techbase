import { AxiosRequestConfig, AxiosResponse  } from 'axios';
import queryString from 'query-string';
export interface RequestConfig {
  baseURL?: string;
  headers?: { [key: string]: string };
  timeout?: number;
  auth?:
    | {
        username: string;
        password: string;
      }
    | {
        token: string;
      };
  graphql?: {
    endpoint: string;
    query: string;
    variables?: { [key: string]: any };
  };
  retry?: number;
  useAuthorization?: boolean;
}
export interface RequestOptions extends RequestConfig {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  data?: any;
  params?: { [key: string]: any };
}
export interface Response<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: { [key: string]: string };
  config: RequestOptions;
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
  | "PATCH"
  | "OPTIONS"
  | "HEAD";
export interface APIClientConfig extends AxiosRequestConfig {
  baseURL?: string;
  headers?: any;
  timeout?: number;
  isRetry?: boolean;
  retries?: number;
  retryCount?: number;
  useAuth?: boolean;
  isRefreshing?: boolean;
  url?: string;
  body?: any;
  data?: any;
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
  queryConfig?: queryString.StringifyOptions | undefined,
}
export interface CustomRequestConfig extends AxiosRequestConfig {
  type?: "json" | "text" | "blob" | "arrayBuffer";
  parseResponse?: (response: any) => any;
}

export type SafeType<T> = T | null;

export type GenericResponse<T> = {
  status: number;
  data: T;
};

export type GenericError<T = any> = {
  status: number;
  message: string;
  data?: T;
};

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

export type ContentType = keyof typeof CONTENT_TYPES;
