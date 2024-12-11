interface RetryConfig {
  attempts: number;
  delay: number;
  statusCodes?: number[];
  onError?: (error: unknown) => Promise<void>;
  beforeRetry?: (error: unknown, attempt: number) => Promise<boolean>;
}

export async function handleRetry<T>(
  fn: () => Promise<T>,
  options: RetryConfig
): Promise<T> {
  let error: unknown;

  for (let attempt = 1; attempt <= options.attempts; attempt++) {
    try {
      return await fn();
    } catch (error_) {
      error = error_;

      if (options.onError) {
        await options.onError(error_);
      }

      const shouldRetry = await options.beforeRetry?.(error_, attempt);
      if (shouldRetry === false) {
        break;
      }

      if (attempt < options.attempts) {
        await new Promise(resolve => setTimeout(resolve, options.delay));
      }
    }
  }

  throw error;
}
