import { IPlayer } from "../entities/player";
import PlayerInterface from "../repositories/interfaces/player.interface";
import { IGame } from "./game.core";

export interface IGamePlayer {
  playerRepository: PlayerInterface;
  addPlayer(player: IPlayer): void;
  getCurrentPlayer(game: IGame): IPlayer;
  playerCount(): number;
}

export class GamePlayer implements IGamePlayer {
  public constructor(public playerRepository: PlayerInterface) {}

  public addPlayer(player: IPlayer): void {
    this.playerRepository.createPlayer(player);
  }

  public getCurrentPlayer(game: IGame): IPlayer {
    return this.playerRepository.getPlayerByTurn(game._turn);
  }

  public playerCount(): number {
    return this.playerRepository.count();
  }
}
