"use strict";
class GameOver extends ResultMessage {
    constructor(game) {
        super();
        if (game.result.isDraw()) {
            this.message = GameMessage.GAME_DRAW;
        }
        if (game.result.isWin()) {
            const winningPlayer = game.getCurrentPlayer().character;
            this.message = GameMessage.GAME_WON(winningPlayer);
        }
    }
}
