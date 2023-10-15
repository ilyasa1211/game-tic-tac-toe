abstract class Playable {
  // public abstract play(): void;
  public abstract retry(): void;
  public abstract restart(): void;
}

abstract class GameResult {
  public abstract isWin(): boolean;
  public abstract isDraw(): boolean;
  public abstract isGameOver(isGameOver?: boolean): boolean | void;
}

class Game extends Drawable implements GameResult {
  private size: number;
  private _turn: number = 0;
  private _action: Action | undefined;
  private _isPlaying: boolean = false;
  private _isThinking: boolean = false;
  private _isGameOver: boolean = false;
  private playerRepository: PlayerRepository;
  private _currentMode: keyof GameModeOptions | undefined;
  private position: Array<PlayerCharacter | undefined> = [];
  private availablePosition: number[]; // needed for vs computer
  private readonly winPositionsOffset = -1;
  private readonly winPositions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  public constructor(boardSize: number = 3, htmlElement: HTMLElement) {
    super(htmlElement);
    this.size = boardSize;
    this.availablePosition = Utils.createIndexArray(boardSize ** 2);
    this.playerRepository = new PlayerRepository([]);
  }

  public isThinking(isThinking?: boolean): boolean | void {
    if (typeof isThinking === "undefined") {
      return this._isThinking;
    }
    this._isThinking = isThinking;
  }

  public isPlaying(isPlaying?: boolean): boolean | void {
    if (typeof isPlaying === "undefined") {
      return this._isPlaying;
    }
    this._isPlaying = isPlaying;
  }

  public addPlayer(player: Player) {
    this.playerRepository.createPlayer(player);
  }

  public getCurrentPlayer(): Player {
    return this.playerRepository.getPlayerByTurn(this._turn);
  }

  public playerCount(): number {
    return this.playerRepository.count();
  }

  public turn(): void {
    this._turn++;
    this._turn %= this.playerRepository.count();
  }

  public action(evt: MouseEvent, index: number): void {
    if (typeof this._action === 'undefined'){
      throw new Error("Please set action");
    }
    this._action.execute(evt, index, this);
  }


  public setCharacter(position: number, character: PlayerCharacter): void {
    this.position[position] = character;
    this.takeAvailablePosition(position);
  }
  public getAvailablePosition(): number[] {
    return this.availablePosition;
  }
  private takeAvailablePosition(index: number): void {
    const position = this.availablePosition!.indexOf(index);
    this.availablePosition.splice(position, 1);
  }

  public setAction(action: Action): void {
    this._action = action;
  }

  public draw(): void {
    for (let index = 0; index < this.size ** 2; index++) {
      let div = document.createElement("div");
      div.classList.add("tile");
      div.onclick = (evt: MouseEvent) => this.action(evt, index);
      this.htmlElement.appendChild(div);
    }
  }

  // public retry(): void {
  //   this.setBoardSize(this.size);
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

  public currentMode(
    gameMode?: keyof GameModeOptions
  ): void | keyof GameModeOptions {
    if (typeof gameMode === "undefined") {
      return this._currentMode;
    }
    this._currentMode = gameMode;
  }

  public checkGameOver(info: HTMLElement): void {
    if (this.isDraw()) {
      info.textContent = Message.draw();
    }
    if (this.isWin()) {
      info.textContent = Message.won(this.getCurrentPlayer().character);
    }
  }

  public isGameOver(isGameOver?: boolean): boolean | void {
    if (typeof isGameOver === "undefined") {
      return this._isGameOver;
    }
    this._isGameOver = isGameOver;
  }

  public isWin(): boolean {
    this.winPositions.forEach((position: number[]) => {
      const firstTile =
        this.position[
          position[1 + this.winPositionsOffset] + this.winPositionsOffset
        ];
      const secondTile =
        this.position[
          position[2 + this.winPositionsOffset] + this.winPositionsOffset
        ];
      const thirdTile =
        this.position[
          position[3 + this.winPositionsOffset] + this.winPositionsOffset
        ];
      const isValid: boolean = typeof firstTile !== "undefined";
      const isMatch1: boolean = firstTile === secondTile;
      const isMatch2: boolean = secondTile === thirdTile;
      if (isValid && isMatch1 && isMatch2) {
        this.isGameOver(true);
      }
    });
    return this.isGameOver()!;
  }
  public isDraw(): boolean {
    return !this.position.find((pos) => typeof pos === "undefined");
  }

  public isOnline(): boolean {
    return window.navigator.onLine;
  }
}
