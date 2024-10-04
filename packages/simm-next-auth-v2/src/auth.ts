import { AuthRequestType } from "./types";
import { AuthConfig } from "./types/auth";

const auth = ({ providers }: AuthConfig) => {
  if (!process.env.NEXT_AUTH_SECRET) {
    console.log("\u001B[33m%s\u001B[0m", "[WARN] NEXT_AUTH_SECRET is not set");
  }
  return async (request: AuthRequestType) => {
    return Response.json({});
  };
};

export { auth };
