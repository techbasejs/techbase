import { NextRequest } from "next/server";
import { AUTH_PROVIDER } from "../constants";

type ProviderType = `${AUTH_PROVIDER}`;

type CallbacksType = {
  jwt: (token: string) => string,
  session: (token: string) => string,
  redirect: (params: {
    url: string,
    base_url: string,
  }) => string
}

type ProviderHandlerResponseType = {
  authorized?: boolean;
  session?: Record<
    string,
    number | string | undefined | null | boolean | object
  >;
};

type ProviderHandlerErrorType = {
  error?: number | string | undefined | null | boolean | object;
};

type AuthRequestType<T = object> = {
  data: T;
  json: () => Promise<T>;
} & NextRequest;

export {
  ProviderType,
  CallbacksType,
  ProviderHandlerResponseType,
  ProviderHandlerErrorType,
  AuthRequestType,
}
