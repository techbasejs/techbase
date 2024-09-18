import { CookieSerializeOptions } from 'cookie';

type CookieOptions = CookieSerializeOptions;
interface Cookie {
    name: string;
    value: string;
    options: CookieOptions;
}

export {
    CookieOptions,
    Cookie
}