"use strict";
class Game {
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
}
Game._turn = 0;
Game._isPlaying = false;
Game._isThinking = false;
