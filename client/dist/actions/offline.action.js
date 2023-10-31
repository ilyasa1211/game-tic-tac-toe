"use strict";
class ActionVSOffline {
    constructor() {
        this.label = "2 Player (Offline)";
    }
    execute(evt, index, game) {
        if (game.result.isGameOver()) {
            return;
        }
        if (!game.position.isAvailable(index)) {
            return;
        }
        const player = game.getCurrentPlayer();
        game.position.setPosition(index, player.character);
        game.refresh();
        if (game.result.isGameOver()) {
            throw new GameOver(game);
        }
        game.turn();
    }
}
