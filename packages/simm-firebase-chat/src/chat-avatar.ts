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
        this.user?.avatar_url,
        () =>
          html`<div class="rounded-full w-10 h-10 overflow-hidden">
            <img width="100%" src="${this.user?.avatar_url}" />
          </div>`,
      )}
      ${when(
        this.user?.name || this.user?.role,
        () =>
          html` <div class="flex flex-col">
            ${when(
              this.user?.name,
              () => html`<h4 class="text-base">${this.user?.name}</h4>`,
            )}
            ${when(
              this.user?.role,
              () => html`<p class="text-xs">${this.user?.role}</p>`,
            )}
          </div>`,
      )}
    `;
  }

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }
}
