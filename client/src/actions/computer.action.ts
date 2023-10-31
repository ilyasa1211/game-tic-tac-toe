class ActionVSComputer implements IAction {
  public label: string = "1 Player (Computer)";

  public execute(evt: MouseEvent, index: number, game: IGame) {
    evt.stopPropagation();

    if (game.result.isGameOver() || game.status.isThinking) {
      return;
    }

    // User
    const playerCharacter = game.getCurrentPlayer().character;

    game.position.setPosition(index, playerCharacter);

    game.refresh();

    if (game.result.isGameOver()) {
      throw new GameOver(game);
    }

    game.turn();

    // Computer Logic

    if (game.result.isGameOver()) {
      return;
    }

    game.status.isThinking = true;

    Utils.SimulateThinking(() => {
      const computerChoose = Utils.shuffleArray(
        game.position.getAvailablePosition()
      )[0];
      const computer = game.getCurrentPlayer();

      game.position.setPosition(computerChoose, computer.character);

      game.refresh();

      if (game.result.isGameOver()) {
        throw new GameOver(game);
      }

      game.turn();

      game.status.isThinking = false;
    });
  }
}
