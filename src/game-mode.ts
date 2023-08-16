class GameMode {
    public constructor(private _game: Game) { }
    public readonly GameModeOptions = {
        COMPUTER: "1 Player (Computer)",
        OFFLINE: "2 Player (Offline)",
        ONLINE: "2 Player (Online)",
    }
    public drawHtmlElement(gameModeListContainer: HTMLOListElement | HTMLUListElement) {
        const key = this.extractGameModes(this.GameModeOptions);

        key.forEach((value: keyof typeof this.GameModeOptions, index: number) => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            li.dataset.mode = value;
            li.onclick = (e: MouseEvent) => this.chooseMode.apply(this, [e]);
            a.textContent = this.GameModeOptions[value];
            a.href = "#main";
            li.appendChild(a);
            gameModeListContainer!.appendChild(li);
        }
        );

    }
    private chooseMode(e: MouseEvent): void {
        if (this._game.isPlaying()) return Utils.showAlert("Game is currenty playing!");
        const childTarget = e.target as HTMLAnchorElement;
        const liTarget = childTarget.parentElement as HTMLLIElement;
        const mode = liTarget.dataset.mode as keyof typeof this.GameModeOptions
        this._game.isPlaying(true);

        this._game.setCurrentMode(mode)
        info.textContent = childTarget.textContent;
    }
    public extractGameModes(gameModeOptions: typeof this.GameModeOptions): (keyof typeof this.GameModeOptions)[] {
        return Object.keys(gameModeOptions) as (keyof typeof this.GameModeOptions)[];
    }


}