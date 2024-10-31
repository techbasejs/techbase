import { APIClientConfig, RequestAdapter } from "../types";

export class FetchAdapterImpl implements RequestAdapter {
  private config: APIClientConfig;
  private controller: AbortController | null = null;
  private interceptors: {
    request: [
      (config: APIClientConfig) => APIClientConfig | Promise<APIClientConfig>,
      (error: any) => any | Promise<any>,
    ];
    response: [
      (response: Response) => any | Promise<any>,
      (error: any) => any | Promise<any>,
    ];
  };

  constructor(config: APIClientConfig) {
    this.config = config;
    this.interceptors = {
      request: [
        async (config) => config,
        async (error) => {
          throw error;
        },
      ],
      response: [
        async (response) => response,
        async (error) => {
          throw error;
        },
      ],
    };
  }

  setInterceptors(interceptors: {
    request: (
      config: APIClientConfig,
    ) => APIClientConfig | Promise<APIClientConfig>;
    requestError: (error: any) => any | Promise<any>;
    response: (response: any) => any | Promise<any>;
    responseError: (error: any) => any | Promise<any>;
  }): void {
    this.interceptors.request = [
      interceptors.request,
      interceptors.requestError,
    ];
    this.interceptors.response = [
      interceptors.response,
      interceptors.responseError,
    ];
  }

  async request<T = any>(config: APIClientConfig): Promise<T> {
    try {
      const interceptedConfig = await this.interceptors.request[0](config);

      this.controller = new AbortController();
      const signal = this.controller.signal;
      const fetchConfig: RequestInit = {
        method: interceptedConfig.method,
        headers: interceptedConfig.headers,
        body: interceptedConfig.data
          ? JSON.stringify(interceptedConfig.data)
          : undefined,
        signal,
      };

      const timeoutId = interceptedConfig.timeout
        ? setTimeout(() => this.controller?.abort(), interceptedConfig.timeout)
        : null;
      const response: any = await fetch(interceptedConfig.url!, fetchConfig);
      const interceptedResponse = await this.interceptors.response[0](response);
      if (timeoutId) clearTimeout(timeoutId);
      if (interceptedResponse.ok) {
        return await interceptedResponse.data;
      } else {
        const error = new Error(
          `Request failed with status code ${response.status}`,
        );
        (error as any).config = {
          ...fetchConfig,
          url: interceptedConfig.url,
          method: interceptedConfig.method,
          data: interceptedConfig.data,
          timeout: interceptedConfig.timeout,
        };
        (error as any).response = {
          ...interceptedResponse,
          status: interceptedResponse.status,
          statusText: interceptedResponse.statusText,
          config: {
            ...fetchConfig,
            url: interceptedConfig.url,
            method: interceptedConfig.method,
            data: interceptedConfig.data,
            timeout: interceptedConfig.timeout,
          },
        };
        throw error;
      }
    } catch (error) {
      return this.interceptors.response[1](error);
    }
  }

  cancelRequests(message?: string): void {
    if (this.controller) {
      this.controller.abort(message);
    }
  }
}
