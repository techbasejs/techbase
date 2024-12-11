import {
  AuthRequestType,
  ProviderHandlerErrorType,
  ProviderHandlerResponseType,
  ProviderType,
} from "./types";

class Provider<T = object & AuthRequestType> {
  type?: ProviderType;
  name?: string;
  handler?: (
    request: T,
  ) =>
    | Promise<ProviderHandlerResponseType & ProviderHandlerErrorType>
    | (ProviderHandlerResponseType & ProviderHandlerErrorType);
  constructor(
    type: ProviderType,
    {
      name,
      handler,
    }: {
      name?: string;
      handler: (
        request: T,
      ) => Promise<ProviderHandlerResponseType> | ProviderHandlerResponseType;
    },
  ) {
    this.type = type;
    this.name = name;
    this.handler = handler;
  }
}

export { Provider };
