"use strict";
const ws = new WebSocket(SERVER_WEBSOCKET_DOMAIN);
ws.onopen = (e) => {
    console.log("Connection Open!");
};
ws.onclose = (e) => {
    console.log("Connection Closed!");
};
ws.onerror = (e) => {
    console.log("WS Error detected!");
};
ws.onmessage = (message) => {
    const data = JSON.parse(message.data);
    Array.from(tiles)[data.position].textContent = data.player;
};
