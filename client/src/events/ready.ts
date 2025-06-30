export default class GameReadyEvent<T> extends CustomEvent<T> {
  public constructor() {
    super("game-ready");
  }
}

export class BoardReady extends CustomEvent<void> {
  public constructor() {
    super("board-ready")
  }
}

export class TilesReady extends CustomEvent<void> {
  public constructor() {
    super("tiles-ready")
  }
}