import { SignJWT, jwtVerify } from "jose";
import { SIMPLE_NEXT_AUTH_DEFAULT } from "../../simm-next-auth-v2/src/constants-default";

const SECRET_KEY = process.env.NEXT_AUTH_SECRET;

const secret = new TextEncoder().encode(SECRET_KEY);

export async function sign<T extends object>(payload: T) {
  const alg = "HS256";
  const jwt = await new SignJWT({
    "urn:simple-next-auth:claim": true,
    user: payload,
  })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer(process.env.JWT_ISSUER || SIMPLE_NEXT_AUTH_DEFAULT.JWT_ISSUER)
    .setAudience(
      process.env.JWT_AUDIENCE || SIMPLE_NEXT_AUTH_DEFAULT.JWT_AUDIENCE,
    )
    .setExpirationTime(
      process.env.JWT_EXPIRE_TIME || SIMPLE_NEXT_AUTH_DEFAULT.JWT_EXPIRE_TIME,
    )
    .sign(secret);

  return jwt;
}

export async function verify<T>(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret, {
      issuer: process.env.JWT_ISSUER || SIMPLE_NEXT_AUTH_DEFAULT.JWT_ISSUER,
      audience:
        process.env.JWT_AUDIENCE || SIMPLE_NEXT_AUTH_DEFAULT.JWT_AUDIENCE,
    });
    return payload;
  } catch {
    return null;
  }
}
