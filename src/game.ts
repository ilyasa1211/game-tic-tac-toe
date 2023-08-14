class Game {
    private static _size: number | undefined;
    private static _turn = 0;
    private static _action: Action | undefined;
    private static _isPlaying = false;
    private static _isThinking = false;

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
}