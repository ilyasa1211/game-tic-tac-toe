import type { IPlayer } from "../players/interface.ts";

export class GameResultEventDraw extends CustomEvent<void> {
  public constructor() {
    super("result-draw");
  }
}

export class GameResultEventWin<T extends IPlayer = IPlayer> extends CustomEvent<T> {
  public constructor(data: T) {
    super("result-win", {
      detail: data
    });
  }
}