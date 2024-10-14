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
    const dataLogin = {}
    fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: body.email,
        password: body.password,
        expiresInMins: 30, 
      }),
      credentials: 'include' 
    })
    .then(res => res.json())
    .then(res => {
      Object.assign(dataLogin,res) 
    })

    return {
      authorized: true,
      session: {
        user: dataLogin
      },
    };
  },
});

const handlers = auth({
  providers: [loginProvider],
});

export { handlers as GET, handlers as POST };
