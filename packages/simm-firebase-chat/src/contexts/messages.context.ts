import { createContext } from "@lit/context";
import { IMessage } from "./room.context";

export const messagesContext = createContext<IMessage[]>("messages");
