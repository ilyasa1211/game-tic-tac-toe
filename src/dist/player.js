"use strict";
class Player {
    static count() {
        return Object.keys(this._player).length;
    }
    static getPlayerByTurn(number) {
        return Object.values(this._player)[number];
    }
}
Player._player = {
    p1: "X",
    p2: "O",
};
