import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { APIClientConfig } from "../types";
export const handleRetry = async (
  error: AxiosError,
  config: APIClientConfig,
  axiosInstance: AxiosInstance,
): Promise<AxiosResponse | AxiosError> => {
  //Todo retry API with option/config
  const statusRangeToRetry = [500, 599];
  if (config.retries && config.retries > 0) {
    config.retries -= 1;
    if (
      error.response &&
      statusRangeToRetry[0] <= error.response.status &&
      statusRangeToRetry[1] >= error.response.status
    ) {
      return await axiosInstance(error.config as APIClientConfig);
    }
  }
  return await new Promise((resolve) => {
    resolve(error);
  });
};
