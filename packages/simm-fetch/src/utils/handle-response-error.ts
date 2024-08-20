import axios, { AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { APIClientConfig } from "../types";
import { refreshToken } from "./authenticate";

export const handleResponseError = async (
  error: AxiosError,
  clientConfig: APIClientConfig,
): Promise<AxiosResponse> => {
  const originalRequest = error.config as APIClientConfig;

  //Todo Handle Response Error
  if (
    error.response &&
    error.response.status === 401 &&
    !originalRequest._retry
  ) {
    originalRequest._retry = true;
    try {
      const newAccessToken = await refreshToken();
      const accessToken = newAccessToken;
      Cookies.set("accessToken", accessToken);
      originalRequest.headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      return axios(originalRequest);
    } catch (error_) {
      console.log(error_);
    }
  }

  throw error;
};
