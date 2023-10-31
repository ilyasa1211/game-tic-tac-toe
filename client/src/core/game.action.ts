interface IGameAction {
  execute(evt: MouseEvent, index: number, game: IGame): void;
  setAction(action: IAction): void;
}

class GameAction implements IGameAction {
  private _action: IAction | undefined;

  public execute(evt: MouseEvent, index: number, game: IGame): void {
    if (typeof this._action === "undefined") {
      throw new InformationalMessage("Please set action");
    }
    this._action.execute(evt, index, game);
  }

  public setAction(action: IAction): void {
    this._action = action;
    throw new ResultMessage(action.label);
  }
}
