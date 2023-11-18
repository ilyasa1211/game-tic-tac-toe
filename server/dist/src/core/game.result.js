"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GameResult {
    constructor(gamePosition) {
        this.gamePosition = gamePosition;
        this._isGameOver = false;
    }
    isWin() {
        this.gamePosition.winPositions.forEach((position) => {
            const firstTile = this.gamePosition.position[position[1 + this.gamePosition.winPositionsOffset] +
                this.gamePosition.winPositionsOffset];
            const secondTile = this.gamePosition.position[position[2 + this.gamePosition.winPositionsOffset] +
                this.gamePosition.winPositionsOffset];
            const thirdTile = this.gamePosition.position[position[3 + this.gamePosition.winPositionsOffset] +
                this.gamePosition.winPositionsOffset];
            const isValid = typeof firstTile !== "undefined";
            const isMatch1 = firstTile === secondTile;
            const isMatch2 = secondTile === thirdTile;
            if (isValid && isMatch1 && isMatch2) {
                this._isGameOver = true;
            }
        });
        return this._isGameOver;
    }
    isDraw() {
        const isFull = this.gamePosition.position.every((pos) => typeof pos !== "undefined");
        return isFull;
    }
    isGameOver() {
        console.log("isdraw" + this.isDraw());
        console.log("iswin" + this.isWin());
        return this.isWin() || this.isDraw();
    }
}
exports.default = GameResult;
