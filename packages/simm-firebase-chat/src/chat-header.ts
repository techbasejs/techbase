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
    subscribe: true,
  })
  room: IRoom | null;

  constructor() {
    super();
    this.room = null;
  }

  render() {
    const user = {
      avatar_url: this.room?.avatar_url,
      name: this.room?.name,
      role: "",
    };
    return html`
      <chat-avatar
        class="h-full flex gap-x-2.5 items-center"
        .user=${user}
      ></chat-avatar>
    `;
  }

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }
}
