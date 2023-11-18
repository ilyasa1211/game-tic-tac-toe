import { IPlayer } from "../entities/player";
import { IGamePlayer } from "./game.player";
import { IGamePosition } from "./game.position";
import { IGameResult } from "./game.result";


export interface IGameCore {
  _turn: number;
  // action: IGameAction;
  // status: IGameStatus;
  result: IGameResult;
  player: IGamePlayer;
  position: IGamePosition;
  turn(): void;
  getCurrentPlayer(): IPlayer;
  addPlayer(player: IPlayer): void;
}

export interface IGame extends IGameCore  {}

export default class Game implements IGame {
  public _turn: number = 0;

  public constructor(
    public boardSize: number = Number(process.env.DEFAULT_GAME_SIZE),
    // public action: IGameAction,
    // public status: IGameStatus,
    public result: IGameResult,
    public player: IGamePlayer,
    public position: IGamePosition
  ) {}

  public turn(): void {
    this._turn++;
    this._turn %= this.player.playerCount();
  }


  public getCurrentPlayer(): IPlayer {
    return this.player.getCurrentPlayer(this);
  }

  public addPlayer(player: IPlayer): void {
    this.player.addPlayer(player);
  }
  // public retry(): void {
  //   this.setBoardSize(this.boardSize);
  //   Array.from(div).forEach((tilevt: HTMLDivElement) => {
  //     tile.textContent = "";
  //     tile.style.opacity = "1";
  //   });
  //   this.isThinking(false);
  //   this.isGameOver(false);
  // }
  // public restart(): void {
  //   this.retry();
  //   this.isPlaying(false);
  //   this.currentMode(undefined);
  // }
}

