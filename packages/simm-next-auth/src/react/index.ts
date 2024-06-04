import { ofetch } from "ofetch";
import { useSessionContext } from "./provider";

export const useSession = <T>() => {
  const context = useSessionContext<T>();
  return context;
};

export function signIn<T>(name: string, body?: T) {
  const url = `/api/auth/${name}`;
  return ofetch(url, {
    method: "POST",
    body: (body || {}) as BodyInit,
  });
}

export function signOut() {
  const url = `/api/auth/logout`;
  return ofetch(url, {
    method: "GET",
  });
}

export * from "./provider";
