import axios, { AxiosRequestConfig } from "axios";
import { APIClientConfig, CustomRequestConfig } from "../types";
import Cookies from "js-cookie";

export function addAuthentication(config: APIClientConfig): AxiosRequestConfig {
  const token = Cookies.get("accessToken");
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
}

export async function refreshToken() {
  //Todo handle RefreshToken with config
  return response?.data?.accessToken;
}

export function addRequestHooks(config: CustomRequestConfig) {
  //Todo handle Hook in request or response
}
