import { consume } from "@lit/context";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getFirestore,
} from "firebase/firestore";
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { IRoom, roomContext } from "./contexts/room.context";
import { IUser, userContext } from "./contexts/user.context";

@customElement("chat-box-message")
export class ChatBoxMessage extends LitElement {
  @state()
  payload: string;

  @consume({
    context: roomContext,
    subscribe: true,
  })
  roomInfo: IRoom | null;

  @consume({
    context: userContext,
    subscribe: true,
  })
  user: IUser | null;

  constructor() {
    super();
    this.payload = "";
    this.roomInfo = null;
    this.user = null;
  }

  handleInput(e: InputEvent) {
    const element = e.target as HTMLTextAreaElement;
    this.payload = element.value || "";
    this.autoGrowTextarea(element);
  }
  render() {
    return html`
      <textarea
        class="h-6 resize-none outline-none max-h-80 text-base flex-1"
        .value=${this.payload}
        @input=${this.handleInput}
        placeholder="Enter text here..."
      ></textarea>
      <button class="border-none" @click=${this.handleSendMessage}>
        <chat-send-icon></chat-send-icon>
      </button>
    `;
  }

  handleSendMessage() {
    if (!this.payload.trim()) {
      return;
    }
    const event = new CustomEvent("send-message", {
      detail: {
        payload: this.payload.trim(),
      },
    });

    this.dispatchEvent(event);
    this.payload = "";
  }

  autoGrowTextarea(element: HTMLTextAreaElement) {
    if (element) {
      element.style.height = "16px";
      element.style.height = element.scrollHeight + "px";
    }
  }

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }
}
