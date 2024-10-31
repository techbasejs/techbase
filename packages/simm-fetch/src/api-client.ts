import {
  APIClientConfig,
  //ErrorHook,
  //RedirectHook,
  RefreshTokenConfig,
  RequestAdapter,
  //RequestHook,
  RequestOptions,
  //ResponseHook,
  // RetryHook,
} from "./types";
import { appendQueryParams } from "./utils/query-params";
import {
  handleRequestError,
  handleRequestInterceptor,
  handleResponseError,
  handleResponseSuccess,
  handleRetry,
} from "./utils/index";
import {} from //executeResponseHooks,
// executeBeforeRequestHooks,
//executeAfterResponseHooks,
"./utils/hooks";
import { AxiosAdapterImpl } from "./adapters/axios-adapter";
import { FetchAdapterImpl } from "./adapters/fetch-adapter";
import { RefreshTokenHandler } from "./utils/refresh-token-handler";
import CacheManager from "./utils/cache-manager";

class APIClient<T extends RequestAdapter> {
  private config: APIClientConfig;
  private refreshTokenHandler?: RefreshTokenHandler;
  private adapter: T;
  private cacheManager?: CacheManager;
  // private hooks: {
  //   afterResponse?: ResponseHook[];
  //   beforeError?: ErrorHook[];
  //   beforeRetry?: RetryHook[];
  //   beforeRequest?: RequestHook[];
  //   beforeRedirect?: RedirectHook[];
  // };
  constructor(
    config: APIClientConfig,
    adapter?: T,
    refreshTokenConfig?: RefreshTokenConfig,
  ) {
    this.config = config;
    this.adapter = adapter as T;
    //this.hooks = config.hooks || {};
    //this.setupHooks();
    this.setupRefreshTokenHandler(refreshTokenConfig);
    this.setupInterceptors();
    this.setupCacheManager();
  }

  private setupCacheManager(): void {
    if (this.config.cache?.provider) {
      this.cacheManager = new CacheManager(
        this.config.cache.provider,
        this.config.cache.ttl,
      );
    }
  }
  // private setupHooks(): void {
  //   // Initialize hooks if not provided in config
  //   this.hooks.afterResponse = this.hooks.afterResponse || [];
  //   this.hooks.beforeError = this.hooks.beforeError || [];
  //   this.hooks.beforeRetry = this.hooks.beforeRetry || [];
  //   this.hooks.beforeRequest = this.hooks.beforeRequest || [];
  //   this.hooks.beforeRedirect = this.hooks.beforeRedirect || [];
  // }
  private setupInterceptors(): void {
    this.adapter.setInterceptors({
      request: (config: APIClientConfig) =>
        this.handleRequestInterceptor(config),
      requestError: handleRequestError,
      response: handleResponseSuccess,
      responseError: (error: any) => this.handleResponseError(error),
    });
  }

  private setupRefreshTokenHandler(
    refreshTokenConfig?: RefreshTokenConfig,
  ): void {
    if (refreshTokenConfig) {
      this.refreshTokenHandler = new RefreshTokenHandler(
        refreshTokenConfig,
        this.adapter,
        this.config,
      );
    }
  }

  // private async handleRequestInterceptor(
  //   config: APIClientConfig,
  // ): Promise<APIClientConfig> {
  //   let interceptedConfig = handleRequestInterceptor(config, this.config);

  //   if (this.refreshTokenHandler) {
  //     interceptedConfig = await this.refreshTokenHandler.handleRequest(
  //       interceptedConfig as APIClientConfig,
  //     );
  //   }

  //   return interceptedConfig;
  // }
  private async handleRequestInterceptor(
    config: APIClientConfig,
  ): Promise<APIClientConfig> {
    let interceptedConfig = handleRequestInterceptor(config, this.config);

    if (this.refreshTokenHandler) {
      interceptedConfig = await this.refreshTokenHandler.handleRequest(
        interceptedConfig as APIClientConfig,
      );
    }

    // Execute beforeRequest hooks
    if (this.config.hooks?.beforeRequest) {
      for (const hook of this.config.hooks.beforeRequest) {
        interceptedConfig = await hook(interceptedConfig);
      }
    }

    return interceptedConfig;
  }

  // private async handleResponseError(error: any): Promise<any> {
  //   if (this.refreshTokenHandler) {
  //     try {
  //       await this.refreshTokenHandler.handleResponseError(error);
  //     } catch {
  //       // If refresh token handling fails, fall back to default error handling
  //     }
  //   }
  //   return handleResponseError(error)
  // }
  private async handleResponseError(error: any): Promise<any> {
    // Execute beforeError hooks
    if (this.config.hooks?.beforeError) {
      for (const hook of this.config.hooks.beforeError) {
        error = await hook(error);
      }
    }

    if (this.refreshTokenHandler) {
      try {
        await this.refreshTokenHandler.handleResponseError(error);
      } catch {
        // If refresh token handling fails, fall back to default error handling
      }
    }
    return handleResponseError(error);
  }

