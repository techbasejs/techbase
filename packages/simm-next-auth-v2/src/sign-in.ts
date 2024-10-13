import { AuthRequestType, ProviderHandlerResponseType, ProviderHandlerErrorType } from "./types";
import { sign } from "./jwt";
import { Cookies } from "./cookies";
import { COOKIE_TOKEN_KEY } from "./constants";
import { AuthSessionType } from "./types/auth-sesstion";
import { ofetch } from "ofetch";

async function signIn<T extends object>(
  name: string,
  credentials: T
): Promise<{
  session: AuthSessionType;
  token: string;
  cookies: { name: string; value: string; options: any }[];
}> {
  const url = `/api/auth/${name}`;
  
  try {
    const result = await ofetch<ProviderHandlerResponseType & ProviderHandlerErrorType>(url, {
      method: "POST",
      body: credentials as BodyInit,
    });

    if (result.error) {
      throw new Error(result.error as string);
    }

    if (!result.authorized) {
      throw new Error("Unauthorized");
    }

    const sessionData = result.session || {};
    const token = await sign(sessionData);

    const session: AuthSessionType = {
      user: sessionData,
      token: token
    };

    const cookies = [
      {
        name: COOKIE_TOKEN_KEY,
        value: token,
        options: {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        }
      }
    ];

    return {
      session,
      token,
      cookies,
    };
  } catch (error) {
    console.error("Error during sign-in:", error);
    throw error;
  }
}

export { signIn };
