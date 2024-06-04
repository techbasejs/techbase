/* eslint-disable no-useless-catch */
import { ofetch, FetchOptions, FetchContext, FetchResponse } from 'ofetch';
import { BASE_URL_API, HTTP_STATUS_CODE } from './constants';
import { getToken, setToken } from './cookies';
import { handleErrorResponse } from './handlers/errorHandler';
import { handleSuccessResponse } from './handlers/successHandler';
import { RequestOptions, ApiResponse, TokenResponse } from './types';
import { withRetry, withTimeout } from './utils';
import axios from 'axios';

type CustomHeadersInit = HeadersInit & {
  Authorization?: string;
};

const apiClient = ofetch.create({
  baseURL: BASE_URL_API,
  async onRequest({ options }) {
    const token = getToken();
    if (token) {
      options.headers = {
        ...(options.headers as CustomHeadersInit),
        Authorization: `Bearer ${token}`,
      };
    }
  },
	// TODO define type
	onResponse: async ({ response, request, options }: FetchContext<any, any>) => {
    if (response && response.status === HTTP_STATUS_CODE.UNAUTHORIZED) {
      try {
        const newToken = await refreshToken();
        setToken(newToken);

        // Retry the request with the new token
        options.headers = {
          ...(options.headers as CustomHeadersInit),
          Authorization: `Bearer ${newToken}`,
        };

        // Make the original request again with new token
        await ofetch(request, options);
      } catch (refreshError) {
        throw refreshError;
      }
    }
    if (response) {
      handleSuccessResponse(response);
    }
  },
  onResponseError: (context: FetchContext<any, any>) => {
    const { response } = context;
    if (response) {
      handleErrorResponse(response);
    }
  },
});

const refreshToken = async (): Promise<string> => {
  try {
    const response = await axios.post<ApiResponse<TokenResponse>>(`${BASE_URL_API}/refresh-token`);
    const newToken = response.data.data.token;
    setToken(newToken);
    return newToken;
  } catch {
    throw new Error('Unable to refresh token');
  }
};

const makeRequest = async <T>(
  method: string,
  url: string,
  data: any,
  options?: RequestOptions
): Promise<ApiResponse<T>> => {
  const requestFn = async () => {
    const fetchOptions: FetchOptions = {
      method,
      ...options,
    };

    return method === 'GET' || method === 'DELETE' ? apiClient(url, fetchOptions) : apiClient(url, {
        ...fetchOptions,
        body: data,
      });
  };

  const requestWithRetry = options?.retry ? withRetry(requestFn, options.retry) : requestFn();

  return options?.timeout ? withTimeout(requestWithRetry, options.timeout) : requestWithRetry;
};

export const get = async <T>(url: string, options?: RequestOptions): Promise<ApiResponse<T>> => {
  return makeRequest('GET', url, null, options);
};

export const post = async <T>(url: string, data: any, options?: RequestOptions): Promise<ApiResponse<T>> => {
  return makeRequest('POST', url, data, options);
};

export const put = async <T>(url: string, data: any, options?: RequestOptions): Promise<ApiResponse<T>> => {
  return makeRequest('PUT', url, data, options);
};

export const del = async <T>(url: string, options?: RequestOptions): Promise<ApiResponse<T>> => {
  return makeRequest('DELETE', url, null, options);
};
