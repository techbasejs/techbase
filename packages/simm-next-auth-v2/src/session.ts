import { serialize } from "cookie";
import { CookieOptions, ProviderHandlerErrorType, ProviderHandlerResponseType } from "./types";
import { COOKIE_DATA_KEY, COOKIE_TOKEN_KEY } from "./constants";
import { Cookies } from "./cookies";
import { sign } from "./jwt";

const session = async ({
    session, cookies, authorized, body = {}, options
} : {session: object, cookies: Cookies, authorized?: boolean, body?: object, options?: CookieOptions}) => {
    const token = await sign({ ...session, ...body });
    const jwtOptions = {
        httpOnly: options?.httpOnly || true,
        secure: options?.secure || false,
        maxAge: options?.maxAge || 60 * 60 * 24, // 1 day
        path: options?.path || "/",
      };
      if (typeof authorized === "boolean" && !authorized) {
        cookies.append(COOKIE_DATA_KEY, token, jwtOptions);
      } else {
        cookies.remove(COOKIE_DATA_KEY);
        cookies.append(COOKIE_TOKEN_KEY, token, jwtOptions);
      }
    const cookieArray = []
    for (const cookie of cookies.values) {
        const cookieStr = serialize(cookie.name, cookie.value, cookie.options);
        cookieArray.push(cookieStr);
      }
    return cookieArray;
}

export {
    session,
}
