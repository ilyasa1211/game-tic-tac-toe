"use strict";
class GameMode {
    constructor(_game) {
        this._game = _game;
        this.GameModeOptions = {
            COMPUTER: "1 Player (Computer)",
            OFFLINE: "2 Player (Offline)",
            ONLINE: "2 Player (Online)",
        };
    }
    drawHtmlElement(gameModeListContainer) {
        const key = this.extractGameModes(this.GameModeOptions);
        key.forEach((value, index) => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            li.dataset.mode = value;
            li.onclick = (e) => this.chooseMode.apply(this, [e]);
            a.textContent = this.GameModeOptions[value];
            a.href = "#main";
            li.appendChild(a);
            gameModeListContainer.appendChild(li);
        });
    }
    chooseMode(e) {
        if (this._game.isPlaying())
            return Utils.showAlert("Game is currenty playing!");
        const childTarget = e.target;
        const liTarget = childTarget.parentElement;
        const mode = liTarget.dataset.mode;
        this._game.isPlaying(true);
        this._game.setCurrentMode(mode);
        info.textContent = childTarget.textContent;
    }
    extractGameModes(gameModeOptions) {
        return Object.keys(gameModeOptions);
    }
}
