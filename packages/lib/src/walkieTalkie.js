import io from "socket.io-client";
let socket = null;

export default function initialize(port, handlers) {
  socket = io(`http://localhost:${port}`);
  socket.on("update", handlers.onUpdate);
  socket.on("executeAction", handlers.onExecuteAction);
  socket.on("applySnapshot", handlers.onApplySnapshot);
  socket.on("applyPatch", handlers.onApplyPatch);
  socket.on("startRecording", handlers.onStartRecording);
  socket.on("stopRecording", handlers.onStopRecording);
  socket.on("playRecording", handlers.onPlayRecording);
}

export function emitChange(payload) {
  socket.emit("change", payload);
}

export function emitInitialize(payload) {
  socket.emit("initialize", payload);
}

export function emitObserve(payload) {
  socket.emit("observe", payload);
}

export function emitAction(payload) {
  socket.emit("action", payload);
}

export function emitPatch(payload) {
  socket.emit("patch", payload);
}

export function emitSnapshot(payload) {
  socket.emit("snapshot", payload);
}

export function emitRecodingStart(payload) {
  socket.emit("recordingStart", payload);
}

export function emitRecodingEnd(payload) {
  socket.emit("recordingEnd", payload);
}
