import { createContext } from "@lit/context";
import { IUser } from "./user.context";

export interface IMessage {
  senderId: number;
  payload: string;
}

export interface IRoom {
  id: number;
  name: string;
  avatarUrl: string;
  members: IUser[];
  messages: IMessage[];
}

export const roomContext = createContext<IRoom | null>("room");
