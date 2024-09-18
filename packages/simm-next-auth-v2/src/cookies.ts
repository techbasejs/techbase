import { CookieOptions, Cookie } from "./types";

class Cookies {
  values: Cookie[] = [];
  append(name: string, value: string, options: CookieOptions) {
    this.values.push({
      name,
      value,
      options,
    });
  }

  remove(name: string) {
    this.values.push({
      name,
      value: "",
      options: {
        httpOnly: true,
        secure: false,
        path: "/",
        maxAge: 0,
      },
    });
  }
}

export {
  Cookies
}
