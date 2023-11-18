"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamePlayer = void 0;
class GamePlayer {
    constructor(playerRepository) {
        this.playerRepository = playerRepository;
    }
    addPlayer(player) {
        this.playerRepository.createPlayer(player);
    }
    getCurrentPlayer(game) {
        return this.playerRepository.getPlayerByTurn(game._turn);
    }
    playerCount() {
        return this.playerRepository.count();
    }
}
exports.GamePlayer = GamePlayer;
