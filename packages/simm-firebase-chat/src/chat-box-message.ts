import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("chat-box-message")
export class ChatBoxMessage extends LitElement {
  handleInput(e: InputEvent) {
    const element = e.target as HTMLTextAreaElement;
    this.autoGrowTextarea(element);
  }
  render() {
    return html`
      <textarea
        @input=${this.handleInput}
        placeholder="Enter text here..."
      ></textarea>
      <button class="chat-btn-send">
        <chat-send-icon></chat-send-icon>
      </button>
    `;
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
