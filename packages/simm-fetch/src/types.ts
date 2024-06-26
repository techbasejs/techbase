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
  use(
    onFulfilled?: (value: T) => T | Promise<T>,
    onRejected?: (error: any) => any,
  ): number;
  eject(id: number): void;
}
