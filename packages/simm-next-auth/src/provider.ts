import {
  AuthHandlerExtraType,
  AuthRequestType,
  ProviderHandlerErrorType,
  ProviderHandlerType,
  ProviderType,
} from "./types";

export class Provider<T = object & AuthRequestType> {
  type?: ProviderType;
  name?: string;
  handler?: (
    request: T,
    extra?: AuthHandlerExtraType,
  ) =>
    | Promise<ProviderHandlerType & ProviderHandlerErrorType>
    | (ProviderHandlerType & ProviderHandlerErrorType);
  constructor(
    type: ProviderType,
    {
      name,
      handler,
    }: {
      name?: string;
      handler: (
        request: T,
        extra?: AuthHandlerExtraType,
      ) => Promise<ProviderHandlerType> | ProviderHandlerType;
    },
  ) {
    this.type = type;
    this.name = name;
    this.handler = handler;
  }
}
