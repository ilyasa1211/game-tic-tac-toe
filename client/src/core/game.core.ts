interface Playable {
  // play(): void;
  retry(): void;
  restart(): void;
}

interface IGameCore {
  _turn: number;
  action: IGameAction;
  status: IGameStatus;
  result: IGameResult;
  player: IGamePlayer;
  position: IGamePosition;
  turn(): void;
  getCurrentPlayer(): IPlayer;
}

interface IGame extends IGameCore, IDrawable, IRefreshable {}

class Game implements IGame {
  public _turn: number = 0;

  public constructor(
    public boardSize: number = GAME_SIZE,
    public htmlElement: HTMLElement,
    public action: IGameAction,
    public status: IGameStatus,
    public result: IGameResult,
    public player: IGamePlayer,
    public position: IGamePosition
  ) {}

  public turn(): void {
    this._turn++;
    this._turn %= this.player.playerCount();
  }

  public draw(): void {
    const boardDimension = 2;
    for (let index = 0; index < this.boardSize ** boardDimension; index++) {
      let div = document.createElement("div");

      div.classList.add("tile");

      div.onclick = (evt: MouseEvent) => this.action.execute(evt, index, this);

      this.htmlElement.appendChild(div);
    }
  }
  public refresh(): void {
    Array.from(this.htmlElement.children).forEach((tile, index) => {
      tile.textContent = this.position.position[index]!;
    });
    if (this.result.isWin()) {
      this.position
        .getWinStraightPosition()
        .flat()
        .forEach((position) =>
          Array.from(this.htmlElement.children)[position].classList.add("dim")
        );
    }
  }

  public getCurrentPlayer(): IPlayer {
    return this.player.getCurrentPlayer(this);
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
