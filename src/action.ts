
class Action {
    public getAction(gameMode: keyof typeof GameMode.GameModeOptions | undefined) {
        if (!gameMode) {
            return Utils.showAlert("Oops! Please choose mode first");
        }
        const action: Record<typeof gameMode, any> = {
            COMPUTER: (e: MouseEvent, index: number) => this.vsComputer(e, index),
            OFFLINE: (e: MouseEvent, index: number) => this.vsPlayerOffline(e, index),
            ONLINE: (e: MouseEvent, index: number) => this.vsPlayerOnline(e, index),
        }
        return action[gameMode];
    }
    public vsPlayerOffline(e: MouseEvent, index: number): void {

        const divTarget = e.target as HTMLDivElement;

        Game._availablePosition!.splice(index, 1);

        const player = Game.getCurrentPlayer();
        divTarget.onclick = null;
        divTarget.innerText = player;

        Game.checkGameOver(info);
        Game.turn();

    };
    public vsPlayerOnline(e: MouseEvent, index: number) {

    }
    public vsComputer(e: MouseEvent, index: number) {
        if (Game.isGameOver()) return;
        if (Game.isThinking()) return;

        const divTarget = e.target as HTMLDivElement;

        // User
        console.group("User");
        console.log("Get: ", Game._availablePosition![index]);
        console.log("User Choose: ", index);
        console.log("Raw Before: ", Game._availablePosition);
        Game._availablePosition!.splice(Game._availablePosition!.indexOf(index), 1);
        console.log("Raw After: ", Game._availablePosition);
        console.groupEnd();

        const player = Game.getCurrentPlayer();
        divTarget.onclick = null;
        divTarget.innerText = player;

        Game.checkGameOver(info);
        Game.turn();

        // Computer Logic
        if (Game.isGameOver()) return;

        Game.isThinking(true);

        Utils.SimulateThinking(() => {
            const computerChoose = Utils.getRandomIntBetween(0, Game._availablePosition!.length - 1)

            const divTile = document.getElementsByClassName("tile")[Game._availablePosition![computerChoose]] as HTMLDivElement;
            console.group("Computer");
            console.log("Get: ", Game._availablePosition![computerChoose]);
            console.log("Computer Choose: ", computerChoose);
            console.log("Raw Before: ", Game._availablePosition);
            Game._availablePosition!.splice(computerChoose, 1);
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
