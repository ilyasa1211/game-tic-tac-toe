"use strict";
class ResultMessage extends Error {
}
class InformationalMessage extends Error {
}
class ErrorMessage extends Error {
}
class GameMessage {
    static GAME_WON(PlayerCharacter) {
        return "Player " + PlayerCharacter.toLocaleUpperCase() + " win!";
    }
}
GameMessage.GAME_DRAW = "Draw!";
