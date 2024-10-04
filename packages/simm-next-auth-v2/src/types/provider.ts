import { NextRequest } from "next/server";
import { AUTH_PROVIDER } from "../constants";

type ProviderType = `${AUTH_PROVIDER}`;

type ProviderHandlerResponseType = {
  authorized?: boolean;
  session?: {
   user?: Record<
    string,
    number | string | undefined | null | boolean | object
  >,
  }
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
  ProviderHandlerResponseType,
  ProviderHandlerErrorType,
  AuthRequestType,
}
