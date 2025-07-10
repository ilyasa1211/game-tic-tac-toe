export default class GameReadyEvent<T> extends CustomEvent<T> {
  public static readonly name = "game-ready";
  public constructor() {
    super(GameReadyEvent.name);
  }
}

export class BoardReady extends CustomEvent<void> {
  public static readonly name = "board-ready";
  public constructor() {
    super(BoardReady.name);
  }
}

export class TilesReady extends CustomEvent<void> {
  public static readonly name = "tiles-ready";
  public constructor() {
    super(TilesReady.name);
  }
}
