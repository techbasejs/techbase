# simm

<!-- automd:badges -->

[![npm version](https://flat.badgen.net/npm/v/simm)](https://npmjs.com/package/simm)
[![npm downloads](https://flat.badgen.net/npm/dm/simm)](https://npmjs.com/package/simm)


## Features

✅ Deploy to any remote server from local

✅ Supported proxyJump

✅ Supported sftp (beta)

## Install
```sh
# npm
npm install -g simm@latest

# yarn
yarn add -g simm@latest

# pnpm
pnpm install -g simm@latest

```

## Usage CLI
```sh
npx simm deploy [environment]
```

## Quick Usage
```typescript
import fs from "node:fs";
import { defineConfig } from "simm";

export default defineConfig({
  servers: {
    production: {
      user: "__USER__",
      host: "__HOST__",
      privateKey: "__PRIVATE_KEY__",
      passsword: "__PASSWORD__",
      deploy: {
        branch: "main",
        repo: `https://github.com/example/example.git`,
        path: "/home/_works/",
        postDeploy: 'pnpm install && pnpm build',
      }
    },
  },
});

```

Start deploy

```
npx simm deploy production
```

### Usage with proxyJump server

```typescript
import fs from "node:fs";
import { defineConfig } from "simm";

export default defineConfig({
  servers: {
    bastion: {
      user: "__USER__",
      host: "__HOST__",
      privateKey: "__PRIVATE_KEY__",
      passsword: "__PASSWORD__",
    },
    production: {
      user: "__USER__",
      host: "__HOST__",
      privateKey: "__PRIVATE_KEY__",
      passsword: "__PASSWORD__",
      proxyJump: 'bastion',
      deploy: {
        branch: "main",
        repo: `https://github.com/example/example.git`,
        path: "/home/_works/",
        postDeploy: 'pnpm install && pnpm build',
      }
    },
  },
});

```

### Sftp (beta)
```typescript
import { defineConfig } from "simm";

export default defineConfig({
  servers: {
    production: {
      user: "__USER__",
      host: "__HOST__",
      privateKey: "__PRIVATE_KEY__",
      passsword: "__PASSWORD__",
      sftp: {
        preSftp: 'pnpm build',
        source: '/home/local/source',
        dest: '/home/remote/source',
        postSftp: 'systemctl restart nginx',
      }
      // proxyJump: 'bastion', when use proxyJump to a bastion server
    },
  },
});
```