"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const room_1 = __importDefault(require("./src/entities/room"));
const game_factory_1 = __importDefault(require("./src/factories/game.factory"));
const player_1 = __importDefault(require("./src/entities/player"));
const port = Number(process.env.SERVER_PORT);
const wss = new ws_1.WebSocketServer({
    port: port,
});
const room = new room_1.default();
let i = 1;
wss.on("connection", function handleConnection(socket, request) {
    i++;
    i %= 2;
    const playerCharacter = ["X", "O"][i];
    const player = new player_1.default(crypto.randomUUID(), playerCharacter);
    const roomId = room.joinRoom(socket, game_factory_1.default.create(3), player);
    const initializeData = {
        player,
    };
    socket.send(JSON.stringify(initializeData));
    socket.on("message", function handleMessage(data) {
        const request = JSON.parse(data.toString());
        if (room.hasRoom(roomId)) {
            const { game, client } = room.getRoom(roomId);
            if (client.size !== room.MININUM_PLAYER_REQUIRED_PER_ROOM) {
                return;
            }
            const isValidPlayer = game.getCurrentPlayer().character === request.player;
            const isValidPosition = game.position.isAvailable(request.position);
            // Check input validity
            if (!isValidPlayer || !isValidPosition) {
                return "Invalid Move";
            }
            game.position.setPosition(request.position, request.player);
            // Send message to everyone
            client.forEach((player) => {
                if (player.readyState === ws_1.WebSocket.OPEN) {
                    player.send(JSON.stringify(request));
                }
            });
            if (game.result.isGameOver()) {
                client.forEach((player) => {
                    if (player.readyState === ws_1.WebSocket.OPEN) {
                        const message = game.result.isWin() ? game.getCurrentPlayer().character + " Win!" : "Draw!";
                        const res = {
                            status: "game_over",
                            message,
                        };
                        player.send(JSON.stringify(res));
                    }
                });
                return;
            }
            game.turn();
        }
    });
    socket.on("close", (code, reason) => {
        console.log("close", code, reason);
    });
});
console.log("Server running on port " + port);
