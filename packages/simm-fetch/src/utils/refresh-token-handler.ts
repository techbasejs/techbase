import { RefreshTokenConfig, RequestAdapter, APIClientConfig } from "../types";

export class RefreshTokenHandler {
  private isRefreshing: boolean = false;
  private refreshSubscribers: Array<(token: string) => void> = [];

  constructor(
    private config: RefreshTokenConfig,
    private adapter: RequestAdapter,
    private apiConfig: APIClientConfig
    // eslint-disable-next-line unicorn/empty-brace-spaces
  ) { }

  public async handleRequest(config: APIClientConfig): Promise<APIClientConfig> {
    if (this.config.getAccessToken) {
      const accessToken = await this.config.getAccessToken();
      if (accessToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`,
        };
      }
    }
    return config;
  }

  public async handleResponseError(error: any): Promise<any> {
    const originalRequest = error.config;
    if (error.response?.status === 401) {
      if (this.isRefreshing) {
        return new Promise((resolve) => {
          this.refreshSubscribers.push((token: string) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            resolve(this.adapter.request(originalRequest));
          });
        });
      }

      this.isRefreshing = true;
      originalRequest._retry = true;

      try {
        const newToken = await this.refreshToken();
        for (const callback of this.refreshSubscribers) callback(newToken);
        this.refreshSubscribers = [];
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return await this.adapter.request(originalRequest);
      } catch (refreshError) {
        if (this.config.onRefreshFailure) {
          await this.config.onRefreshFailure(refreshError);
        }
        throw refreshError;
      } finally {
        this.isRefreshing = false;
      }
    }

    throw error;
  }

  private async refreshToken(): Promise<string> {
    if (!this.config.refreshTokenUrl) {
      throw new Error("Refresh token configuration is missing");
    }

    const refreshToken = await this.config.getRefreshToken();
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    let requestConfig;
    // eslint-disable-next-line prefer-const
    requestConfig = this.config.createRefreshRequest
      ? this.config.createRefreshRequest(refreshToken)
      : {
        method: "POST",
        url: this.apiConfig.baseURL + this.config.refreshTokenUrl,
        data: { refreshToken },
        headers: {
          "Content-Type": "application/json",
          ...this.apiConfig.headers,
        },
        baseURL: this.apiConfig.baseURL,
      };
    const response = await this.adapter.request(
      requestConfig as APIClientConfig,
    );
    const newToken = this.config.extractAccessToken(response);
    //const newToken = response.accessToken
    if (this.config.onRefreshSuccess) {
      await this.config.onRefreshSuccess(newToken, response);
    }

    return newToken;
  }
}
