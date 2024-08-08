import { AxiosResponse } from "axios";
import { APIClientConfig } from "../types";
export const handleRetry = async (
  requestFn: () => Promise<AxiosResponse>,
  config: APIClientConfig,
): Promise<AxiosResponse> => {
  //Todo retry API with option/config
  config.isRetry = false;
};
