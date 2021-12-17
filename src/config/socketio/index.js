import io from "socket.io-client";
import { store } from "@app/store";
const SOCKET_URL = "http://localhost:5000";

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  auth: { token: localStorage.getItem("token") },
});
export default socket;
