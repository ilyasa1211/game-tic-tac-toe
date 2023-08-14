"use strict";
class Game {
    constructor() {
        this.winPositionsOffset = -1;
    }
    static isThinking(isThinking) {
        if (typeof isThinking === "undefined") {
            return this._isThinking;
        }
        this._isThinking = isThinking;
    }
    static isPlaying(isPlaying) {
        if (typeof isPlaying === "undefined") {
            return this._isPlaying;
        }
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
        for (let index = 0; index < this._size ** 2; index++) {
            let div = document.createElement("div");
            div.classList.add("tile");
            div.onclick = (event) => {
                var _a;
                return (_a = this._action) === null || _a === void 0 ? void 0 : _a.getAction(GameMode.getCurrentMode())(event, index);
            };
            insideHtmlElement.appendChild(div);
        }
    }
    static setBoardSize(size) {
        this._size = size;
        this._availablePosition = new Array(size ** 2).fill(null).map((_value, index) => index);
    }
    static restartGame() {
    }
    static isGameOver() {
        return this._isGameOver;
    }
    static checkGameOver(info) {
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
            const firstTile = div[position[1 - 1] - 1];
            const secondTile = div[position[2 - 1] - 1];
            const thirdTile = div[position[3 - 1] - 1];
            const isValid = firstTile.innerText !== "";
            const isMatch1 = firstTile.innerText === secondTile.innerText;
            const isMatch2 = secondTile.innerText === thirdTile.innerText;
            if (isValid && isMatch1 && isMatch2) {
                const dim = "0.5";
                firstTile.style.opacity = dim;
                secondTile.style.opacity = dim;
                thirdTile.style.opacity = dim;
                this._isGameOver = true;
            }
        });
        return this._isGameOver;
    }
    static isDraw() {
        return !Array.from(div).find((tile) => tile.innerText === "");
    }
}
Game._turn = 0;
Game._isPlaying = false;
Game._isThinking = false;
Game._isGameOver = false;
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
