import { RetryConfig } from "../types";

export async function handleRetry(
  request: () => Promise<any>,
  retryConfig: RetryConfig,
  errorLogger: (error: any) => Promise<void>,
  //  beforeRetry?: (error: any, attempt: number) => Promise<void>,
  currentAttempt: number = 1,
): Promise<any> {
  try {
    return await request();
  } catch (error: any) {
    await errorLogger(error);

    if (shouldRetry(error, retryConfig, currentAttempt)) {
      // if (beforeRetry) {
      //   await beforeRetry(error, currentAttempt);
      // }
      await delay(retryConfig.delay);
      return await handleRetry(
        request,
        retryConfig,
        errorLogger,
        currentAttempt + 1,
      );
    }
    throw error;
  }
}

function shouldRetry(
  error: any,
  retryConfig: RetryConfig,
  currentAttempt: number,
): boolean {
  const { attempts, statusCodes, httpMethods } = retryConfig;
  const status = error.response?.status;
  const method = error.config?.method?.toUpperCase();

  return (
    currentAttempt < attempts &&
    (!statusCodes || statusCodes.includes(status)) &&
    (!httpMethods || httpMethods.includes(method))
  );
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
