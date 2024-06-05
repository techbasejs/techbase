import Cookies from "js-cookie";

export const setToken = (token: string) => {
  Cookies.set("token", token);
};

export const getToken = (): string | undefined => {
  return Cookies.get("token");
};
