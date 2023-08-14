class Game {
    private static _size: number | undefined;
    private static _turn = 0;
    private static _action: Action | undefined;
    private static _isPlaying = false;
    private static _isThinking = false;
    private static _isGameOver: boolean = false
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
    public static _availablePosition: number[] | undefined;

    public static isThinking(isThinking?: boolean | undefined): boolean | void {
        if (typeof isThinking === "undefined") {
            return this._isThinking;
        }
        this._isThinking = isThinking;
    }

    public static isPlaying(isPlaying?: boolean | undefined): boolean | void {
        if (typeof isPlaying === "undefined") {
            return this._isPlaying;
        }
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
        for (let index = 0; index < this._size! ** 2; index++) {
            let div = document.createElement("div");
            div.classList.add("tile");
            div.onclick = (event: MouseEvent) => {
                return this._action?.getAction(GameMode.getCurrentMode())(event, index)
            }
            insideHtmlElement.appendChild(div);
        }
    }
    public static setBoardSize(size: number): void {
        this._size = size;
        this._availablePosition = new Array(size ** 2).fill(null).map((_value: null, index: number) => index);
    }
    public static restartGame() {

    }

    public static isGameOver() {
        return this._isGameOver;
    }
    public static checkGameOver(info: HTMLElement) {
        if (Game.isDraw()) {
            info.innerText = Message.draw();
        };
        if (Game.isWin()) {
            info.innerText = Message.won(Game.getCurrentPlayer());
        }
    }

    public static isWin() {
        this._winPositions.forEach((position: number[]) => {
            const firstTile = div[position[1 - 1] - 1];
            const secondTile = div[position[2 - 1] - 1];
            const thirdTile = div[position[3 - 1] - 1];
            const isValid: boolean = firstTile.innerText !== "";
            const isMatch1: boolean = firstTile.innerText === secondTile.innerText;
            const isMatch2: boolean = secondTile.innerText === thirdTile.innerText;
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
    public static isDraw() {
        return !Array.from(div).find((tile: HTMLDivElement) => tile.innerText === "");
    }
}
