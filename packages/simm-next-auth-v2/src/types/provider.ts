import { NextRequest } from "next/server";
import { AUTH_PROVIDER } from "../constants";
import { User } from "./session";

type ProviderType = `${AUTH_PROVIDER}`;

type ProviderHandlerResponseType = {
  authorized?: boolean;
  session?: {
    user?: User;
  };
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
};
