import { WebSocket } from "ws";
import Game from "./game";
import Validator from "./validator";
import Player from "./player";
import Utils from "./utils";

type RoomContains = {
  game: Game;
  validator: Validator;
  client: Set<WebSocket>;
};

type RoomId = string;

export default class Room {
  public static readonly MAX_CAPACITY_PER_ROOM = 2;
  public static readonly MININUM_PLAYER_REQUIRED_PER_ROOM = 2;

  private Rooms = new Map<RoomId, RoomContains>();

  public joinRoom(socket: WebSocket, game: Game): string {
    let joinedRoom = false;
    let resultRoomId: string | undefined = undefined;

    for (const [roomId, roomContains] of this.Rooms.entries()) {
      const { client } = roomContains;
      if (client.size < Room.MAX_CAPACITY_PER_ROOM) {
        joinedRoom = true;
        resultRoomId = roomId;
        client.add(socket);
        break;
      }
    }

    if (!joinedRoom) {
      const newRoomId = Utils.generateRandomString();
      resultRoomId = newRoomId;

      const roomContains: RoomContains = {
        client: new Set([socket]),
        game: game,
        validator: new Validator(game),
      };

      this.Rooms.set(newRoomId, roomContains);
    }

    return resultRoomId!;
  }
  public getRoom(roomId: string) {
    return this.Rooms.get(roomId);
  }
  public hasRoom(roomId: string) {
    return this.Rooms.has(roomId);
  }
}
