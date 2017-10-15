var express = require("express");
import { app } from "electron";
import getPort from "get-port";
var expressApp = express();
var server = require("http").createServer(expressApp);
var io = require("socket.io")(server);
io.set("origins", "*:*");

export default function initializeServer() {
  getPort({ port: 4000 }).then(port => {
    console.log("Port" + port);
    io.on("connection", function(client) {
      console.log("Client connected...");
      client.emit("connected", {
        port,
        version: app.getVersion()
      });

      relayMessage("change", client);
      relayMessage("update", client);
      relayMessage("initialize", client);
      relayMessage("executeAction", client);
      relayMessage("applySnapshot", client);
      relayMessage("applyPatch", client);
      relayMessage("action", client);
      relayMessage("snapshot", client);
      relayMessage("patch", client);
      relayMessage("observe", client);
      relayMessage("recordingStart", client);
      relayMessage("recordingEnd", client);
      relayMessage("startRecording", client);
      relayMessage("stopRecording", client);
      relayMessage("playRecording", client);
    });

    server.listen(port);
  });
}

function relayMessage(name, client) {
  client.on(name, function(data) {
    client.broadcast.emit(name, data);
  });
}