  private async errorLogger(error: any): Promise<void> {
    console.error("Response error:", error.message);
    // console.error('Status:', error.response?.status);
    // console.error('Data:', error.response?.data);
    // You can add more logging logic here if needed
  }
  private async request<T>(options: RequestOptions): Promise<T> {
    const mergedConfig: APIClientConfig = {
      ...this.config,
      ...options,
      url: this.combineUrls(this.config.baseURL as string, options.url),
    };

    if (options.params) {
      mergedConfig.url = appendQueryParams(
        mergedConfig.url,
        options.params,
        mergedConfig.queryConfig,
      );
    }
    const retryConfig = mergedConfig.retry;
    console.log(106, retryConfig);
    const makeRequest = async () => {
      const response = await this.adapter.request<T>(mergedConfig);
      // Execute afterResponse hooks
      if (this.config.hooks?.afterResponse) {
        let modifiedResponse: any = response;
        for (const hook of this.config.hooks.afterResponse) {
          modifiedResponse = (await hook(modifiedResponse)) as T;
        }
        return modifiedResponse;
      }
      return response;
    };

    if (retryConfig) {
      try {
        return await handleRetry(makeRequest, {
          attempts: retryConfig.attempts,
          delay: retryConfig.delay,
          statusCodes: retryConfig.statusCodes,
          onError: async (error: unknown) => {
            await this.errorLogger(error);
          },
          beforeRetry: async (error: unknown, attempt: number) => {
            if (this.config.hooks?.beforeRetry) {
              for (const hook of this.config.hooks.beforeRetry) {
                await hook(attempt, error);
              }
            }
            return true;
          },
        });
      } catch (error) {
        return this.handleResponseError(error);
      }
    }

    try {
      return await makeRequest();
    } catch (error) {
      return this.handleResponseError(error);
    }
  }

  // public addHook(hookType: keyof APIClient<T>['hooks'], hook:  (...args: any[]) => any): void {
  //   if (this.hooks[hookType]) {
  //     (this.hooks[hookType] as Array<(...args: any[]) => any>).push(hook);
  //   } else {
  //     console.warn(`Hook type '${hookType}' is not supported.`);
  //   }
  // }

  private combineUrls(baseURL: string, url: string): string {
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return `${baseURL.replace(/\/+$/, "")}/${url.replace(/^\/+/, "")}`;
  }

  public clearCache(): void {
    if (this.cacheManager) {
      this.cacheManager.clear();
    }
  }
  public async get<T>(
    url: string,
    options?: Omit<RequestOptions, "method" | "url">,
  ): Promise<T> {
    if (this.cacheManager) {
      const cachedData = await this.cacheManager.get<T>({
        method: "GET",
        url,
        ...options,
      });
      if (cachedData) {
        return cachedData;
      }
    }

    const response = await this.request<T>({ method: "GET", url, ...options });
    if (this.cacheManager) {
      await this.cacheManager.set({ method: "GET", url, ...options }, response);
    }
    return response;
  }

  public async post<T>(
    url: string,
    data?: any,
    options?: Omit<RequestOptions, "method" | "url" | "data">,
  ): Promise<T> {
    return await this.request<T>({ method: "POST", url, data, ...options });
  }

  public async put<T>(
    url: string,
    data?: any,
    options?: Omit<RequestOptions, "method" | "url" | "data">,
  ): Promise<T> {
    return await this.request<T>({ method: "PUT", url, data, ...options });
  }

  public async delete<T>(
    url: string,
    options?: Omit<RequestOptions, "method" | "url">,
  ): Promise<T> {
    return await this.request<T>({ method: "DELETE", url, ...options });
  }

  public cancelRequests(message?: string): void {
    this.adapter.cancelRequests(message);
  }
}

export function createAPIClient(
  config: APIClientConfig,
  adapterType: "axios" | "fetch" = "axios",
  refreshTokenConfig?: RefreshTokenConfig,
): APIClient<RequestAdapter> {
  let adapter: RequestAdapter;

  // eslint-disable-next-line prefer-const
  adapter =
    adapterType === "fetch"
      ? new FetchAdapterImpl(config)
      : new AxiosAdapterImpl(config);

  return new APIClient(config, adapter, refreshTokenConfig);
}
export default APIClient;
