import { APIClientConfig } from "../types";
import { handleRetry } from "./handle-retry";

export async function handleResponseError(error: any, config: APIClientConfig): Promise<any> {
  if (config.retry && config.retry.attempts > 0) {
    return handleRetry(error, config);
  }
  // add other handle logic
}


