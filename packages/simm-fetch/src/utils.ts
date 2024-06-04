export const withRetry = async <T>(fn: () => Promise<T>, retries: number): Promise<T> => {
    let lastError;
    for (let i = 0; i < retries; i++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;
      }
    }
    throw lastError;
  };
  
  export const withTimeout = <T>(fn: Promise<T>, ms: number): Promise<T> => {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Request timed out')), ms);
      fn.then(
        (res) => {
          clearTimeout(timer);
          resolve(res);
        },
        (error_) => {
          clearTimeout(timer);
          reject(error_);
        }
      );
    });
  };
  