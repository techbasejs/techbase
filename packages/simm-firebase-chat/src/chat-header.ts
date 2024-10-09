import { consume } from "@lit/context";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { IRoom, roomContext } from "./contexts/room.context";

@customElement("chat-header")
export class ChatHeader extends LitElement {
  @property()
  user: any = null;

  @consume({
    context: roomContext,
  })
  room: IRoom | null;

  constructor() {
    super();
    this.room = null;
  }

  render() {
    const user = {
      avatarUrl: this.room?.avatarUrl,
      name: this.room?.name,
      role: "GROUP",
    };
    return html` <chat-avatar .user=${user}></chat-avatar> `;
  }

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }
}
