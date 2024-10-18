import { AxiosAdapterImpl } from "./adapters/axios-adapter";
import { FetchAdapterImpl } from "./adapters/fetch-adapter";
import APIClient from "./api-client";
import { APIClientConfig, RefreshTokenConfig, RequestAdapter } from "./types";
export * from "./constants";
export * from "./errors";
export * from "./types";
export * from "./utils/query-params";
export * from "./utils/hooks";

export function createAPIClient(
  config: APIClientConfig,
  adapterType: 'axios' | 'fetch' = 'axios',
  refreshTokenConfig?: RefreshTokenConfig
): APIClient<RequestAdapter> {
  let adapter: RequestAdapter;

  // eslint-disable-next-line prefer-const
  adapter = adapterType === 'fetch' ? new FetchAdapterImpl(config) : new AxiosAdapterImpl(config);

  return new APIClient(config, adapter, refreshTokenConfig);
}


export { default as APIClient } from "./api-client";
export { default as APIConfig } from "./api-config";
