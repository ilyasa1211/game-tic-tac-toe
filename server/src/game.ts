import Player, { PlayerCharacter } from "./player";

export default class Game {
  private _size: number | undefined;
  private _turn = 0;
  private _isGameOver: boolean = false;
  private _position: PlayerCharacter[] | null[];
  private readonly _winPositions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];
  private readonly winPositionsOffset = -1;
  public _availablePosition: number[];

  public constructor(private player: Player) {}

  public getCurrentPlayer(): PlayerCharacter {
    return this.player.getPlayerByTurn(this._turn);
  }

  public turn(): void {
    this._turn =
      (this._turn % this.player!.count()) - 1 === 0 ? 0 : this._turn + 1;
  }
  public setBoardSize(size: number): void {
    this._size = size;
    this._availablePosition = new Array(size ** 2)
      .fill(null)
      .map((_valuevt: null, index: number) => index);
  }
  public resetGame(): void {
    this.setBoardSize(this._size ?? 3);
    this._isGameOver = false;
  }
  public isGameOver(): boolean {
    return this._isGameOver;
  }

  public isWin(): boolean {
    this._winPositions.forEach((position: number[]) => {
      const firstTile = this._position[position[1 - 1] - 1];
      const secondTile = this._position[position[2 - 1] - 1];
      const thirdTile = this._position[position[3 - 1] - 1];
      const isValid: boolean = firstTile !== null;
      const isMatch1: boolean = firstTile === secondTile;
      const isMatch2: boolean = secondTile === thirdTile;
      if (isValid && isMatch1 && isMatch2) {
        this._isGameOver = true;
      }
    });
    return this._isGameOver;
  }
  public isDraw(): boolean {
    return this._position.some(
      (position: null | PlayerCharacter) => position == null
    );
  }
}
