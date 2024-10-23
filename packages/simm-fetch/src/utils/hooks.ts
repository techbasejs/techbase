// import { AxiosRequestConfig, AxiosResponse } from "axios";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import {
  ResponseHook,
  RequestHook,
  RetryHook,
  APIClientConfig,
} from "../types";

// ... existing code ...

export async function executeBeforeRequestHooks(
  config: APIClientConfig,
  hooks?: RequestHook[],
): Promise<any> {
  if (!hooks) return config;
  for (const hook of hooks) {
    config = await hook(config);
  }
  return config;
}
export async function executeAfterResponseHooks<T>(
  response: T,
  hooks: ResponseHook[],
): Promise<T> {
  let modifiedResponse = response;
  for (const hook of hooks) {
    modifiedResponse = await hook(modifiedResponse);
  }
  return modifiedResponse;
}

export async function executeBeforeRetryHooks(
  retryCount: number,
  error: any,
  hooks?: RetryHook[],
): Promise<boolean> {
  if (!hooks) return true;
  for (const hook of hooks) {
    if (!(await hook(retryCount, error))) {
      return false;
    }
  }
  return true;
}

// ... rest of the file ...
