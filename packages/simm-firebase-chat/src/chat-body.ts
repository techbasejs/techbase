import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { IMessage, IRoom, roomContext } from "./contexts/room.context";
import { consume } from "@lit/context";
import { IUser, userContext } from "./contexts/user.context";
import { when } from "lit/directives/when.js";
import { messagesContext } from "./contexts/messages.context";
import { classMap } from "lit/directives/class-map.js";
import { repeat } from "lit/directives/repeat.js";
@customElement("chat-body")
export class ChatBody extends LitElement {
  @consume({
    context: userContext,
    subscribe: true,
  })
  user: IUser | null;

  @consume({
    context: roomContext,
    subscribe: true,
  })
  room: IRoom | null;

  @consume({
    context: messagesContext,
    subscribe: true,
  })
  messages: IMessage[];

  @state()
  scrollTopLoading: boolean;

  @state()
  scrollBottomLoading: boolean;

  constructor() {
    super();
    this.room = null;
    this.user = null;
    this.messages = [];
    this.scrollTopLoading = false;
    this.scrollBottomLoading = false;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("scroll", (e: Event) => {
      const target = e.target as HTMLDivElement;
      const eventDetail = {
        scrollTop: false,
        scrollBottom: false,
        startMessageId: this.messages[0].id,
        endMessageId: this.messages.at(-1)?.id,
      };

      if (this.isScrollTop(target)) {
        eventDetail.scrollTop = true;
        eventDetail.scrollBottom = false;
        this.scrollTopLoading = true;
      }

      if (this.isScrollBottom(target)) {
        eventDetail.scrollTop = false;
        eventDetail.scrollBottom = true;
        // this.scrollBottomLoading = true;
      }

      const event = new CustomEvent("message-scroll", {
        detail: eventDetail,
      });

      this.dispatchEvent(event);
    });
  }

  isScrollTop(elm: HTMLDivElement) {
    const scrollTop = elm.scrollTop;
    return scrollTop === 0;
  }

  isScrollBottom(elm: HTMLDivElement) {
    const scrollTop = elm.scrollTop;
    const limit = elm.scrollHeight - elm.clientHeight;
    return scrollTop === limit;
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  render() {
    return html`${when(
        this.scrollTopLoading,
        () =>
          html`<div class="flex justify-center">
            <chat-loading></chat-loading>
          </div>`,
      )}
      <div class="flex-1 flex flex-col">
        ${repeat(
          this.messages,
          (message) => message.id,
          this.renderMessageItem.bind(this),
        )}
      </div>
      ${when(
        this.scrollBottomLoading,
        () =>
          html`<div class="px-4">
            <chat-loading></chat-loading>
          </div>`,
      )} `;
  }
  private renderMessageItem(message: IMessage) {
    if (message.sender_id === this.user?.id) {
      return this.renderCurrentUserMessageItem(message);
    }
    return this.renderOtherUserMessageItem(message);
  }

  private renderCurrentUserMessageItem(message: IMessage) {
    const user = this.getMemberInfo(message);
    const classes = {
      ...(!!message.dom_pending && {
        absolute: true,
        "left-[-10000px]": true,
      }),
      "py-4": true,
      flex: true,
      "justify-end": true,
      "message-item": true,
      [`message-item-${message.id}`]: true,
    };

    return html`<div class=${classMap(classes)}>
      <div class="flex gap-x-2.5 items-center max-w-80">
        ${when(message.pending, () => html`<chat-loading></chat-loading>`)}
        ${this.renderPayload(message.payload)}
        <chat-avatar
          class="h-full flex gap-x-2.5 items-center"
          .user=${{
            avatar_url: user?.avatar_url,
          }}
        ></chat-avatar>
      </div>
    </div>`;
  }

  private renderOtherUserMessageItem(message: IMessage) {
    const classes = {
      ...(!!message.dom_pending && {
        absolute: true,
        "left-[-10000px]": true,
      }),
      "py-4": true,
      flex: true,
      "message-item": true,
      [`message-item-${message.id}`]: true,
    };
    const user = this.getMemberInfo(message);
    return html`<div class=${classMap(classes)}>
      <div class="flex gap-x-2.5 items-center max-w-80">
        <chat-avatar
          .user=${{
            avatar_url: user?.avatar_url,
          }}
        ></chat-avatar>
        ${this.renderPayload(message.payload)}
      </div>
    </div>`;
  }

  private renderPayload(payload: string) {
    const classes = `bg-gray-200 rounded-md p-2 break-all whitespace-pre-line`;
    return html`<div class="${classes}">${payload}</div>`;
  }

  private getMemberInfo(message: IMessage) {
    return this.room?.members.find((member) => member.id === message.sender_id);
  }

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }
}
