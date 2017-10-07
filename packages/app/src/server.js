var express = require("express");
import { app } from "electron";
var expressApp = express();
var server = require("http").createServer(expressApp);
var io = require("socket.io")(server);
const port = 4000;

export default function initializeServer() {
  io.set("origins", "*:*");
  io.on("connection", function(client) {
    console.log("Client connected...");
    client.emit("connected", {
      port,
      version: app.getVersion()
    });

    client.on("change", function(data) {
      console.log("message: " + data);
      client.broadcast.emit("change", data);
    });

    client.on("update", function(data) {
      client.broadcast.emit("update", data);
    });

    client.on("reset", function(data) {
      client.broadcast.emit("reset", data);
    });
  });

  server.listen(port);
}
