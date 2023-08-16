"use strict";
class Action {
    constructor(_game) {
        this._game = _game;
    }
    getAction(gameMode) {
        if (!gameMode) {
            return Utils.showAlert("Oops! Please choose mode first");
        }
        const action = {
            COMPUTER: (e, index) => this.vsComputer(e, index),
            OFFLINE: (e, index) => this.vsPlayerOffline(e, index),
            ONLINE: (e, index) => this.vsPlayerOnline(e, index),
        };
        return action[gameMode];
    }
    vsPlayerOffline(e, index) {
        const divTarget = e.target;
        if (divTarget.textContent !== "") {
            return;
        }
        const player = this._game.getCurrentPlayer();
        this._game._availablePosition.splice(index, 1);
        divTarget.textContent = player;
        this._game.checkGameOver(info);
        this._game.turn();
    }
    ;
    vsPlayerOnline(e, index) {
    }
    vsComputer(e, index) {
        if (this._game.isGameOver())
            return;
        if (this._game.isThinking())
            return;
        const divTarget = e.target;
        if (divTarget.textContent !== "") {
            return;
        }
        // User
        console.group("User");
        console.log("Get: ", this._game._availablePosition[index]);
        console.log("User Choose: ", index);
        console.log("Raw Before: ", this._game._availablePosition);
        this._game._availablePosition.splice(this._game._availablePosition.indexOf(index), 1);
        console.log("Raw After: ", this._game._availablePosition);
        console.groupEnd();
        const player = this._game.getCurrentPlayer();
        divTarget.textContent = player;
        this._game.checkGameOver(info);
        this._game.turn();
        // Computer Logic
        if (this._game.isGameOver())
            return;
        this._game.isThinking(true);
        Utils.SimulateThinking(() => {
            const computerChoose = Utils.getRandomIntBetween(0, this._game._availablePosition.length - 1);
            const divTile = document.getElementsByClassName("tile")[this._game._availablePosition[computerChoose]];
            console.group("Computer");
            console.log("Get: ", this._game._availablePosition[computerChoose]);
            console.log("Computer Choose: ", computerChoose);
            console.log("Raw Before: ", this._game._availablePosition);
            this._game._availablePosition.splice(computerChoose, 1);
            console.log("Raw After: ", this._game._availablePosition);
            console.groupEnd();
            const computer = this._game.getCurrentPlayer();
            divTile.textContent = computer;
            this._game.checkGameOver(info);
            this._game.turn();
            this._game.isThinking(false);
        });
    }
}
