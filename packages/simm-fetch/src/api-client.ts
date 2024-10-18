import { APIClientConfig, RefreshTokenConfig, RequestAdapter, RequestOptions } from "./types";
import { appendQueryParams } from "./utils/query-params";
import {
  handleRequestError,
  handleRequestInterceptor,
  handleResponseError,
  handleResponseSuccess,
} from "./utils/index";
import { AxiosAdapterImpl } from './adapters/axios-adapter';
import { FetchAdapterImpl } from './adapters/fetch-adapter';
import { RefreshTokenHandler } from "./utils/refresh-token-handler";

class APIClient<T extends RequestAdapter> {
  private config: APIClientConfig;
  private refreshTokenHandler?: RefreshTokenHandler;
  private adapter: T;
  constructor(config: APIClientConfig, adapter?: T, refreshTokenConfig?: RefreshTokenConfig) {
    this.config = config;
    this.adapter = adapter as T;
    this.setupRefreshTokenHandler(refreshTokenConfig);
    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.adapter.setInterceptors({
      request: (config: APIClientConfig) => this.handleRequestInterceptor(config),
      requestError: handleRequestError,
      response: handleResponseSuccess,
      responseError: (error: any) => this.handleResponseError(error),
    });
  }

  private setupRefreshTokenHandler(refreshTokenConfig?: RefreshTokenConfig): void {
    if (refreshTokenConfig) {
      this.refreshTokenHandler = new RefreshTokenHandler(refreshTokenConfig, this.adapter, this.config);
    }
  }

  private async handleRequestInterceptor(config: APIClientConfig): Promise<APIClientConfig> {
    let interceptedConfig = handleRequestInterceptor(config, this.config);

    if (this.refreshTokenHandler) {
      interceptedConfig = await this.refreshTokenHandler.handleRequest(interceptedConfig as APIClientConfig);
    }

    return interceptedConfig;
  }

  private async handleResponseError(error: any): Promise<any> {
    if (this.refreshTokenHandler) {
      try {
        return await this.refreshTokenHandler.handleResponseError(error);
      } catch {
        // If refresh token handling fails, fall back to default error handling
      }
    }
    return handleResponseError(error, this.config);
  }

  private async request<T>(options: RequestOptions): Promise<T> {
    const mergedConfig: APIClientConfig = {
      ...this.config,
      ...options,
      url: this.combineUrls(this.config.baseURL as string, options.url),
    };

    if (options.params) {
      mergedConfig.url = appendQueryParams(mergedConfig.url, options.params, mergedConfig.queryConfig);
    }
    return this.adapter.request<T>(mergedConfig);
  }

  private combineUrls(baseURL: string, url: string): string {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `${baseURL.replace(/\/+$/, '')}/${url.replace(/^\/+/, '')}`;
  }

  public async get<T>(
    url: string,
    options?: Omit<RequestOptions, 'method' | 'url'>
  ): Promise<T> {
    return await this.request<T>({ method: 'GET', url, ...options });
  }

  public async post<T>(
    url: string,
    data?: any, options?: Omit<RequestOptions, 'method' | 'url' | 'data'>
  ): Promise<T> {
    return await this.request<T>({ method: 'POST', url, data, ...options });
  }

  public async put<T>(
    url: string,
    data?: any, options?: Omit<RequestOptions, 'method' | 'url' | 'data'>
  ): Promise<T> {
    return await this.request<T>({ method: 'PUT', url, data, ...options });
  }

  public async delete<T>(
    url: string,
    options?: Omit<RequestOptions, 'method' | 'url'>
  ): Promise<T> {
    return await this.request<T>({ method: 'DELETE', url, ...options });
  }

  public cancelRequests(message?: string): void {
    this.adapter.cancelRequests(message);
  }
}

export function createAPIClient(config: APIClientConfig,
  adapterType: 'axios' | 'fetch' = 'axios',
  refreshTokenConfig?: RefreshTokenConfig): APIClient<RequestAdapter> {
  let adapter: RequestAdapter;

  // eslint-disable-next-line prefer-const
  adapter = adapterType === 'fetch' ? new FetchAdapterImpl(config) : new AxiosAdapterImpl(config);

  return new APIClient(config, adapter, refreshTokenConfig);
}
export default APIClient;
