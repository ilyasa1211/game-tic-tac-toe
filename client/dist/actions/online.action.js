"use strict";
class ActionVSOnline {
    constructor() {
        this.label = "2 Player (Online)";
    }
    execute(evt, index, game) {
        evt.stopPropagation();
        if (!game.status.isOnline()) {
            return;
        }
        const ws = Online.connect(game);
        if (!Online.isConnectionEstablished) {
            return;
        }
        const data = {
            position: index,
            player: game.getCurrentPlayer().character,
        };
        ws.send(JSON.stringify(data));
    }
}
