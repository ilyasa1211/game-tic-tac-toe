const serverDomain = "http://localhost:3000";

var div = document.getElementsByClassName(
  "tile"
) as HTMLCollectionOf<HTMLDivElement>;
var section = document.getElementsByTagName("section")[0];
var info = document.getElementsByTagName("h1")[1];
var gameModeListContainer = document.getElementsByTagName("ul")[0];
var alertMessage = document.getElementById(
  "alert-message"
) as HTMLParagraphElement;
var alertContainer = document.getElementById(
  "alert-container"
) as HTMLDivElement;
var alertButton = document.getElementById("alert-button") as HTMLButtonElement;

section.style.setProperty("--SIZE", String(SIZE));

alertButton.addEventListener("click", function (event: MouseEvent) {
  alertContainer.classList.add("hidden");
});

main();

function main() {
  const boardSize = 3;
  const gameMode = new GameMode(gameModeListContainer);
  const game = new Game(boardSize, section);
  game.addPlayer(new Player("player_1", "O"));
  game.addPlayer(new Player("player_2", "X"));
  game.setAction(new ActionVSComputer());

  new Display(game, gameMode)
  
  Object.defineProperty(window, "retry", { value: () => game.retryGame() });
  Object.defineProperty(window, "reset", { value: () => game.resetGame() });
}
