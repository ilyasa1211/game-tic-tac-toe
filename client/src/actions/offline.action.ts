class ActionVSOffline implements IAction {
  public label: string = "2 Player (Offline)";

  public execute(evt: MouseEvent, index: number, game: IGame): void {
    if (game.result.isGameOver()) {
      return;
    }

    if (!game.position.isAvailable(index)) {
      return;
    }

    const player = game.getCurrentPlayer();

    game.position.setPosition(index, player.character);

    game.refresh();

    if (game.result.isGameOver()) {
      throw new GameOver(game);
    }

    game.turn();
  }
}
