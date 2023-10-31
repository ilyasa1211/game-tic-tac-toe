"use strict";
class Game {
    constructor(boardSize = GAME_SIZE, htmlElement, action, status, result, player, position) {
        this.boardSize = boardSize;
        this.htmlElement = htmlElement;
        this.action = action;
        this.status = status;
        this.result = result;
        this.player = player;
        this.position = position;
        this._turn = 0;
    }
    turn() {
        this._turn++;
        this._turn %= this.player.playerCount();
    }
    draw() {
        const boardDimension = 2;
        for (let index = 0; index < this.boardSize ** boardDimension; index++) {
            let div = document.createElement("div");
            div.classList.add("tile");
            div.onclick = (evt) => this.action.execute(evt, index, this);
            this.htmlElement.appendChild(div);
        }
    }
    refresh() {
        Array.from(this.htmlElement.children).forEach((tile, index) => {
            tile.textContent = this.position.position[index];
        });
        if (this.result.isWin()) {
            this.position
                .getWinStraightPosition()
                .flat()
                .forEach((position) => Array.from(this.htmlElement.children)[position].classList.add("dim"));
        }
    }
    getCurrentPlayer() {
        return this.player.getCurrentPlayer(this);
    }
}
