"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlayerRepository {
    constructor(players = []) {
        this.players = players;
    }
    getPlayerByTurn(turn) {
        return this.players[turn];
    }
    getPlayerByName(name) {
        return this.players.find((player) => player.name === name);
    }
    createPlayer(player) {
        this.players.push(player);
    }
    count() {
        return this.players.length;
    }
}
exports.default = PlayerRepository;
