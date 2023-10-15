import { WebSocket, WebSocketServer } from "ws";
import Room from "./src/room";
import Validator from "./src/validator";
import Game from "./src/game";
import Player, { PlayerCharacter } from "./src/player";

const wss = new WebSocketServer({
  port: 3000,
});

type SocketRequest = {
  position: number;
  player: PlayerCharacter;
};

const room = new Room();

wss.on("connection", function handleConnection(socket, request) {
  // const availablePosition = new Array(size ** 2).fill(null).map((_valuevt: null, index: number) => index);
  const roomId = room.joinRoom(socket, new Game(new Player()));

  socket.on("message", function handleMessage(data) {
    const request = JSON.parse(data.toString()) as SocketRequest;

    if (room.hasRoom(roomId)) {
      const { game, validator, client } = room.getRoom(roomId)!;

      if (client.size !== Room.MININUM_PLAYER_REQUIRED_PER_ROOM) {
        return;
      }

      const isValidPlayer = validator.validatePlayer(request.player);
      const isValidPosition = validator.validatePosition(request.position);

      // Check input validity
      if (!(isValidPlayer && isValidPosition)) {
        return new Error("Invalid Move");
      }

      // Send message to everyone
      client.forEach((player: WebSocket) => {
        if (player.readyState === WebSocket.OPEN) {
          player.send(JSON.stringify(request));
        }
      });
    }
  });
  socket.on("close", (codevt: number, reason) => {
    console.log("close", code, reason);
  });
});
