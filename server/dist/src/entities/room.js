"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __importDefault(require("../utils"));
class Room {
    constructor() {
        this.MININUM_PLAYER_REQUIRED_PER_ROOM = 2;
        this.Rooms = new Map();
    }
    joinRoom(socket, game, player) {
        let joinedRoom = false;
        let resultRoomId = undefined;
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
            const newRoomId = utils_1.default.generateRandomString();
            resultRoomId = newRoomId;
            game.addPlayer(player);
            const roomContains = {
                client: new Set([socket]),
                game: game,
            };
            this.Rooms.set(newRoomId, roomContains);
        }
        return resultRoomId;
    }
    getRoom(roomId) {
        return this.Rooms.get(roomId);
    }
    hasRoom(roomId) {
        return this.Rooms.has(roomId);
    }
}
exports.default = Room;
