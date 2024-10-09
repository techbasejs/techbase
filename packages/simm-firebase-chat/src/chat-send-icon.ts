import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("chat-send-icon")
export class ChatSendIcon extends LitElement {
  render() {
    return html`<svg
      fill="none"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      style="position: relative; left: 1px;"
    >
      <path
        fill="var(--primary-color)"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.374 3.22a1 1 0 0 1 1.073-.114l16 8a1 1 0 0 1 0 1.788l-16 8a1 1 0 0 1-1.417-1.136L4.97 12 3.03 4.243a1 1 0 0 1 .344-1.023ZM6.781 13l-1.284 5.133L17.764 12 5.497 5.867 6.781 11H9a1 1 0 1 1 0 2H6.78Z"
      ></path>
    </svg>`;
  }

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }
}
