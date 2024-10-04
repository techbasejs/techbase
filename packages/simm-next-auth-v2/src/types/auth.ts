import { Provider } from "../provider";
import { AuthRequestType } from "./provider";

type Awaitable<T> = T | PromiseLike<T>;

interface AuthConfig {
  providers: Provider<AuthRequestType>[];
  callbacks?: CallbacksType;
}

type CallbacksType = {
  jwt?: (token: string) => string;
  session?: (token: string) => string;
  redirect?: (params: {
    url: string;
    baseUrl: string;
    user: Record<string, number | string | undefined | null | boolean | object>;
  }) => Awaitable<string>;
};

export { AuthConfig, CallbacksType };
