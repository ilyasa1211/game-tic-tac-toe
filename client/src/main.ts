gameBoard.style.setProperty("--SIZE", String(GAME_SIZE));

alertButton.onclick = () => alertContainer.classList.add("hidden");

window.onerror = errorHandler;

main();

function main() {
  const display = new Display();
  const playerRepository = new PlayerRepository();
  const gameStatus = new GameStatus();
  const gamePosition = new GamePosition(GAME_SIZE);
  const gameResult = new GameResult(gamePosition);
  const gamePlayer = new GamePlayer(playerRepository);
  const gameAction = new GameAction();

  const game = new Game(
    GAME_SIZE,
    gameBoard,
    gameAction,
    gameStatus,
    gameResult,
    gamePlayer,
    gamePosition
  );
  const gameMode = new GameMode(game, gameModeLists);

  gameMode.addGameMode(new ActionVSComputer());
  gameMode.addGameMode(new ActionVSOffline());
  gameMode.addGameMode(new ActionVSOnline());

  // game.player.addPlayer(new Player("Player 1", "O"));
  // game.player.addPlayer(new Player("Player 2", "X"));

  display.render(game, gameMode);
}
