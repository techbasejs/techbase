// src/utils/hooks.ts

import { AxiosRequestConfig, AxiosResponse } from "axios";
type ResponseHook = (responseData: { data: any, headers: Record<string, string>, status: number }) => void | Promise<void>;

const responseHooks: ResponseHook[] = [];

export const registerResponseHook = (hook: ResponseHook) => {
  responseHooks.push(hook);
};

export const executeResponseHooks = async (
  responseData: { data: any, headers: Record<string, string>, status: number },
  afterResponse?: ResponseHook
) => {
  if (afterResponse) {
    await Promise.resolve(afterResponse(responseData));
  }

  for (const hook of responseHooks) {
    await Promise.resolve(hook(responseData));
  }
};

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
