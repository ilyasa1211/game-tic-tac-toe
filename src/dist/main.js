"use strict";
alertButton.addEventListener("click", function (event) {
    alertContainer.classList.add("hidden");
});
main();
function main() {
    const game = new Game();
    game.setBoardSize(SIZE);
    game.addGameMode(new GameMode(game)).drawHtmlElement(gameModeListContainer);
    game.addPlayer(new Player());
    game.addAction(new Action(game));
    game.drawBoard(section);
    Object.defineProperty(window, 'retry', { value: () => game.retryGame() });
    Object.defineProperty(window, 'reset', { value: () => game.resetGame() });
}
