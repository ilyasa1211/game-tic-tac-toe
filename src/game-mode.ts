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
        if (Game.isPlaying()) return Utils.showAlert("Game is currenty playing!");
        const childTarget = e.target as HTMLAnchorElement;
        const liTarget = childTarget.parentElement as HTMLLIElement;
        Game.setIsPlaying(true);
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