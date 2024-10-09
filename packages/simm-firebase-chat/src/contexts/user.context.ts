import { createContext } from "@lit/context";

export interface IUser {
  id: string;
  name: string;
  avatar_url: string;
  role: string;
}

export const userContext = createContext<IUser | null>("user");
