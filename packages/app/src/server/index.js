var express = require("express");
var app = express();
var ExpressPeerServer = require("peer").ExpressPeerServer;

app.get("/", function(req, res, next) {
  res.send("Hello world!");
});

var server = app.listen(3030, function() {
  console.log("Listening....");
});

var options = {
  debug: true
};

app.use("/", ExpressPeerServer(server, options));
