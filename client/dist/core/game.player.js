"use strict";
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
