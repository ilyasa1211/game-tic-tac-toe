"use strict";
Object.defineProperty(exports, "__esModule", { valuevt: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({
  port: 3000,
});
wss.on("connection", (socket, request) => {
  debugger;
  // const availablePosition = new Array(size ** 2).fill(null).map((_valuevt: null, index: number) => index);
  socket.on("message", (data) => {
    console.log(data, data.toString());
  });
  socket.on("close", (code, reason) => {
    console.log("close", code, reason);
  });
});
