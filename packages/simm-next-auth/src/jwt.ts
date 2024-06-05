import { SignJWT, jwtVerify } from "jose";

const SECRET_KEY = process.env.NEXT_AUTH_SECRET

const secret = new TextEncoder().encode(SECRET_KEY);

export async function sign<T extends object>(payload: T) {
  const alg = "HS256";
  const jwt = await new SignJWT({
    "urn:simple-next-auth:claim": true,
    user: payload,
  })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer("simple-next-auth:issuer")
    .setAudience("simple-next-auth:audience")
    .setExpirationTime("2h")
    .sign(secret);

  return jwt;
}

export async function verify<T>(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret, {
      issuer: "simple-next-auth:issuer",
      audience: "simple-next-auth:audience",
    });
    return payload;
  } catch {
    return null;
  }
}
