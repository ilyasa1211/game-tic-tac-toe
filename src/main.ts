alertButton.addEventListener("click", function (event: MouseEvent) {
    alertContainer.classList.add("hidden");
})

main();

function main() {
    GameMode.init(gameModeListContainer);
    Game.setBoardSize(SIZE);
    Game.addAction(new Action);
    Game.drawBoard(section);
}