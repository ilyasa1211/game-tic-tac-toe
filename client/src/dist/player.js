"use strict";
class Player {
    constructor() {
        this._player = {
            p1: "X",
            p2: "O",
        };
    }
    count() {
        return Object.keys(this._player).length;
    }
    getPlayerByTurn(number) {
        return Object.values(this._player)[number];
    }
}
