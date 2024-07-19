import axios, { AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { APIClientConfig } from "../types";
import { handleError } from "./handle-request-error";
import { refreshToken } from "./authenticate";

export const handleResponseError = async (
  error: AxiosError,
  clientConfig: APIClientConfig,
): Promise<AxiosResponse> => {
  const originalRequest = error.config as APIClientConfig;

  //Todo Handle Response Error
  throw handleError(error);
};
