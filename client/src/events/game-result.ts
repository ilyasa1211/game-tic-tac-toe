import type { IPlayer } from "../players/interface.ts";

export class GameResultEventDraw extends CustomEvent<void> {
  public static readonly name = "result-draw";
  public constructor() {
    super(GameResultEventDraw.name);
  }
}

export class GameResultEventWin<
  T extends IPlayer = IPlayer,
> extends CustomEvent<T> {
  public static readonly name = "result-win";
  public constructor(data: T) {
    super(GameResultEventWin.name, {
      detail: data,
    });
  }
}
