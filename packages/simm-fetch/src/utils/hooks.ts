// src/utils/hooks.ts

import { AxiosRequestConfig, AxiosResponse } from "axios";

export async function executeBeforeRequestHooks(
  config: AxiosRequestConfig,
  hooks?: Array<
    (
      config: AxiosRequestConfig,
    ) => AxiosRequestConfig | Promise<AxiosRequestConfig>
  >,
): Promise<AxiosRequestConfig> {
  if (!hooks) return config;
  for (const hook of hooks) {
    config = await hook(config);
  }
  return config;
}

export async function executeAfterResponseHooks(
  response: AxiosResponse,
  hooks?: Array<
    (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>
  >,
): Promise<AxiosResponse> {
  if (!hooks) return response;
  for (const hook of hooks) {
    response = await hook(response);
  }
  return response;
}
