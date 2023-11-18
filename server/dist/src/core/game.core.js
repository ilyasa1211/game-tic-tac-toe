"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Game {
    constructor(boardSize = Number(process.env.DEFAULT_GAME_SIZE), 
    // public action: IGameAction,
    // public status: IGameStatus,
    result, player, position) {
        this.boardSize = boardSize;
        this.result = result;
        this.player = player;
        this.position = position;
        this._turn = 0;
    }
    turn() {
        this._turn++;
        this._turn %= this.player.playerCount();
    }
    getCurrentPlayer() {
        return this.player.getCurrentPlayer(this);
    }
    addPlayer(player) {
        this.player.addPlayer(player);
    }
}
exports.default = Game;
