import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { IMessage, IRoom, roomContext } from "./contexts/room.context";
import { consume } from "@lit/context";
import { IUser, userContext } from "./contexts/user.context";
import { when } from "lit/directives/when.js";

@customElement("chat-body")
export class ChatBody extends LitElement {
  @consume({
    context: userContext,
  })
  user: IUser | null;

  @consume({
    context: roomContext,
  })
  room: IRoom | null;

  @state()
  scrollTopLoading: boolean;

  @state()
  scrollBottomLoading: boolean;

  constructor() {
    super();
    this.room = null;
    this.user = null;
    this.scrollTopLoading = false;
    this.scrollBottomLoading = false;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.checkMessageLoaded();
    this.addEventListener("scroll", (e: Event) => {
      const target = e.target as HTMLDivElement;

      const eventDetail = {
        scrollTop: false,
        scrollBottom: false,
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

  checkMessageLoaded() {
    const t = setInterval(() => {
      const totalMessageLoaded =
        this.querySelectorAll(".message-wrapper").length;

      if (totalMessageLoaded === this.room?.messages.length) {
        clearInterval(t);
        const event = new CustomEvent("message-loaded", {
          detail: true,
        });

        this.dispatchEvent(event);
      }
    }, 1000);
  }

  render() {
    return html`${when(
        this.scrollTopLoading,
        () =>
          html`<div class="chat-body__scroll-loading">
            <chat-loading></chat-loading>
          </div>`,
      )}
      <div class="chat-body__container">
        ${this.room?.messages.map(this.renderMessageItem.bind(this))}
      </div>
      ${when(
        this.scrollBottomLoading,
        () =>
          html`<div class="chat-body__scroll-loading">
            <chat-loading></chat-loading>
          </div>`,
      )} `;
  }
  private renderMessageItem(message: IMessage) {
    if (message.senderId === this.user?.id) {
      return this.renderCurrentUserMessageItem(message);
    }
    return this.renderOtherUserMessageItem(message);
  }

  private renderCurrentUserMessageItem(message: IMessage) {
    const user = this.getMemberInfo(message);
    return html`<div class="message-wrapper message-wrapper--right">
      <div class="message-item">
        <div class="message-item__payload">${message.payload}</div>
        <chat-avatar
          .user=${{
            avatarUrl: user?.avatarUrl,
          }}
        ></chat-avatar>
      </div>
    </div>`;
  }

  private renderOtherUserMessageItem(message: IMessage) {
    const user = this.getMemberInfo(message);
    return html`<div class="message-wrapper">
      <div class="message-item">
        <chat-avatar
          .user=${{
            avatarUrl: user?.avatarUrl,
          }}
        ></chat-avatar>
        <div class="message-item__payload">${message.payload}</div>
      </div>
    </div>`;
  }

  private getMemberInfo(message: IMessage) {
    return this.room?.members.find((member) => member.id === message.senderId);
  }

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }
}
