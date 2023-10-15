
const ws = new WebSocket("ws://localhost:3000");

ws.onopen = (e) => {
    console.log("Connection Open!");
}

ws.onclose = (e) => {
    console.log("Connection Closed!");
}

ws.onerror = (e) => {
    console.log("WS Error detected!");
}

ws.onmessage = (message) => {
    const data = JSON.parse(message.data) as { position: number, player: string };
    Array.from(div)[data.position].textContent = data.player;
}