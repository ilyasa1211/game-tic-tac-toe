"use strict";
class GameStatus {
    constructor() {
        this.isPlaying = false;
        this.isThinking = false;
    }
    isOnline() {
        return window.navigator.onLine;
    }
}
