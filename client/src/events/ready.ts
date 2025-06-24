export default class GameReadyEvent<T> extends CustomEvent<T> {
  public constructor() {
    super("game-ready");
  }
}