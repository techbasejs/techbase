import { auth } from "../../../../src/auth";
import { AuthRequestType } from "../../../../src/types";
import { Provider } from "../../../../src/provider";

const loginProvider = new Provider("credentials", {
  name: "login",
  handler: async (
    request: AuthRequestType<{
      email?: string;
      password?: string;
    }>,
  ) => {
    const body = await request.json();
    return {
      authorized: true,
      session: body,
      jwt: {},
    };
  },
});

const handlers = auth({
  providers: [loginProvider],
});

export { handlers as GET, handlers as POST };
