import io from "socket.io-client";
let socket = null;

export default function initialize(port, handlers) {
  socket = io(`http://localhost:${port}`);
  socket.on("update", handlers.onUpdate);
}

export function emitChange(payload) {
  socket.emit("change", payload);
}

export function emitInitialize(payload) {
  socket.emit("initialize", payload);
}

export function emitSpy(payload) {
  socket.emit("spy", payload);
}
