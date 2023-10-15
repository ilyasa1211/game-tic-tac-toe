
abstract class Action {
  public abstract label: string;
  public abstract execute(evt: MouseEvent, index: number, game: Game): void;
  //   public constructor(private game: Game) {}

  //   public getAction(gameMode: keyof GameModeOptions | undefined) {
  //     if (typeof gameMode === "undefined") {
  //       return Utils.showAlert("Oops! Please choose mode first");
  //     }
  //     const action: Record<keyof GameModeOptions, any> = {
  //       COMPUTER: (evt: MouseEvent, index: number) => vsComputer(evt, index),
  //       OFFLINE: (evt: MouseEvent, index: number) =>
  //         vsPlayerOffline(evt, index),
  //       ONLINE: (evt: MouseEvent, index: number) =>
  //         vsPlayerOnline(evt, index),
  //     };
  //     return action[gameMode];
  //   }
}

class ActionVSComputer implements Action {
  public label: string = "1 Player (Computer)";
  
  public execute(evt: MouseEvent, index: number, game: Game) {
    if (game.isGameOver() || game.isThinking()) return;

    const divTarget = evt.target as HTMLDivElement;

    if (divTarget.textContent !== "") {
      return;
    }

    // User
    const playerCharacter = game.getCurrentPlayer().character;

    game.setCharacter(index, playerCharacter);

    divTarget.textContent = playerCharacter;

    game.checkGameOver(info);
    game.turn();

    // Computer Logic
    if (game.isGameOver()) return;

    game.isThinking(true);

    Utils.SimulateThinking(() => {
      const computerChoose = Utils.shuffleArray(
        game.getAvailablePosition()
      )[0];

      const divTile = document.getElementsByClassName("tile")[
        computerChoose
      ] as HTMLDivElement;
      const computer = game.getCurrentPlayer();

      game.setCharacter(computerChoose, computer.character);

      divTile.textContent = computer.character;

      game.checkGameOver(info);
      game.turn();

      game.isThinking(false);
    });
  }
}

class ActionVSOffline implements Action {
  public label: string = "2 Player (Offline)";

  public execute(evt: MouseEvent, index: number, game: Game): void {
    if (game.isGameOver()) return;

    const divTarget = evt.target as HTMLDivElement;

    if (divTarget.textContent !== "") {
      return;
    }

    const player = game.getCurrentPlayer();

    game.setCharacter(index, player.character);

    // divTarget.textContent = player.character;

    game.checkGameOver(info);
    game.turn();
  }
}

class ActionVSOnline implements Action {
  public label: string = "2 Player (Online)";

  public execute(evt: MouseEvent, index: number, game: Game): void {
    if (game.isOffline()) {
      game.currentMode(undefined);
      return;
    }
    const data = {
      position: index,
      player: game.getCurrentPlayer().character,
    };
    ws.send(JSON.stringify(data));
  }
}
