import { APIClientConfig } from "./types";
import { merge } from "lodash";
class APIConfig {
  private config: APIClientConfig = {
    baseURL: "",
    headers: {},
    timeout: 10_000,
    retries: 3,
    retryCount: 0,
    hooks: {},
  };
  constructor(config?: APIClientConfig) {
    if (config) {
      this.config = merge(this.config, config);
    }
  }
  setBaseURL(url: string): void {
    this.config.baseURL = url;
  }

  setHeader(key: string, value: string): void {
    this.config.headers[key] = value;
  }

  setTimeout(timeout: number): void {
    this.config.timeout = timeout;
  }

  setRetries(retries: number): void {
    this.config.retries = retries;
  }

  getConfig(): APIClientConfig {
    return this.config;
  }
}

export default APIConfig;
