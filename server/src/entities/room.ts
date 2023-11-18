import { WebSocket } from "ws";
import Utils from "../utils";
import { IGame } from "../core/game.core";
import { IPlayer } from "./player";

export type RoomContains = {
  game: IGame;
  client: Set<WebSocket>;
};

export type RoomId = string;

export interface IRoom {
  MININUM_PLAYER_REQUIRED_PER_ROOM: number;
  joinRoom(socket: WebSocket, game: IGame, player: IPlayer): string;
  getRoom(roomId: string): RoomContains | undefined;
  hasRoom(roomId: string): boolean;
}

export default class Room implements IRoom {
  public readonly MININUM_PLAYER_REQUIRED_PER_ROOM = 2;

  private Rooms = new Map<RoomId, RoomContains>();

  public joinRoom(socket: WebSocket, game: IGame, player: IPlayer): string {
    let joinedRoom = false;
    let resultRoomId: string | undefined = undefined;

    for (const [roomId, roomContains] of this.Rooms.entries()) {
      const { client, game } = roomContains;

      if (client.size < this.MININUM_PLAYER_REQUIRED_PER_ROOM) {
        joinedRoom = true;
        resultRoomId = roomId;
        client.add(socket);
        game.addPlayer(player);
        break;
      }
    }

    if (!joinedRoom) {
      const newRoomId = Utils.generateRandomString();

      resultRoomId = newRoomId;
      
      game.addPlayer(player);
      const roomContains: RoomContains = {
        client: new Set([socket]),
        game: game,
      };

      this.Rooms.set(newRoomId, roomContains);
    }

    return resultRoomId!;
  }
  public getRoom(roomId: string): RoomContains | undefined {
    return this.Rooms.get(roomId);
  }
  public hasRoom(roomId: string): boolean {
    return this.Rooms.has(roomId);
  }
}
