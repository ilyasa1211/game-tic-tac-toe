// gameBoard.style.setProperty("--SIZE", String(GAME_SIZE));

import { type RefObject } from "preact";
import GameReadyEvent from "./events/ready.ts";
import type { modes } from "./modes/enums.ts";
import { CreateMode } from "./modes/factory.ts";
import type { IGameMode } from "./modes/interfaces.ts";
// alertButton.onclick = () => alertContainer.classList.add("hidden");

// window.onerror = errorHandler;

export default class GameContainer extends EventTarget {
	private mode: IGameMode | undefined;
	private tiles: RefObject<HTMLElement | null>[] | undefined;

	public setTiles(tiles: RefObject<HTMLElement | null>[]) {
		this.tiles = tiles;
	}

	public getCurrentPlayer() {
		if (typeof this.mode === "undefined") {
			throw new Error("please set mode first");
		}

		return this.mode.getCurrentPlayer();
	}

	public setMode(mode: (typeof modes)[keyof typeof modes]) {
		if (typeof this.tiles === "undefined") {
			throw new Error("please set tiles");
		}

		const resultMode =  CreateMode(mode, this.tiles, this);

		resultMode.setup();

		this.mode = resultMode;
		this.dispatchEvent(new GameReadyEvent());
	}

	public listenAndStart() {
		this.addEventListener("game-ready", () => (this.mode as IGameMode).start(this));
	}
}

// async function main() {
// const display = new Display();
// const playerRepository = new PlayerRepository();
// const gameStatus = new GameStatus();
// const gamePosition = new GamePosition(GAME_SIZE);
// const gameResult = new GameResult(gamePosition);
// const gamePlayer = new GamePlayer(playerRepository);
// const gameAction = new GameAction();
// const game = new Game(
//   GAME_SIZE,
//   gameBoard,
//   gameAction,
//   gameStatus,
//   gameResult,
//   gamePlayer,
//   gamePosition
// );
// const gameMode = new GameMode(game, gameModeLists);
// gameMode.addGameMode(new ActionVSComputer());
// gameMode.addGameMode(new ActionVSOffline());
// gameMode.addGameMode(new ActionVSOnline());
// game.player.addPlayer(new Player("Player 1", "O"));
// game.player.addPlayer(new Player("Player 2", "X"));
// display.render(game, gameMode);
// }
