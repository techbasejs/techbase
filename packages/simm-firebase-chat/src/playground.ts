import "./chat-room";
import "./chat-example";
import { IUser } from "./contexts/user.context";

document.querySelector("body");

const user: IUser = {
  id: "1",
  name: "Dell Camaron",
  role: "Techonogy Of Office",
  avatar_url:
    "https://cdn.bsky.app/img/avatar_thumbnail/plain/did:plc:o4pdps2jkn7uhrdgadni7djk/bafkreibhaxf2a2gmnfomgzmbuie6l56l6fojt7uhjqwwn6g66lbdivhgaq@jpeg",
};

const urlParams = new URLSearchParams(window.location.search);

const roomId = urlParams.get("room_id");

if (roomId) {
  const chatFirebaseElm = document.createElement("chat-room");
  chatFirebaseElm.setAttribute(
    "userId",
    localStorage.getItem("user_id") as string,
  );
  chatFirebaseElm.setAttribute("roomId", roomId);
  document.body.append(chatFirebaseElm);
} else {
  const chatFirebaseElm = document.createElement("chat-example");
  document.body.append(chatFirebaseElm);
}
