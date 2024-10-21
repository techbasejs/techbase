import { getSession } from "./session";
import { AuthRequestType } from "./types";
import { AuthConfig } from "./types";

const auth = ({ providers }: AuthConfig) => {
  if (!process.env.NEXT_AUTH_SECRET) {
    console.log("\u001B[33m%s\u001B[0m", "[WARN] NEXT_AUTH_SECRET is not set");
  }
  return async (request: AuthRequestType) => {
    const method = request.method;
    const pathname = request.nextUrl.pathname;
    const results = new Map();
    const providerName = pathname.replace("/api/auth/", "");

    if (providerName === "session") {
      if (method === "GET") {
        const data = await getSession(request);
        results.set("user", data?.user || null);
      }
      if (method === "POST") {
        const data = await request.json();
        results.set("user", data || null);
      }
    }

    // Todo SET cookies
    // for (const cookie of cookies.values) {
    //   const cookieStr = serialize(cookie.name, cookie.value, cookie.options);
    //   headers.append("Set-Cookie", cookieStr);
    // }

    return Response.json(Object.fromEntries(results) || {});
  };
};

export { auth };
