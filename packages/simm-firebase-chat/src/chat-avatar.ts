import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { consume } from "@lit/context";
import { IUser, userContext } from "./contexts/user.context";
import { when } from "lit/directives/when.js";

@customElement("chat-avatar")
export class ChatAvatar extends LitElement {
  @property()
  user: IUser | null;

  constructor() {
    super();
    this.user = null;
  }

  render() {
    return html`
      ${when(
        this.user?.avatarUrl,
        () =>
          html`<div class="chat-avatar__img">
            <img src="${this.user?.avatarUrl}" />
          </div>`,
      )}
      ${when(
        this.user?.name || this.user?.role,
        () =>
          html` <div class="chat-avatar__user">
            ${when(
              this.user?.name,
              () =>
                html`<h4 class="chat-avatar__user__name">
                  ${this.user?.name}
                </h4>`,
            )}
            ${when(
              this.user?.role,
              () =>
                html`<p class="chat-avatar__user__role">${this.user?.role}</p>`,
            )}
          </div>`,
      )}
    `;
  }

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }
}
