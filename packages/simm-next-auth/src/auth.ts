import { NextRequest, NextResponse } from "next/server";
import { sign } from "./jwt";
import { serialize } from "cookie";
import { getSession } from "./session";
import { AuthRequestType } from "./types";
import { Cookies } from "./cookies";
import { Provider } from "./provider";
import { COOKIE_DATA_KEY, COOKIE_TOKEN_KEY } from "./constants";

export const auth = ({
  providers,
}: {
  providers: Provider<AuthRequestType>[];
}) => {
  return async (request: AuthRequestType) => {
    const method = request.method;
    const pathname = request.nextUrl.pathname;
    const headers = new Headers();
    const cookies = new Cookies();
    const results = new Map();
    const session = await getSession(request, COOKIE_DATA_KEY);
    const providerName = pathname.replace("/api/auth/", "");
    const provider = providers.find(
      (provider) => provider.name === providerName,
    );
    if (method === "POST" && provider) {
      const handler = provider.handler;
      if (typeof handler === "function") {
        const res = await handler(request, {
          cookies: cookies,
          headers: headers,
          session: session,
        });

        // error handler
        if (res.error) {
          return Response.json(res, {
            headers,
          });
        }

        const jwt = res.jwt;

        const token = await sign(res.session || {});
        const jwtOptions = {
          httpOnly: jwt?.options?.httpOnly || true,
          secure: jwt?.options?.secure || false,
          maxAge: jwt?.options?.maxAge || 60 * 60 * 24, // 1 day
          path: jwt?.options?.path || "/",
        };
        if (typeof res.authorized === "boolean" && !res.authorized) {
          cookies.append(COOKIE_DATA_KEY, token, jwtOptions);
        } else {
          cookies.append(COOKIE_TOKEN_KEY, token, jwtOptions);
        }
      }
    } else if (method === "GET") {
      if (providerName === "session") {
        const data = await getSession(request);
        results.set("user", data?.user || null);
      } else if (providerName === "logout") {
        results.set("status", "OK");
        cookies.remove(COOKIE_TOKEN_KEY);
      }
    }

    // SET cookies
    for (const cookie of cookies.values) {
      const cookieStr = serialize(cookie.name, cookie.value, cookie.options);
      headers.append("Set-Cookie", cookieStr);
    }

    return Response.json(Object.fromEntries(results) || {}, {
      headers,
    });
  };
};

export function withAuth(
  middleware: (request: NextRequest) => Promise<NextResponse> | NextResponse,
) {
  return async (request: NextRequest) => {
    const pathname = request.nextUrl.pathname;
    const session = await getSession(request);
    if (session) {
      return NextResponse.next();
    }

    return middleware(request);
  };
}
