class GameOver extends ResultMessage {
  public constructor(game: IGame) {
    super();
    if (game.result.isDraw()) {
      this.message = GameMessage.GAME_DRAW;
    }
    if (game.result.isWin()) {
      const winningPlayer = game.getCurrentPlayer().character;
      this.message = GameMessage.GAME_WON(winningPlayer);
    }
  }
}
