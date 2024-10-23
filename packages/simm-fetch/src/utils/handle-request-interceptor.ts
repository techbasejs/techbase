import { APIClientConfig } from "../types";
export function getContentType(
  headers: Record<string, string>,
): string | undefined {
  const contentTypeKey = Object.keys(headers).find(
    (key) => key.toLowerCase() === "content-type",
  );
  return contentTypeKey ? headers[contentTypeKey] : undefined;
}
export function handleRequestInterceptor(
  config: APIClientConfig,
  globalConfig: APIClientConfig,
): APIClientConfig {
  // Merge headers
  config.headers = mergeHeaders(globalConfig.headers, config.headers);

  config.timeout = config.timeout || globalConfig.timeout;

  return config;
}
export function mergeHeaders(
  globalHeaders: Record<string, string> = {},
  requestHeaders: Record<string, string> = {},
): Record<string, string> {
  return { ...globalHeaders, ...requestHeaders };
}

export function transformRequestData(
  data: any,
  contentType: string | undefined,
): any {
  if (!data) return data;

  if (
    contentType === "application/json" &&
    typeof data === "object" &&
    !(data instanceof FormData) &&
    !(data instanceof Blob) &&
    !(data instanceof File)
  ) {
    return JSON.stringify(data);
  }

  return data;
}
