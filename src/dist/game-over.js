"use strict";
class GameOver {
    constructor() {
        this._isGameOver = false;
        this.winPositionsOffset = -1;
    }
    static isGameOver() {
        return this.prototype._isGameOver;
    }
    static check(info) {
        if (GameOver.isDraw()) {
            info.innerText = Message.draw();
        }
        ;
        if (GameOver.isWin()) {
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
GameOver._winPositions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];
