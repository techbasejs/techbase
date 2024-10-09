import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("chat-loading")
export class ChatLoading extends LitElement {
  render() {
    return html`<div class="loader"></div>`;
  }

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }
}
