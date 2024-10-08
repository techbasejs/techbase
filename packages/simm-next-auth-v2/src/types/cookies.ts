import { CookieSerializeOptions } from "cookie";

type CookieOptions = CookieSerializeOptions;

type Cookie = {
  name: string;
  value: string;
  options: CookieOptions;
};

export { CookieOptions, Cookie };
