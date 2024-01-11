import { WebSocket, WebSocketServer } from "ws";
import Room from "./src/entities/room";
import GameFactory from "./src/factories/game.factory";
import Player, { PlayerCharacter } from "./src/entities/player";

const port = Number(process.env.SERVER_PORT);

const wss = new WebSocketServer({
  port: port,
});

const room = new Room();

export interface OnlineActionRequest {
  position: number;
  player: PlayerCharacter;
}

let i = 1;
wss.on("connection", function handleConnection(socket, request) {
  i++;
  i %= 2;

  const playerCharacter = ["X", "O"][i] as PlayerCharacter;
  const player = new Player(crypto.randomUUID(), playerCharacter);
  const roomId = room.joinRoom(socket, GameFactory.create(3), player);

  const initializeData = {
    player,
  };
  socket.send(JSON.stringify(initializeData));

  socket.on("message", function handleMessage(data) {
    const request = JSON.parse(data.toString()) as OnlineActionRequest;

    if (room.hasRoom(roomId)) {
      const { game, client } = room.getRoom(roomId)!;

      if (client.size !== room.MININUM_PLAYER_REQUIRED_PER_ROOM) {
        return;
      }

      const isValidPlayer =
        game.getCurrentPlayer().character === request.player;
      const isValidPosition = game.position.isAvailable(request.position);

      // Check input validity
      if (!isValidPlayer || !isValidPosition) {
        return "Invalid Move";
      }

      game.position.setPosition(request.position, request.player);

      // Send message to everyone
      client.forEach((player: WebSocket) => {
        if (player.readyState === WebSocket.OPEN) {
          player.send(JSON.stringify(request));
        }
      });

      if (game.result.isGameOver()) {
        client.forEach((player: WebSocket) => {
          if (player.readyState === WebSocket.OPEN) {
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
  socket.on("close", (code: number, reason) => {
    console.log("close", code, reason);
  });
});

console.log("Server running on port " + port);
