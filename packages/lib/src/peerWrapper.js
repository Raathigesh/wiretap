import Peer from "peerjs";
const handlers = {};
export default function peer(peerId) {
  let connection = null;
  return new Promise((resolve, reject) => {
    var peer = new Peer("Inspector", {
      host: "server-eloxnxhfvs.now.sh",
      secure: true,
      port: "",
      path: "/"
    });

    var conn = peer.connect(peerId);
    conn.on("open", function() {
      conn.send("hi");
      resolve({
        emit(eventName, payload) {
          conn.send({
            eventName,
            payload
          });
        }
      });
    });

    conn.on("data", function(data) {
      handlers[data.eventName](data.payload);
    });
  });
}

export function registerHandlers(handles) {
  Object.keys(handles).forEach(key => {
    handlers[key] = handles[key];
  });
}
