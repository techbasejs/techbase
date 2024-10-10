import { APIClientConfig } from "../types";

export async function handleResponseError(error: any, config: APIClientConfig): Promise<any> {
  if (config.retry && config.retry.attempts > 0) {
    return handleRetry(error, config);
  }
  return handleResponseError(error, config);
}

async function handleRetry(error: any, config: APIClientConfig): Promise<any> {
  const { retry } = config;
  const retryConfig = {
    retryCount: 0,
    retryDelay: retry?.delay || 1000,
    maxRetries: retry?.attempts || 3,
  };

  const retryRequest = async () => {
    try {
      retryConfig.retryCount++;

      return await error.config.adapter.request({
        ...error.config,
        url: error.config.url,
      });
    } catch (retryError) {
      if (retryConfig.retryCount < retryConfig.maxRetries) {
        await new Promise(resolve => setTimeout(resolve, retryConfig.retryDelay));
        return retryRequest();
      }
      throw retryError;
    }
  };

  return retryRequest();
}
