import { createContext } from "@lit/context";
import { IUser } from "./user.context";

export interface IMessage {
  id?: string;
  temp_id?: string;
  room_id?: string;
  sender_id: string;
  payload: string;
  pending?: boolean;
  dom_pending?: boolean;
}

export interface IRoom {
  id: string;
  name: string;
  avatar_url: string;
  members: IUser[];
}

export const roomContext = createContext<IRoom | null>("room");
