import { getSession } from "./session";
import { AuthRequestType } from "./types";
import { AuthConfig } from "./types/auth";

const auth = ({ providers }: AuthConfig) => {
  if (!process.env.NEXT_AUTH_SECRET) {
    console.log("\u001B[33m%s\u001B[0m", "[WARN] NEXT_AUTH_SECRET is not set");
  }
  return async (request: AuthRequestType) => {
    const method = request.method;
    const pathname = request.nextUrl.pathname;
    const results = new Map();
    const providerName = pathname.replace("/api/auth/", "");

    if (method === "GET" && providerName === "session") {
      const data = await getSession(request);
      results.set("user", data?.user || null);
    }

    return Response.json(Object.fromEntries(results) || {});
  };
};

export { auth };
