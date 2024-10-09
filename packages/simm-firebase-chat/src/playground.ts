import "./chat-firebase";
import { IRoom } from "./contexts/room.context";
import { IUser } from "./contexts/user.context";

document.querySelector("body");

const user: IUser = {
  id: 1,
  name: "Dell Camaron",
  role: "Techonogy Of Office",
  avatarUrl:
    "https://cdn.bsky.app/img/avatar_thumbnail/plain/did:plc:o4pdps2jkn7uhrdgadni7djk/bafkreibhaxf2a2gmnfomgzmbuie6l56l6fojt7uhjqwwn6g66lbdivhgaq@jpeg",
};

const members: IUser[] = [
  user,
  {
    id: 2,
    name: "Carler Kevin",
    role: "Customer Support",
    avatarUrl:
      "https://cdn.bsky.app/img/avatar_thumbnail/plain/did:plc:rmighyqfgqo37snbbv46xkkd/bafkreic3gfdktfbvsvy3yf7mebt5nr4gezivv3ypfpao7we67k6c4jnyfy@jpeg",
  },
];

const roomInfo: IRoom = {
  id: 33,
  name: "room A",
  members: members,
  avatarUrl:
    "https://cdn.bsky.app/img/avatar_thumbnail/plain/did:plc:ahb323pgu4lgglqzsfbt6fjd/bafkreiggv4ymzxqxmnvltvlyryvr4xuo2pykn6dr4a4ipr5q4bofvbwsjy@jpeg",
  messages: [
    {
      senderId: 1,
      payload:
        "Today, I'm going to talk about travel. Travelling is one of my funnest activities.",
    },
    {
      senderId: 2,
      payload:
        "Today, I'm going to talk about travel. Travelling is one of my funnest activities.",
    },
    {
      senderId: 1,
      payload:
        "Today, I'm going to talk about travel. Travelling is one of my funnest activities.",
    },
    {
      senderId: 2,
      payload:
        "Today, I'm going to talk about travel. Travelling is one of my funnest activities.",
    },
    {
      senderId: 1,
      payload:
        "Today, I'm going to talk about travel. Travelling is one of my funnest activities.",
    },
    {
      senderId: 1,
      payload:
        "Today, I'm going to talk about travel. Travelling is one of my funnest activities.",
    },
    {
      senderId: 1,
      payload:
        "Today, I'm going to talk about travel. Travelling is one of my funnest activities.",
    },
    {
      senderId: 1,
      payload:
        "Today, I'm going to talk about travel. Travelling is one of my funnest activities.",
    },
    {
      senderId: 1,
      payload:
        "Today, I'm going to talk about travel. Travelling is one of my funnest activities.",
    },
    {
      senderId: 1,
      payload:
        "Today, I'm going to talk about travel. Travelling is one of my funnest activities.",
    },
    {
      senderId: 1,
      payload:
        "Today, I'm going to talk about travel. Travelling is one of my funnest activities.",
    },
    {
      senderId: 2,
      payload:
        "Today, I'm going to talk about travel. Travelling is one of my funnest activities.",
    },
    {
      senderId: 1,
      payload:
        "Today, I'm going to talk about travel. Travelling is one of my funnest activities.",
    },
    {
      senderId: 1,
      payload:
        "Today, I'm going to talk about travel. Travelling is one of my funnest activities.",
    },
    {
      senderId: 1,
      payload:
        "Today, I'm going to talk about travel. Travelling is one of my funnest activities.",
    },
    {
      senderId: 1,
      payload:
        "Today, I'm going to talk about travel. Travelling is one of my funnest activities.",
    },
    {
      senderId: 1,
      payload:
        "Today, I'm going to talk about travel. Travelling is one of my funnest activities.",
    },
    {
      senderId: 1,
      payload: "OK",
    },
    {
      senderId: 1,
      payload:
        "Today, I'm going to talk about travel. Travelling is one of my funnest activities.",
    },
    {
      senderId: 1,
      payload:
        "Today, I'm going to talk about travel. Travelling is one of my funnest activities.",
    },
    {
      senderId: 1,
      payload:
        "Today, I'm going to talk about travel. Travelling is one of my funnest activities.",
    },
    {
      senderId: 1,
      payload:
        "Today, I'm going to talk about travel. Travelling is one of my funnest activities.",
    },
  ],
};

const chatFirebaseElm = document.createElement("simm-firebase-chat");

chatFirebaseElm.setAttribute("user", JSON.stringify(user));
chatFirebaseElm.setAttribute("roomInfo", JSON.stringify(roomInfo));
document.body.append(chatFirebaseElm);
