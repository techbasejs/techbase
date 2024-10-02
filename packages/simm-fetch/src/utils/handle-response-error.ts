import { AxiosError, AxiosResponse } from "axios";
import { APIClientConfig } from "../types";

export const handleResponseError = async (
  error: AxiosError,
  clientConfig: APIClientConfig,
): Promise<AxiosResponse> => {
  throw error.response?.data ?? error;
};
