"use strict";
class Action {
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
        Game._availablePosition.splice(index, 1);
        const player = Game.getCurrentPlayer();
        divTarget.onclick = null;
        divTarget.innerText = player;
        Game.checkGameOver(info);
        Game.turn();
    }
    ;
    vsPlayerOnline(e, index) {
    }
    vsComputer(e, index) {
        if (Game.isGameOver())
            return;
        if (Game.isThinking())
            return;
        const divTarget = e.target;
        // User
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
        Game.checkGameOver(info);
        Game.turn();
        // Computer Logic
        if (Game.isGameOver())
            return;
        Game.isThinking(true);
        Utils.SimulateThinking(() => {
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
            Game.checkGameOver(info);
            Game.turn();
            Game.isThinking(false);
        });
    }
}
