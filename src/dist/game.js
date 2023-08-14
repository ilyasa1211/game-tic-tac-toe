"use strict";
class Game {
    constructor() {
        this._isGameOver = false;
        this.winPositionsOffset = -1;
    }
    static isThinking() {
        return this._isThinking;
    }
    static setIsThinking(isThinking) {
        this._isThinking = isThinking;
    }
    static isPlaying() {
        return this._isPlaying;
    }
    static setIsPlaying(isPlaying) {
        this._isPlaying = isPlaying;
    }
    static getCurrentPlayer() {
        return Player.getPlayerByTurn(this._turn);
    }
    static turn() {
        this._turn = this._turn % Player.count() - 1 === 0 ? 0 : this._turn + 1;
    }
    static addAction(action) {
        this._action = action;
    }
    static drawBoard(insideHtmlElement) {
        for (let i = 0; i < this._size ** 2; i++) {
            let div = document.createElement("div");
            div.classList.add("tile");
            div.onclick = (e) => this._action.getAction(GameMode.getCurrentMode())(e, i);
            insideHtmlElement.appendChild(div);
        }
    }
    static setBoardSize(size) {
        this._size = size;
        this._availablePosition = new Array(size ** 2).fill(null).map((_, i) => i);
    }
    static restartGame() {
    }
    static isGameOver() {
        return this.prototype._isGameOver;
    }
    static check(info) {
        if (Game.isDraw()) {
            info.innerText = Message.draw();
        }
        ;
        if (Game.isWin()) {
            info.innerText = Message.won(Game.getCurrentPlayer());
        }
    }
    static isWin() {
        this._winPositions.forEach((position) => {
            const firstSquare = div[position[1 - 1] - 1];
            const secondSquare = div[position[2 - 1] - 1];
            const thirdSquare = div[position[3 - 1] - 1];
            const isValid = firstSquare.innerText !== "";
            const isMatch1 = firstSquare.innerText === secondSquare.innerText;
            const isMatch2 = secondSquare.innerText === thirdSquare.innerText;
            if (isValid && isMatch1 && isMatch2) {
                const dim = "0.5";
                firstSquare.style.opacity = dim;
                secondSquare.style.opacity = dim;
                thirdSquare.style.opacity = dim;
                this.prototype._isGameOver = true;
            }
        });
        return this.prototype._isGameOver;
    }
    static isDraw() {
        return !Array.from(div).find((_) => _.innerText === "");
    }
}
Game._turn = 0;
Game._isPlaying = false;
Game._isThinking = false;
Game._winPositions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];
