class ActionVSOnline implements IAction {
  public label: string = "2 Player (Online)";

  public execute(evt: MouseEvent, index: number, game: IGame): void {
    evt.stopPropagation();

    if (!game.status.isOnline()) {
      return;
    }

    const data = {
      position: index,
      player: game.getCurrentPlayer().character,
    };

    ws.send(JSON.stringify(data));
  }
}
