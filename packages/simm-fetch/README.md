# simple-fetch

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]

💡 A simple fetch API Utils.

Implement from ofetch

## 🚀 Quick Start

Install:

```bash
# npm
npm i @techbase/simm-fetch

```

## ✔️ Usage

Import the required methods and constants:

```js
import { get, post, put, del } from "@techbase/simm-fetch";
```

## ✔️ GET Request

```js
const fetchData = async () => {
  try {
    const response = await get("/endpoint");
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

fetchData();
```

## ✔️ POST Request

```js
const postData = async () => {
  try {
    const response = await post("/endpoint", { key: "value" });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

postData();
```

## ✔️ PUT Request

```js
const updateData = async () => {
  try {
    const response = await put("/endpoint", { key: "value" });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

updateData();
```

## ✔️ DELETE Request

```js
const deleteData = async () => {
  try {
    const response = await del("/endpoint");
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

deleteData();
```

## ✔️ Retry Option

Retry a request up to a specified number of times if it fails:

```js
const fetchDataWithRetry = async () => {
  try {
    const response = await get("/endpoint", { retry: 3 });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

fetchDataWithRetry();
```

## ✔️ Timeout Option

Set a timeout for a request. If the request takes longer than the specified time, it will throw a timeout error:

```js
const fetchDataWithTimeout = async () => {
  try {
    const response = await get("/endpoint", { timeout: 1000 });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
```

## ✔️ Build Package

```js
npm run build
```

## ✔️ Publish Package

```js
npm login
```

```js
npm publish
```

# TODO

- [x] Authen Token/ RefreshToken
- [x] Retry Request
- [x] Timeout Request
- [ ] Request Config
- [ ] Merge Header
- [ ] Set/Get Header
- [ ] Handle Response Success
- [ ] Handle Response Error
- [ ] Error Type
- [ ] decode JWT token Util
- [ ] Flattern Object Payload
- [ ] Validate Payload/Body/Params
- [ ] Cache
- [ ] v..v..

## License

UIT. Made with 💖

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/simple-fetch?style=flat&colorA=18181B&colorB=F0DB4F
[npm-version-href]: https://npmjs.com/package/simple-fetch
[npm-downloads-src]: https://img.shields.io/npm/dm/simple-fetch?style=flat&colorA=18181B&colorB=F0DB4F
[npm-downloads-href]: https://npmjs.com/package/simple-fetch
[codecov-src]: https://img.shields.io/codecov/c/gh/unjs/simple-fetch/main?style=flat&colorA=18181B&colorB=F0DB4F
[codecov-href]: https://codecov.io/gh/unjs/simple-fetch
[bundle-src]: https://img.shields.io/bundlephobia/minzip/simple-fetch?style=flat&colorA=18181B&colorB=F0DB4F
[bundle-href]: https://bundlephobia.com/result?p=simple-fetch
[license-src]: https://img.shields.io/github/license/unjs/simple-fetch.svg?style=flat&colorA=18181B&colorB=F0DB4F
[license-href]: https://github.com/unjs/simple-fetch/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsDocs.io-reference-18181B?style=flat&colorA=18181B&colorB=F0DB4F
[jsdocs-href]: https://www.jsdocs.io/package/simple-fetch
