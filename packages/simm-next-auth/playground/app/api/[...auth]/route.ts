import { auth } from "../../../../src/auth";
import { AuthRequestType } from "../../../../src/types";
import { Provider } from "../../../../src/provider";

const loginProvider = new Provider("credentials", {
  name: "login",
  handler: async (
    request: AuthRequestType<{
      email?: string;
      password?: string;
      enable_2fa?: boolean;
    }>,
  ) => {
    const body = await request.json();
    return {
      authorized: !body.enable_2fa,
      session: body,
      jwt: {},
    };
  },
});

const twoFactorProvider = new Provider("credentials", {
  name: "2fa",
  handler: async (request: AuthRequestType<{ name?: string }>, { session }) => {
    console.log(session);
    const a = await request.json();
    return {
      session: session.user,
      jwt: {},
    };
  },
});

const h = auth({
  providers: [loginProvider, twoFactorProvider],
});

export { h as GET, h as POST };
