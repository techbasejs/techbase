import { APIClientConfig } from "./types";
import { merge } from "lodash";
class APIConfig {
  private config: APIClientConfig = {
    baseURL: "",
    headers: {},
    timeout: 10_000,
  };
  constructor(config?: APIClientConfig) {
    if (config) {
      this.config = merge(this.config, config);
    }
  }
  setBaseURL(url: string): void {
    this.config.baseURL = url;
  }

  setTimeout(timeout: number): void {
    this.config.timeout = timeout;
  }

  getConfig(): APIClientConfig {
    return this.config;
  }
}

export default APIConfig;
