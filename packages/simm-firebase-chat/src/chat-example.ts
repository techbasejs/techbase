import { LitElement, PropertyValueMap, css, html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { consume } from "@lit/context";
import { IUser, userContext } from "./contexts/user.context";
import { when } from "lit/directives/when.js";
import globalStyles from "./styles.css?inline";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  where,
  query,
  documentId,
  orderBy,
} from "firebase/firestore";
import "./utils/firebase";
import { repeat } from "lit/directives/repeat.js";
import { classMap } from "lit/directives/class-map.js";
import { IRoom } from "./contexts/room.context";
const db = getFirestore();
@customElement("chat-example")
export class ChatExample extends LitElement {
  static styles = css`
    ${unsafeCSS(globalStyles)}
  `;
  @state()
  roomName: string;

  @state()
  userId: string;

  @state()
  userName: string;

  @state()
  loading: boolean;

  @state()
  userAvatarUrl: string;

  @state()
  rooms: IRoom[];

  avatarImages: string[];

  constructor() {
    super();

    this.roomName = "";
    this.userName = "";
    this.rooms = [];
    this.userId = localStorage.getItem("user_id") || "";
    this.loading = false;
    this.avatarImages = Array.from({ length: 100 }, (_, i) => i + 1).map(
      (i) => {
        const n = i >= 10 ? i : "0" + i;
        return `https://accounts.ac-illust.com/profile-images/human/0-${n}.jpg`;
      },
    );
    this.userAvatarUrl = this.avatarImages[0];
  }

  protected updated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>,
  ): void {
    // console.log(_changedProperties);
  }

  async handleCreateUser() {
    if (!this.userName.trim() || !this.userAvatarUrl.trim()) {
      return;
    }
    this.loading = true;
    const docRef = await addDoc(collection(db, "users"), {
      name: this.userName,
      avatar_url: this.userAvatarUrl,
    });

    localStorage.setItem("user_id", docRef.id);

    this.userId = docRef.id;
    this.loading = false;
  }

  async handleCreateRoom() {
    if (!this.roomName.trim()) {
      return;
    }
    this.loading = true;
    const docRef = await addDoc(collection(db, "rooms"), {
      name: this.roomName,
    });

    await addDoc(collection(db, "room_users"), {
      member_id: this.userId,
      room_id: docRef.id,
    });

    location.href = `/?room_id=${docRef.id}`;
  }

  async handleChangeRoomName(e: Event) {
    this.roomName = (e.target as HTMLInputElement).value;
  }

  async handleChangeUserName(e: Event) {
    this.userName = (e.target as HTMLInputElement).value;
  }

  async handleSelectUserAvatar(url: string) {
    this.userAvatarUrl = url;
  }

  async fetchRooms() {
    const querySnapshot = await getDocs(
      query(
        collection(db, "room_users"),
        where("member_id", "==", this.userId),
      ),
    );

    const roomUsers = querySnapshot.docs.map(
      (doc) =>
        ({
          ...doc.data(),
          id: doc.id,
        }) as {
          id: string;
          member_id: string;
          room_id: string;
        },
    );

    const roomIds = roomUsers.map((roomUser) => roomUser.room_id);

    const roomsQuerySnapshot = await getDocs(
      query(collection(db, "rooms"), where(documentId(), "in", roomIds)),
    );

    const rooms = roomsQuerySnapshot.docs.map(
      (doc) =>
        ({
          ...doc.data(),
          id: doc.id,
        }) as IRoom,
    );

    this.rooms = rooms;
  }

  async connectedCallback(): Promise<void> {
    super.connectedCallback();

    if (this.userId) {
      this.fetchRooms();
    }
  }

  render() {
    if (this.userId) {
      return this.renderCreateRoom();
    }
    return this.renderCreateUser();
  }

  renderCreateUser() {
    return html`<div class="w-full h-full flex items-center justify-center">
      <div class="text-center w-[600px] flex flex-col">
        <h3 class="text-md w-full text-left">Your name</h3>
        <input
          .value=${this.userName}
          @input=${this.handleChangeUserName}
          type="text"
          class="mt-2 py-3 px-4 block w-full border border-gray-200 outline-none rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
          placeholder="Enter your name"
        />
        <h3 class="mt-4 6text-md w-full text-left">Select Your Avatar</h3>
        <div class="grid grid-cols-10 gap-2 mt-4 max-h-96 overflow-y-auto">
          ${repeat(this.avatarImages, (url) => {
            const classes = {
              border: true,
              "p-1": true,
              "cursor-pointer": true,
              "border-blue-700": false,
            };

            if (this.userAvatarUrl === url) {
              classes["border-blue-700"] = true;
            }
            return html`<div
              class=${classMap(classes)}
              @click=${() => this.handleSelectUserAvatar(url)}
            >
              <img width="100%" src="${url}" />
            </div>`;
          })}
        </div>

        <button
          @click=${this.handleCreateUser}
          .disabled=${!this.userAvatarUrl || !this.userName || this.loading}
          type="button"
          class="mt-6 w-full py-3 px-4 items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
        >
          Next
        </button>
      </div>
    </div>`;
  }

  renderCreateRoom() {
    return html`<div
      class="w-full h-full flex-col flex items-center justify-center"
    >
      <div class="divide-y divide-solid w-full max-w-sm">
        <div class="max-w-md space-y-3 text-center gap-y-4 flex flex-col">
          <h3 class="text-lg font-bold">CREATE A ROOM</h3>
          <input
            .value=${this.roomName}
            @input=${this.handleChangeRoomName}
            type="text"
            class="py-3 px-4 block w-full border border-gray-200 outline-none rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
            placeholder="Enter room name"
          />
          <button
            @click=${this.handleCreateRoom}
            .disabled=${!this.roomName || this.loading}
            type="button"
            class="w-full py-3 px-4 items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          >
            Save
          </button>
        </div>
        <div class="mt-5 flex flex-col gap-y-4">
          <h4 class="mt-8 text-md font-medium">Your groups</h4>
          ${repeat(
            this.rooms,
            (room, index) =>
              html`<a
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                href="?room_id=${room.id}"
                >${index + 1}. ${room.name}</a
              >`,
          )}
        </div>
      </div>
    </div>`;
  }
}
