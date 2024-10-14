import { JWTPayload } from "jose";

type AuthSessionType = JWTPayload & {
  user?: Record<string, any>;
};

export { AuthSessionType };
