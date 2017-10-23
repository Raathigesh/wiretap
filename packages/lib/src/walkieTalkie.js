import io from "socket.io-client";
let socket = null;

export default function initialize(port) {
  socket = io(`http://localhost:${port}`);
}
export function attachHandlers(handlers) {
  handlers.onUpdate && socket.on("update", handlers.onUpdate);
  handlers.onExecuteAction &&
    socket.on("executeAction", handlers.onExecuteAction);
  handlers.onApplySnapshot &&
    socket.on("applySnapshot", handlers.onApplySnapshot);
  handlers.onApplyPatch && socket.on("applyPatch", handlers.onApplyPatch);
  handlers.onStartRecording &&
    socket.on("startRecording", handlers.onStartRecording);
  handlers.onStopRecording &&
    socket.on("stopRecording", handlers.onStopRecording);
  handlers.onPlayRecording &&
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
