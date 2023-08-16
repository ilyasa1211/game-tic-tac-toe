class Game {
    private _size: number | undefined;
    private _turn = 0;
    private _action: Action | undefined;
    private _isPlaying = false;
    private _isThinking = false;
    private _isGameOver: boolean = false;
    private _gameMode: GameMode | undefined;
    private _player: Player | undefined;
    private _currentMode: keyof typeof GameMode.prototype.GameModeOptions | undefined;
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
    public _availablePosition: number[] | undefined;

    public addPlayer(player: Player) {
        this._player = player
    }
    public isThinking(isThinking?: boolean | undefined): boolean | void {
        if (typeof isThinking === "undefined") {
            return this._isThinking;
        }
        this._isThinking = isThinking;
    }

    public isPlaying(isPlaying?: boolean | undefined): boolean | void {
        if (typeof isPlaying === "undefined") {
            return this._isPlaying;
        }
        this._isPlaying = isPlaying;
    }

    public getCurrentPlayer(): string | undefined {
        return this._player?.getPlayerByTurn(this._turn);
    }

    public turn(): void {
        this._turn = this._turn % this._player!.count() - 1 === 0 ? 0 : this._turn + 1;
    }
    public addAction(action: Action) {
        this._action = action;
    }
    public drawBoard(insideHtmlElement: HTMLElement) {
        for (let index = 0; index < this._size! ** 2; index++) {
            let div = document.createElement("div");
            div.classList.add("tile");
            div.onclick = (event: MouseEvent) => {
                return this._action?.getAction(this.getCurrentMode())(event, index)
            }
            insideHtmlElement.appendChild(div);
        }
    }
    public setBoardSize(size: number): void {
        this._size = size;
        this._availablePosition = new Array(size ** 2).fill(null).map((_value: null, index: number) => index);
    }

    public retryGame() {
        this.setBoardSize(this._size ?? 3);
        Array.from(div).forEach((tile: HTMLDivElement) => {
            tile.textContent = ""
            tile.style.opacity = "1"
        });
        this._isThinking = false;
        this._isGameOver = false;
    }
    public resetGame() {
        this.retryGame();
        this._isPlaying = false;
        this._currentMode = undefined;
    }

    public addGameMode(gameMode: GameMode): GameMode {
        this._gameMode = gameMode;
        return this._gameMode;
    }
    public getCurrentMode() {
        return this._currentMode;
    }
    public setCurrentMode(mode: NonNullable<typeof this._currentMode>): void {
        this._currentMode = mode
    }
    public isGameOver() {
        return this._isGameOver;
    }
    public checkGameOver(info: HTMLElement) {
        if (this.isDraw()) {
            info.textContent = Message.draw();
        };
        if (this.isWin()) {
            info.textContent = Message.won(this.getCurrentPlayer()!);
        }
    }

    public isWin() {
        this._winPositions.forEach((position: number[]) => {
            const firstTile = div[position[1 - 1] - 1];
            const secondTile = div[position[2 - 1] - 1];
            const thirdTile = div[position[3 - 1] - 1];
            const isValid: boolean = firstTile.textContent !== "";
            const isMatch1: boolean = firstTile.textContent === secondTile.textContent;
            const isMatch2: boolean = secondTile.textContent === thirdTile.textContent;
            if (isValid && isMatch1 && isMatch2) {
                const dim = "0.5";
                firstTile.style.opacity = dim
                secondTile.style.opacity = dim
                thirdTile.style.opacity = dim;
                this._isGameOver = true;
            }
        });
        return this._isGameOver;
    }
    public isDraw() {
        return !Array.from(div).find((tile: HTMLDivElement) => tile.textContent === "");
    }
}
