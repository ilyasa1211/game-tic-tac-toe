"use strict";
class GameMode {
    static init(gameModeListContainer) {
        this.prototype._gameModeListContainer = gameModeListContainer;
        this.prototype.drawHtmlElement(GameMode.GameModeOptions);
    }
    drawHtmlElement(gameModeOptions) {
        const key = this.extractGameModes(gameModeOptions);
        key.forEach((value, index) => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            li.dataset.mode = value;
            li.onclick = this.chooseMode;
            a.innerText = GameMode.GameModeOptions[value];
            a.href = "#main";
            li.appendChild(a);
            this._gameModeListContainer.appendChild(li);
        });
    }
    extractGameModes(gameModeOptions) {
        return Object.keys(gameModeOptions);
    }
    chooseMode(e) {
        if (Game.isPlaying())
            return Utils.showAlert("Game is currenty playing!");
        const childTarget = e.target;
        const liTarget = childTarget.parentElement;
        Game.setIsPlaying(true);
        GameMode.setCurrentMode(liTarget.dataset.mode);
        info.innerText = childTarget.innerText;
    }
    static getCurrentMode() {
        return this._currentMode;
    }
    static setCurrentMode(mode) {
        this._currentMode = mode;
    }
}
GameMode.GameModeOptions = {
    COMPUTER: "1 Player (Computer)",
    OFFLINE: "2 Player (Offline)",
    ONLINE: "2 Player (Online)",
};
