# Simple Next Auth

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Codecov][codecov-src]][codecov-href]

> Missing [ECMAScript module](https://nodejs.org/api/esm.html) utils for Node.js

Next auth for next@14

## Usage

Install npm package:

```sh
# using yarn
yarn add @techbase/simm-next-auth

# using npm
npm install @techbase/simm-next-auth

# using pnpm
pnpm install @techbase/simm-next-auth
```

**Note:** Node.js 18+ is recommended.

Import utils:

```js
// ESM
import {} from "@techbase/simple-next-auth";

// CommonJS
const {} = require("@techbase/simple-next-auth");
```

## Resolving ESM modules

Several utilities to make ESM resolution easier:

- Respecting [ECMAScript Resolver algorithm](https://nodejs.org/dist/latest-v14.x/docs/api/esm.html#esm_resolver_algorithm)
- Exposed from Node.js implementation
- Windows paths normalized
- Supporting custom `extensions` and `/index` resolution
- Supporting custom `conditions`
- Support resolving from multiple paths or urls

### Setup middleware

```javascript
import { NextResponse } from "next/server";
import { withAuth } from "simple-next-auth";

const auth = withAuth(function middleware(request) {
  const pathname = request.nextUrl.pathname;
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
});

export default auth;

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // "/:path*",
    "/((?!api|login|_next/static|_next/image|favicon.ico).*)",
  ],
};
```

### Setup provider

```jsx
"use client";

import { SessionProvider } from "next-simple-auth/dist/react";

export default function App({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

```

### Setup auth api routes

Create file /api/[...auth]/route.ts

```typescript
import { auth, Provider, AuthRequestType } from "simple-next-auth";
import { NextRequest } from "next/server";

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
    const body = await request.json();
    return {
      session: session,
      jwt: {
        // Jwt options
      },
    };
  },
});

const h = auth({
  providers: [loginProvider, twoFactorProvider],
});

export { h as GET, h as POST };
```

Provider response params

| Field      | Default value | Type    | Description                                        |
| ---------- | ------------- | ------- | -------------------------------------------------- |
| session    | {}            | object  | auth session data                                  |
| authorized | true          | boolean | if `authorized` is `false`, skipped generate token |
| jwt        | object        | {}      | jwt config                                         |

## Usage

### signIn

```typescript
import { signIn } from "next-simple-auth/dist/react";

signIn("login", {
  email: "EMAIL",
  password: "PASSWORD",
});
```

### signOut

```typescript
import { signOut } from "next-simple-auth/dist/react";

signout();
```

### Use and update session

```jsx
import { useSession } from "next-simple-auth/dist/react";

export default function Login() {
    const { user, update } = useSession()

    return <div>
        {{ user.email }}
    </div>
}

```

## License

[MIT](./LICENSE) - Made with 💛

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/simple-next-auth?style=flat&colorA=18181B&colorB=F0DB4F
[npm-version-href]: https://npmjs.com/package/simple-next-auth
[npm-downloads-src]: https://img.shields.io/npm/dm/simple-next-auth?style=flat&colorA=18181B&colorB=F0DB4F
[npm-downloads-href]: https://npmjs.com/package/simple-next-auth
[codecov-src]: https://img.shields.io/codecov/c/gh/unjs/simple-next-auth/main?style=flat&colorA=18181B&colorB=F0DB4F
[codecov-href]: https://codecov.io/gh/unjs/simple-next-auth
