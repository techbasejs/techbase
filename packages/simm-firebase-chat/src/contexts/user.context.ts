import { createContext } from "@lit/context";

export interface IUser {
  id: number;
  name: string;
  avatarUrl: string;
  role: string;
}

export const userContext = createContext<IUser | null>("user");
