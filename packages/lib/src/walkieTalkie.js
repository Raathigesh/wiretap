import io from "socket.io-client";
import peerWrapper, { registerHandlers } from "./peerWrapper";

let socket = null;

export default function initialize(port, peerId, handlers) {
  socket = peerWrapper(peerId);
}

export function attachHandlers(handlers) {
  registerHandlers(handlers);
}

export function emitChange(payload) {
  socket.then(con => {
    try {
      con.emit("change", payload);
    } catch (e) {
      if (payload.action) {
        delete payload.action;

        payload.action = {
          error: "Sorry! We could not serialize the action."
        };
        con.emit("change", payload);
      }
    }
  });
}

export function emitInitialize(payload) {
  socket.then(con => {
    con.emit("initialize", payload);
  });
}

export function emitObserve(payload) {
  socket.then(con => {
    con.emit("observe", payload);
  });
}

export function emitAction(payload) {
  socket.then(con => {
    con.emit("action", payload);
  });
}

export function emitPatch(payload) {
  socket.then(con => {
    con.emit("patch", payload);
  });
}

export function emitSnapshot(payload) {
  socket.then(con => {
    con.emit("snapshot", payload);
  });
}

export function emitRecodingStart(payload) {
  socket.then(con => {
    con.emit("recordingStart", payload);
  });
}

export function emitRecodingEnd(payload) {
  socket.then(con => {
    con.emit("recordingEnd", payload);
  });
}
