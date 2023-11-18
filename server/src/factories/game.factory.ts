import Game, { IGame } from "../core/game.core";
import { GamePlayer } from "../core/game.player";
import GamePosition from "../core/game.position";
import GameResult from "../core/game.result";
import PlayerRepository from "../repositories/player.repository";

export default class GameFactory {
    public static create(boardSize: number = 3): IGame {
        const playerRepository = new PlayerRepository();
        const gamePosition = new GamePosition(boardSize);
        const gamePlayer = new GamePlayer(playerRepository);
        const gameResult = new GameResult(gamePosition); 
        return new Game(boardSize, gameResult, gamePlayer, gamePosition);
    }
}