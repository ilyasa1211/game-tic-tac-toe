"use strict";
class Message {
    static draw() {
        return "Draw!";
    }
    static won(player) {
        return "Player " + player.toLocaleUpperCase() + " win!";
    }
}
