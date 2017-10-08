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

      client.on("change", function(data) {
        console.log("message: " + data);
        client.broadcast.emit("change", data);
      });

      client.on("update", function(data) {
        client.broadcast.emit("update", data);
      });

      client.on("initialize", function(data) {
        client.broadcast.emit("initialize", data);
      });

      client.on("spy", function(data) {
        client.broadcast.emit("spy", data);
      });
    });

    server.listen(port);
  });
}
