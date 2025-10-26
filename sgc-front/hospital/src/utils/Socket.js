// src/utils/Socket.js
import { io } from "socket.io-client";

// later connect with your backend when real-time updates are ready
const socket = io("http://localhost:4000", {
  transports: ["websocket"],
});

export default socket;
