import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("chat-app")
export class ChatApp extends LitElement {
  static styles = css`
    :host {
      display: flex;
      height: 100vh;
      font-family: Arial, sans-serif;
      width: 100%;
    }
    .sidebar {
      width: 200px;
      background: #f0f0f0;
      padding: 10px;
      border-right: 1px solid #ccc;
    }
    .sidebar h2 {
      margin: 40px 20px;
      font-size: 25px;
    }
    .room {
      padding: 10px;
      cursor: pointer;
      transition: background 0.2s;
    }
    .room:hover {
      background: #e0e0e0;
    }
    .chat-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 30px;
      position: relative;
      background: white;
    }
    .messages {
      flex: 1;
      overflow-y: auto;
      border: 1.5px solid #007bff;
      padding: 15px;
      margin-bottom: 10px;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      background: #f9f9f9;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .message {
      max-width: 60%;
      margin-bottom: 10px;
      padding: 10px;
      border-radius: 8px;
      position: relative;
      align-self: flex-start;
      word-wrap: break-word;
      overflow-wrap: break-word;
      background: #e1f5fe;
    }
    .message.self {
      background: #c8e6c9;
      align-self: flex-end;
    }
    .input-container {
      display: flex;
      position: relative;
      height: 50px;
    }
    input {
      flex: 1;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      outline: none;
    }
    button {
      height: 100%;
      padding: 0 10px;
      margin-left: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
    .active-room {
      background: #d0e0ff;
    }
  `;
  @property({ type: Array }) rooms = ["Room 1", "Room 2", "Room 3"];
  @property({ type: Array }) messages: string[] = [];
  @property({ type: String }) newMessage = "";
  @property({ type: String }) currentRoom = "";
  private inputElement!: HTMLInputElement;

  render() {
    return html`
      <div class="sidebar">
        <h2>Chat Rooms</h2>
        ${this.rooms.map(
          (room) => html`
            <div
              class="room ${this.currentRoom === room ? "active-room" : ""}"
              @click=${() => this.openRoom(room)}
            >
              ${room}
            </div>
          `,
        )}
      </div>
      <div class="chat-container">
        <h2>${this.currentRoom || "Select a room"}</h2>
        ${this.currentRoom
          ? html`
              <div class="messages">
                ${this.messages.map(
                  (message, index) => html`
                    <div class="message ${index % 2 === 0 ? "self" : ""}">
                      ${message}
                    </div>
                  `,
                )}
              </div>
              <div class="input-container">
                <input
                  type="text"
                  .value=${this.newMessage}
                  @input=${this.handleInput}
                  placeholder="Type a message..."
                  @ref=${(el: HTMLInputElement) => (this.inputElement = el)}
                />
                <button @click=${this.sendMessage}>Send</button>
              </div>
            `
          : html`<p>Please select a room</p>`}
      </div>
    `;
  }

  handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.newMessage = input.value;
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages = [...this.messages, this.newMessage];
      this.newMessage = "";
      this.inputElement?.focus();
    }
  }

  openRoom(room: string) {
    this.currentRoom = room;
    this.messages = [];
  }
}
