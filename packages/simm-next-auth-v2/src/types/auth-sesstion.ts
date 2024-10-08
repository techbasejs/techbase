import { JWTPayload } from "jose";

export type AuthSessionType = JWTPayload & {
  user?: any;
  token?: string;
};
