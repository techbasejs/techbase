# @techbasejs/simm

<!-- automd:badges -->

[![npm version](https://flat.badgen.net/npm/v/@techbasejs/simm)](https://npmjs.com/package/@techbasejs/simm)
[![npm downloads](https://flat.badgen.net/npm/dm/@techbasejs/simm)](https://npmjs.com/package/@techbasejs/simm)

## Features

✅ Deploy to any remote server from local

✅ Supported proxyJump

✅ Supported sftp

## Install

```sh
# npm
npm install -g @techbasejs/simm@latest

# yarn
yarn add -g @techbasejs/simm@latest

# pnpm
pnpm install -g @techbasejs/simm@latest

```

## Usage CLI

```sh
npx @techbasejs/simm deploy [environment]
```

## Quick Usage

```typescript
import fs from "node:fs";
import { defineConfig } from "@techbasejs/simm";

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
        postDeploy: "pnpm install && pnpm build",
      },
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
import { defineConfig } from "@techbasejs/simm";

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
      proxyJump: "bastion",
      deploy: {
        branch: "main",
        repo: `https://github.com/example/example.git`,
        path: "/home/_works/",
        postDeploy: "pnpm install && pnpm build",
      },
    },
  },
});
```

### Sftp (beta)

```typescript
import { defineConfig } from "@techbasejs/simm";

export default defineConfig({
  servers: {
    production: {
      user: "__USER__",
      host: "__HOST__",
      privateKey: "__PRIVATE_KEY__",
      passsword: "__PASSWORD__",
      sftp: {
        preSftp: "pnpm build",
        source: "/home/local/source",
        dest: "/home/remote/source",
        postSftp: "systemctl restart nginx",
      },
      // proxyJump: 'bastion', when use proxyJump to a bastion server
    },
  },
});
```
