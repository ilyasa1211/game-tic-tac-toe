"use strict";
class Game {
    constructor() {
        this._turn = 0;
        this._isPlaying = false;
        this._isThinking = false;
        this._isGameOver = false;
        this._winPositions = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            [1, 5, 9],
            [3, 5, 7],
        ];
        this.winPositionsOffset = -1;
    }
    addPlayer(player) {
        this._player = player;
    }
    isThinking(isThinking) {
        if (typeof isThinking === "undefined") {
            return this._isThinking;
        }
        this._isThinking = isThinking;
    }
    isPlaying(isPlaying) {
        if (typeof isPlaying === "undefined") {
            return this._isPlaying;
        }
        this._isPlaying = isPlaying;
    }
    getCurrentPlayer() {
        var _a;
        return (_a = this._player) === null || _a === void 0 ? void 0 : _a.getPlayerByTurn(this._turn);
    }
    turn() {
        this._turn = this._turn % this._player.count() - 1 === 0 ? 0 : this._turn + 1;
    }
    addAction(action) {
        this._action = action;
    }
    drawBoard(insideHtmlElement) {
        for (let index = 0; index < this._size ** 2; index++) {
            let div = document.createElement("div");
            div.classList.add("tile");
            div.onclick = (event) => {
                var _a;
                return (_a = this._action) === null || _a === void 0 ? void 0 : _a.getAction(this.getCurrentMode())(event, index);
            };
            insideHtmlElement.appendChild(div);
        }
    }
    setBoardSize(size) {
        this._size = size;
        this._availablePosition = new Array(size ** 2).fill(null).map((_value, index) => index);
    }
    retryGame() {
        var _a;
        this.setBoardSize((_a = this._size) !== null && _a !== void 0 ? _a : 3);
        Array.from(div).forEach((tile) => {
            tile.textContent = "";
            tile.style.opacity = "1";
        });
        this._isThinking = false;
        this._isGameOver = false;
    }
    resetGame() {
        this.retryGame();
        this._isPlaying = false;
        this._currentMode = undefined;
    }
    addGameMode(gameMode) {
        this._gameMode = gameMode;
        return this._gameMode;
    }
    getCurrentMode() {
        return this._currentMode;
    }
    setCurrentMode(mode) {
        this._currentMode = mode;
    }
    isGameOver() {
        return this._isGameOver;
    }
    checkGameOver(info) {
        if (this.isDraw()) {
            info.textContent = Message.draw();
        }
        ;
        if (this.isWin()) {
            info.textContent = Message.won(this.getCurrentPlayer());
        }
    }
    isWin() {
        this._winPositions.forEach((position) => {
            const firstTile = div[position[1 - 1] - 1];
            const secondTile = div[position[2 - 1] - 1];
            const thirdTile = div[position[3 - 1] - 1];
            const isValid = firstTile.textContent !== "";
            const isMatch1 = firstTile.textContent === secondTile.textContent;
            const isMatch2 = secondTile.textContent === thirdTile.textContent;
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
    isDraw() {
        return !Array.from(div).find((tile) => tile.textContent === "");
    }
}
