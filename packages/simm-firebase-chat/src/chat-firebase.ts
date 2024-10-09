import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { provide } from "@lit/context";
import { classMap } from "lit/directives/class-map.js";

import globalStyles from "./styles.css?inline";
import "./chat-send-icon";
import "./chat-loading";
import "./chat-avatar";
import "./chat-header";
import "./chat-body";
import "./chat-box-message";
import { IUser, userContext } from "./contexts/user.context";
import { IRoom, roomContext } from "./contexts/room.context";
import { when } from "lit/directives/when.js";

@customElement("simm-firebase-chat")
export class SimmFirebaseChat extends LitElement {
  @provide({ context: userContext })
  @property({
    converter(value, type) {
      if (!value) {
        return null;
      }
      return JSON.parse(value);
    },
  })
  user: IUser | null;

  @state()
  loading: boolean;

  @provide({ context: roomContext })
  @property({
    converter(value, type) {
      if (!value) {
        return null;
      }
      return JSON.parse(value);
    },
  })
  roomInfo: IRoom | null;

  constructor() {
    super();
    this.user = null;
    this.roomInfo = null;
    this.loading = true;
  }

  static styles = css`
    ${unsafeCSS(globalStyles)}
  `;

  handleMessageLoaded() {
    this.scrollToBottom();
    this.loading = false;
  }

  scrollToBottom() {
    const chatBodyElm = this.shadowRoot?.querySelector("chat-body");
    if (chatBodyElm) {
      const scrollHeight = chatBodyElm.scrollHeight;
      chatBodyElm.scrollTo(0, scrollHeight);
    }
  }

  handleMessageScrollTop() {}

  protected render() {
    const classes = {
      loading: this.loading,
    };
    return html`<div id="simm-chat">
      <chat-header></chat-header>
      ${when(this.loading, () => html`<chat-loading></chat-loading>`)}
      <chat-body
        class=${classMap(classes)}
        @message-loaded=${this.handleMessageLoaded}
        @message-scroll=${this.handleMessageScrollTop}
      ></chat-body>
      <chat-box-message class=${classMap(classes)}></chat-box-message>
    </div>`;
  }
}
