const SIZE = 3;

var div = document.getElementsByTagName("div");
var section = document.getElementsByTagName("section")[0];
var info = document.getElementsByTagName("h1")[1];
var gameModeListContainer = document.getElementsByTagName("ul")[0];

section.style.setProperty("--SIZE", String(SIZE));

type PlayerCharacter = "X" | "O";

class GameMode {
  private _gameModeListContainer: HTMLOListElement | HTMLUListElement | undefined;
  private static _currentMode: keyof typeof this.GameModeOptions | undefined;
  public static readonly GameModeOptions = {
    COMPUTER: "1 Player (Computer)",
    OFFLINE: "2 Player (Offline)",
    ONLINE: "2 Player (Online)",
  }
  public static init(gameModeListContainer: typeof this.prototype._gameModeListContainer) {
    this.prototype._gameModeListContainer = gameModeListContainer
    this.prototype.drawHtmlElement(GameMode.GameModeOptions);
  }
  private drawHtmlElement(gameModeOptions: typeof GameMode.GameModeOptions) {
    const key = this.extractGameModes(gameModeOptions);

    key.forEach((value: keyof typeof GameMode.GameModeOptions, index: number) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      li.dataset.mode = value;
      li.onclick = this.chooseMode;
      a.innerText = GameMode.GameModeOptions[value];
      a.href = "#main";
      li.appendChild(a);
      this._gameModeListContainer!.appendChild(li);
    }
    );

  }
  private extractGameModes(gameModeOptions: typeof GameMode.GameModeOptions): (keyof typeof GameMode.GameModeOptions)[] {
    return Object.keys(gameModeOptions) as (keyof typeof GameMode.GameModeOptions)[];
  }

  private chooseMode(e: MouseEvent): void {
    if (Game.isPlaying()) return alert("Game is currenty playing!");
    const childTarget = e.target as HTMLAnchorElement;
    const liTarget = childTarget.parentElement as HTMLLIElement;
    Game.setIsPlaying(true);
    debugger;
    GameMode.setCurrentMode(liTarget.dataset.mode as typeof GameMode._currentMode)
    info.innerText = childTarget.innerText;
  }

  public static getCurrentMode() {
    return this._currentMode;
  }

  public static setCurrentMode(mode: typeof this._currentMode): void {
    this._currentMode = mode
  }
}

class Player {
  private static _player: Record<string, PlayerCharacter> = {
    p1: "X",
    p2: "O",
  };
  public static count(): number {
    return Object.keys(this._player).length;
  }
  public static getPlayerByTurn(number: number): string {
    return Object.values(this._player)[number];
  }
}

class Game {
  private static _size: number | undefined;
  private static _turn = 0;
  private static _action: Action | undefined;
  private static _isPlaying = false;

  public static _availablePosition: number[] | undefined;

  public static isPlaying(): boolean {
    return this._isPlaying;
  }
  public static setIsPlaying(isPlaying: boolean): void {
    this._isPlaying = isPlaying;
  }

  public static getCurrentPlayer(): string {
    return Player.getPlayerByTurn(this._turn);
  }

  public static turn(): void {
    this._turn = this._turn % Player.count() - 1 === 0 ? 0 : this._turn + 1;
  }
  public static addAction(action: Action) {
    this._action = action;
  }
  public static drawBoard(insideHtmlElement: HTMLElement) {
    for (let i = 0; i < this._size! ** 2; i++) {
      let div = document.createElement("div");
      div.classList.add("tile");
      div.onclick = (e: MouseEvent) => this._action!.getAction(GameMode.getCurrentMode()!)(e, i);
      insideHtmlElement.appendChild(div);
    }
  }
  public static setBoardSize(size: number): void {
    this._size = size;
    this._availablePosition = new Array(size ** 2).fill(null).map((_, i) => i);
  }
  public static restartGame() {

  }
}

