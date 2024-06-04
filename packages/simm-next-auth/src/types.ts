import { CookieSerializeOptions } from "cookie";
import { NextRequest } from "next/server";
import { Cookies } from "./cookies";
import { JWTPayload } from "jose";

export interface ProviderHandlerResponse {
  error?: any;
  auth?: {
    token?: boolean;
  };
  jwt?: {
    skip?: boolean;
    options?: CookieOptions;
    payload?: any;
  };
}

export interface AuthProvider {
  type: string | AuthProviderType;
  handler: (
    request: AuthNextRequest,
    options?: {
      headers?: Headers;
      cookies?: Cookies;
    },
  ) => Promise<ProviderHandlerResponse> | ProviderHandlerResponse;
}

export enum AuthProviderType {
  CREDENTIALS = "credentials",
}

export type CookieOptions = CookieSerializeOptions;

export interface Cookie {
  name: string;
  value: string;
  options: CookieOptions;
}

export type AuthNextRequest = NextRequest & { data: any };

export type AuthRequestType<T = object> = {
  data: T;
  json: () => Promise<T>;
} & NextRequest;

export type ProviderType = "credentials";

export type ProviderHandlerType = {
  authorized?: boolean;
  session?: Record<
    string,
    number | string | undefined | null | boolean | object
  >;
  jwt?: {
    options?: CookieOptions;
  };
};

export type ProviderHandlerErrorType = {
  error?: number | string | undefined | null | boolean | object;
};

export type AuthHandlerExtraType = {
  headers?: Headers;
  cookies?: Cookies;
  session?: AuthSessionType;
};

export type AuthSessionType = JWTPayload & {
  user?: any;
};
