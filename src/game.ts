class Game {
    private static _size: number | undefined;
    private static _turn = 0;
    private static _action: Action | undefined;
    private static _isPlaying = false;
    private static _isThinking = false;
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
    public static _availablePosition: number[] | undefined;

    public static isThinking(): boolean {
        return this._isThinking;
    }
    public static setIsThinking(isThinking: boolean): void {
        this._isThinking = isThinking;
    }

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
            div.onclick = (e: MouseEvent) => this._action!.getAction(GameMode.getCurrentMode())(e, i);
            insideHtmlElement.appendChild(div);
        }
    }
    public static setBoardSize(size: number): void {
        this._size = size;
        this._availablePosition = new Array(size ** 2).fill(null).map((_, i) => i);
    }
    public static restartGame() {

    }

    public static isGameOver() {
        return this.prototype._isGameOver;
    }
    public static check(info: HTMLElement) {
        if (Game.isDraw()) {
            info.innerText = Message.draw();
        };
        if (Game.isWin()) {
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
