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
import { IMessage, IRoom, roomContext } from "./contexts/room.context";
import { when } from "lit/directives/when.js";
import {
  collection,
  query,
  getFirestore,
  getDocs,
  doc,
  getDoc,
  addDoc,
  where,
  orderBy,
  Timestamp,
  limit,
  onSnapshot,
  startAfter,
  documentId,
} from "firebase/firestore";
import { messagesContext } from "./contexts/messages.context";
import "./utils/firebase";

const db = getFirestore();

@customElement("chat-room")
export class ChatRoom extends LitElement {
  static styles = css`
    ${unsafeCSS(globalStyles)}
  `;
  @provide({ context: userContext })
  user: IUser | null;

  @state()
  loading: boolean;

  @property()
  roomId: string | null;

  @property()
  userId: string | null;

  @provide({ context: roomContext })
  @state()
  roomInfo: IRoom | null;

  @state()
  roomError: boolean;

  @provide({ context: messagesContext })
  messages: IMessage[];

  constructor() {
    super();
    this.userId = null;
    this.user = null;
    this.roomId = null;
    this.roomInfo = null;
    this.roomError = false;
    this.messages = [];
    this.loading = true;
  }

  async subscribeNewMessage() {
    const q = query(
      collection(db, "messages"),
      where("room_id", "==", this.roomId),
      orderBy("created_at", "desc"),
      limit(1),
    );

    onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const messageDoc = snapshot.docs[0];

        const newMessage = {
          id: messageDoc.id,
          ...messageDoc.data(),
        } as IMessage;

        const messagePendingIndex = this.messages.findIndex(
          (message) => message.temp_id === newMessage.temp_id,
        );

        if (messagePendingIndex === -1) {
          const tempIdIndex = this.messages.findIndex(
            (message) => message.temp_id === newMessage.temp_id,
          );
          if (tempIdIndex === -1) {
            this.messages.push(messageDoc.data() as IMessage);
          }
        } else {
          this.messages[messagePendingIndex].id = messageDoc.id;
          this.messages[messagePendingIndex].pending = false;
        }
        this.messages = [...this.messages];
        this.checkMessageLoaded(() => {
          this.scrollToBottom();
          this.loading = false;
        });
      }
    });
  }

  async getUser() {
    const userSnapshot = await getDoc(doc(db, "users", this.userId as string));

    return {
      ...userSnapshot.data(),
      id: userSnapshot.id,
    } as IUser;
  }

  async getMembers(memberIds: string[]) {
    const membersSnapshot = await getDocs(
      query(collection(db, "users"), where(documentId(), "in", memberIds)),
    );

    return membersSnapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id }) as IUser,
    );
  }

  async getRoomMemberIds(roomId: string) {
    const roomUsersSnapshot = await getDocs(
      query(collection(db, "room_users"), where("room_id", "==", roomId)),
    );

    const roomUsers = roomUsersSnapshot.docs.map((doc) => doc.data());

    return roomUsers.map((roomUser) => roomUser.member_id as string);
  }

  async getRoom(roomId: string) {
    const snapshot = await getDoc(doc(db, "rooms", roomId));
    return {
      id: snapshot.id,
      ...snapshot.data(),
    } as IRoom;
  }

  async getMessages(roomId: string) {
    const snapshot = await getDocs(
      query(
        collection(db, "messages"),
        where("room_id", "==", roomId),
        orderBy("created_at", "desc"),
        limit(20),
      ),
    );
    return snapshot.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }) as IMessage)
      .reverse();
  }

  async connectedCallback(): Promise<void> {
    super.connectedCallback();

    if (this.userId) {
      this.user = await this.getUser();
    }

    if (this.roomId) {
      const room = await this.getRoom(this.roomId);
      if (room) {
        const roomMemberIds = await this.getRoomMemberIds(this.roomId);
        this.messages = await this.getMessages(this.roomId);
        if (roomMemberIds && roomMemberIds.length > 0) {
          const members = await this.getMembers(roomMemberIds);
          console.log(members);
          this.roomInfo = {
            ...room,
            members: members,
          };

          this.checkMessageLoaded(() => {
            this.scrollToBottom();
            this.loading = false;
          });
        } else {
          this.loading = false;
        }
        this.subscribeNewMessage();
      } else {
        this.loading = false;
        this.roomError = true;
      }
    }
  }

  firestoreAutoId() {
    const CHARS =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let autoId = "";

    for (let i = 0; i < 20; i++) {
      autoId += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
    }
    return autoId;
  }

  handleSendMessage(e: CustomEvent) {
    const tempId = this.firestoreAutoId();
    this.messages = [
      ...this.messages,
      {
        temp_id: tempId,
        sender_id: this.user?.id as string,
        room_id: this.roomInfo?.id.toString(),
        payload: e.detail.payload,
        pending: true,
      },
    ];

    this.checkMessageLoaded(() => {
      this.scrollToBottom();
      this.loading = false;
    });
    addDoc(collection(db, "messages"), {
      temp_id: tempId,
      sender_id: this.user?.id,
      room_id: this.roomInfo?.id.toString(),
      payload: e.detail.payload,
      created_at: Timestamp.now(),
    });
  }

  scrollToBottom() {
    const chatBodyElm = this.shadowRoot?.querySelector("chat-body");
    if (chatBodyElm) {
      const scrollHeight = chatBodyElm.scrollHeight;
      chatBodyElm.scrollTo(0, scrollHeight);
    }
  }

  scrollToScrollHeight(scrollHeight: number) {
    const chatBodyElm = this.shadowRoot?.querySelector("chat-body");
    if (chatBodyElm) {
      chatBodyElm.scrollTo(0, scrollHeight);
    }
  }

  checkMessageLoaded(onDone?: () => void) {
    if (this.messages.length === 0) {
      onDone?.();
      return;
    }
    const t = setInterval(() => {
      const totalMessageLoaded = this.shadowRoot
        ?.querySelector("chat-body")
        ?.querySelectorAll(".message-item").length;

      if (totalMessageLoaded === this.messages.length) {
        clearInterval(t);
        onDone?.();
      }
    }, 0);
  }

  async handleMessageScroll(
    e: CustomEvent<{
      scrollTop: boolean;
      scrollBottom: boolean;
      startMessageId: string;
      endMessageId: string;
    }>,
  ) {
    if (e.detail.scrollTop) {
      const docRef = doc(db, "messages", e.detail.startMessageId);
      const docSnap = await getDoc(docRef);
      const snapshot = await getDocs(
        query(
          collection(db, "messages"),
          where("room_id", "==", this.roomId),
          orderBy("created_at", "desc"),
          startAfter(docSnap),
          limit(20),
        ),
      );

      const previousMessages = snapshot.docs
        .map(
          (doc) =>
            ({
              ...doc.data(),
              id: doc.id,
              dom_pending: true,
            }) as IMessage,
        )
        .reverse();

      this.messages = [...previousMessages, ...this.messages];
      this.checkMessageLoaded(() => {
        const totalHeight = previousMessages.reduce((height, message) => {
          const startElm = this.shadowRoot?.querySelector(
            `.message-item-${message.id}`,
          );
          return height + (startElm?.clientHeight || 0);
        }, 0);

        this.messages = this.messages.map((message) => ({
          ...message,
          dom_pending: false,
        }));

        this.scrollToScrollHeight(totalHeight);
      });
    }

    if (e.detail.scrollBottom) {
      console.log("scrollBottom...");
    }
  }

  protected render() {
    const chatBodyClasses = {
      "flex-1": true,
      "overflow-y-auto": true,
      "px-4": true,
      "py-2": true,
      invisible: this.loading,
    };
    const chatBoxMessageClasses = {
      "border-t": true,
      "border-gray-200": true,
      "px-5": true,
      "py-3": true,
      "items-center": true,
      flex: true,
      hidden: this.loading,
    };

    return html`<div class="w-full h-full flex flex-col">
      ${when(
        this.roomInfo,
        () =>
          html`<chat-header
            class="h-14 border-b border-gray-200 px-8"
          ></chat-header>`,
      )}
      ${when(
        this.loading,
        () =>
          html`<div class="w-full h-full flex items-center justify-center">
            <chat-loading></chat-loading>
          </div>`,
      )}
      ${when(
        this.roomInfo,
        () =>
          html`<chat-body
            class=${classMap(chatBodyClasses)}
            @message-scroll=${this.handleMessageScroll}
          ></chat-body>`,
      )}
      ${when(
        this.roomInfo,
        () =>
          html`<chat-box-message
            class=${classMap(chatBoxMessageClasses)}
            @send-message=${this.handleSendMessage}
          ></chat-box-message>`,
      )}
      ${when(
        this.roomError,
        () =>
          html`<div class="w-full h-full flex items-center justify-center">
            <h4>Room not found</h4>
          </div>`,
      )}
    </div>`;
  }
}