class Action {
  public getAction(gameMode: keyof typeof GameMode.GameModeOptions) {
    const action: Record<typeof gameMode, any> = {
      COMPUTER: (e: MouseEvent, index: number) => this.vsComputer(e, index),
      OFFLINE: (e: MouseEvent, index: number) => this.vsPlayerOffline(e, index),
      ONLINE: (e: MouseEvent, index: number) => this.vsPlayerOnline(e, index),
    }
    return action[gameMode];
  }
  public vsPlayerOffline(e: MouseEvent, index: number): void {
    if (GameOver.isGameOver()) return Game.setIsPlaying(false);

    const divTarget = e.target as HTMLDivElement;

    Game._availablePosition!.splice(index, 1);

    const player = Game.getCurrentPlayer();
    divTarget.onclick = null;
    divTarget.innerText = player;

    GameOver.check(info);
    Game.turn();

  };
  public vsPlayerOnline(e: MouseEvent, index: number) {

  }
  public vsComputer(e: MouseEvent, index: number) {
    if (GameOver.isGameOver()) return Game.setIsPlaying(false);

    const divTarget = e.target as HTMLDivElement;

    console.group("User");
    console.log("Get: ", Game._availablePosition![index]);
    console.log("User Choose: ", index);
    console.log("Raw Before: ", Game._availablePosition);
    Game._availablePosition!.splice(Game._availablePosition!.indexOf(index), 1);
    console.log("Raw After: ", Game._availablePosition);
    console.groupEnd();

    const player = Game.getCurrentPlayer();
    divTarget.onclick = null;
    divTarget.innerText = player;

    GameOver.check(info);
    Game.turn();

    // Computer Logic
    if (GameOver.isGameOver()) return Game.setIsPlaying(false);

    const computerChoose = Utils.getRandomIntBetween(0, Game._availablePosition!.length - 1)

    const divTile = document.getElementsByClassName("tile")[Game._availablePosition![computerChoose]] as HTMLDivElement;
    console.group("Computer");
    console.log("Get: ", Game._availablePosition![computerChoose]);
    console.log("Computer Choose: ", computerChoose);
    console.log("Raw Before: ", Game._availablePosition);
    Game._availablePosition!.splice(computerChoose, 1);
    console.log("Raw After: ", Game._availablePosition);
    console.groupEnd();
    const computer = Game.getCurrentPlayer();
    divTile.onclick = null;
    divTile.innerText = computer;

    GameOver.check(info);
    Game.turn();
  }
}

class GameOver {
  private _isGameOver: boolean = false
  private static readonly _winPositions = [
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

  public static isGameOver() {
    return this.prototype._isGameOver;
  }
  public static check(info: HTMLElement) {
    if (GameOver.isDraw()) {
      info.innerText = Message.draw();
    };
    if (GameOver.isWin()) {
      info.innerText = Message.won(Game.getCurrentPlayer());
    }
  }

  public static isWin() {
    this._winPositions.forEach((position: number[]) => {
      const firstSquare = div[position[1 - 1] - 1];
      const secondSquare = div[position[2 - 1] - 1];
      const thirdSquare = div[position[3 - 1] - 1];
      const isValid: boolean = firstSquare.innerText !== "";
      const isMatch1: boolean = firstSquare.innerText === secondSquare.innerText;
      const isMatch2: boolean = secondSquare.innerText === thirdSquare.innerText;
      if (isValid && isMatch1 && isMatch2) {
        const dim = "0.5";
        firstSquare.style.opacity = dim
        secondSquare.style.opacity = dim
        thirdSquare.style.opacity = dim;
        this.prototype._isGameOver = true;
      }
    });
    return this.prototype._isGameOver;
  }
  public static isDraw() {
    return !Array.from(div).find((_) => _.innerText === "");
  }
}

class Message {
  public static draw(): string {
    return "Draw!";
  }
  public static won(player: string): string {
    return "Player " + player.toLocaleUpperCase() + " win!";
  }
}

class Utils {
  public static getRandomIntBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }
}

main();

function main() {
  GameMode.init(gameModeListContainer);
  Game.setBoardSize(SIZE);
  Game.addAction(new Action);
  Game.drawBoard(section);
}