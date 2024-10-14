import { NextRequest } from "next/server";
import { verify } from "./jwt";
import { COOKIE_TOKEN_KEY } from "./constants";
import { AuthSessionType } from "./types/session";

async function getSession(req: NextRequest, key?: string) {
  const token = req.cookies.get(key || COOKIE_TOKEN_KEY);
  const data = await verify(token?.value as string);
  return data as AuthSessionType;
}

export { getSession };
