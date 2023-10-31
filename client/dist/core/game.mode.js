"use strict";
class GameMode {
    constructor(game, htmlElement) {
        this.game = game;
        this.htmlElement = htmlElement;
        this.gameModes = new Set();
    }
    addGameMode(action) {
        this.gameModes.add(action);
    }
    draw() {
        this.gameModes.forEach((action) => {
            const list = document.createElement("li");
            const anchor = document.createElement("a");
            anchor.textContent = action.label;
            anchor.href = "#game";
            list.appendChild(anchor);
            list.onclick = (evt) => {
                evt.stopPropagation();
                if (this.game.status.isPlaying) {
                    return;
                }
                // const childTarget = evt.target as HTMLAnchorElement;
                this.game.status.isPlaying = true;
                // info.textContent = childTarget.textContent;
                this.game.action.setAction(action);
            };
            this.htmlElement.appendChild(list);
        });
    }
}
