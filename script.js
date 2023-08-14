const SIZE = 3;
var div = document.getElementsByTagName("div");
var section = document.getElementsByTagName("section")[0];
var info = document.getElementsByTagName("h1")[1];
var gameModeListContainer = document.getElementsByTagName("ul")[0];
section.style.setProperty("--SIZE", String(SIZE));
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
            return alert("Game is currenty playing!");
        const childTarget = e.target;
        const liTarget = childTarget.parentElement;
        Game.setIsPlaying(true);
        debugger;
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
class Player {
    static count() {
        return Object.keys(this._player).length;
    }
    static getPlayerByTurn(number) {
        return Object.values(this._player)[number];
    }
}
Player._player = {
    p1: "X",
    p2: "O",
};
class Game {
    static isPlaying() {
        return this._isPlaying;
    }
    static setIsPlaying(isPlaying) {
        this._isPlaying = isPlaying;
    }
    static getCurrentPlayer() {
        return Player.getPlayerByTurn(this._turn);
    }
    static turn() {
        this._turn = this._turn % Player.count() - 1 === 0 ? 0 : this._turn + 1;
    }
    static addAction(action) {
        this._action = action;
    }
    static drawBoard(insideHtmlElement) {
        for (let i = 0; i < this._size ** 2; i++) {
            let div = document.createElement("div");
            div.classList.add("tile");
            div.onclick = (e) => this._action.getAction(GameMode.getCurrentMode())(e, i);
            insideHtmlElement.appendChild(div);
        }
    }
    static setBoardSize(size) {
        this._size = size;
        this._availablePosition = new Array(size ** 2).fill(null).map((_, i) => i);
    }
    static restartGame() {
    }
}
Game._turn = 0;
Game._isPlaying = false;
class Action {
    getAction(gameMode) {
        const action = {
            COMPUTER: (e, index) => this.vsComputer(e, index),
            OFFLINE: (e, index) => this.vsPlayerOffline(e, index),
            ONLINE: (e, index) => this.vsPlayerOnline(e, index),
        };
        return action[gameMode];
    }
    vsPlayerOffline(e, index) {
        if (GameOver.isGameOver())
            return Game.setIsPlaying(false);
        const divTarget = e.target;
        Game._availablePosition.splice(index, 1);
        const player = Game.getCurrentPlayer();
        divTarget.onclick = null;
        divTarget.innerText = player;
        GameOver.check(info);
        Game.turn();
    }
    ;
    vsPlayerOnline(e, index) {
    }
    vsComputer(e, index) {
        if (GameOver.isGameOver())
            return Game.setIsPlaying(false);
        const divTarget = e.target;
        console.group("User");
        console.log("Get: ", Game._availablePosition[index]);
        console.log("User Choose: ", index);
        console.log("Raw Before: ", Game._availablePosition);
        Game._availablePosition.splice(Game._availablePosition.indexOf(index), 1);
        console.log("Raw After: ", Game._availablePosition);
        console.groupEnd();
        const player = Game.getCurrentPlayer();
        divTarget.onclick = null;
        divTarget.innerText = player;
        GameOver.check(info);
        Game.turn();
        // Computer Logic
        if (GameOver.isGameOver())
            return Game.setIsPlaying(false);
        const computerChoose = Utils.getRandomIntBetween(0, Game._availablePosition.length - 1);
        const divTile = document.getElementsByClassName("tile")[Game._availablePosition[computerChoose]];
        console.group("Computer");
        console.log("Get: ", Game._availablePosition[computerChoose]);
        console.log("Computer Choose: ", computerChoose);
        console.log("Raw Before: ", Game._availablePosition);
        Game._availablePosition.splice(computerChoose, 1);
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
    constructor() {
        this._isGameOver = false;
        this.winPositionsOffset = -1;
    }
    static isGameOver() {
        return this.prototype._isGameOver;
    }
    static check(info) {
        if (GameOver.isDraw()) {
            info.innerText = Message.draw();
        }
        ;
        if (GameOver.isWin()) {
            info.innerText = Message.won(Game.getCurrentPlayer());
        }
    }
    static isWin() {
        this._winPositions.forEach((position) => {
            const firstSquare = div[position[1 - 1] - 1];
            const secondSquare = div[position[2 - 1] - 1];
            const thirdSquare = div[position[3 - 1] - 1];
            const isValid = firstSquare.innerText !== "";
            const isMatch1 = firstSquare.innerText === secondSquare.innerText;
            const isMatch2 = secondSquare.innerText === thirdSquare.innerText;
            if (isValid && isMatch1 && isMatch2) {
                const dim = "0.5";
                firstSquare.style.opacity = dim;
                secondSquare.style.opacity = dim;
                thirdSquare.style.opacity = dim;
                this.prototype._isGameOver = true;
            }
        });
        return this.prototype._isGameOver;
    }
    static isDraw() {
        return !Array.from(div).find((_) => _.innerText === "");
    }
}
GameOver._winPositions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];
class Message {
    static draw() {
        return "Draw!";
    }
    static won(player) {
        return "Player " + player.toLocaleUpperCase() + " win!";
    }
}
class Utils {
    static getRandomIntBetween(min, max) {
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
