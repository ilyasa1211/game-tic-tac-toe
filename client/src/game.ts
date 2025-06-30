import { type RefObject } from "preact";
import GameReadyEvent, { BoardReady, TilesReady } from "./events/ready.ts";
import { CreateMode } from "./modes/factory.ts";
import type { IGameMode } from "./modes/interfaces.ts";
import type { Mode } from "./modes/enums.ts";

export default class GameContainer extends EventTarget {
	private mode: IGameMode | undefined;
	private tiles: RefObject<HTMLElement | null>[] | undefined;

	private isTilesReady = false;
	private isBoardReady = false;

	public constructor() {
		super();

		this.addEventListener("board-ready", this.onBoardReady);
		this.addEventListener("tiles-ready", this.onTilesReady);
		this.addEventListener("game-ready", this.onGameReady);
	}

	private checkIfGameReady() {
		if (this.isBoardReady && this.isTilesReady) {
			this.removeEventListener("board-ready", this.onBoardReady);
			this.removeEventListener("tiles-ready", this.onTilesReady);
			this.dispatchEvent(new GameReadyEvent());
		}
	}

	private onBoardReady() {
		this.isBoardReady = true;
		this.checkIfGameReady();
	}

	private onTilesReady() {
		this.isTilesReady = true;
		this.checkIfGameReady();
	}

	private onGameReady() {
		this.mode.start(this);
	}

	public setTiles(tiles: RefObject<HTMLElement | null>[]) {
		this.tiles = tiles;

		this.dispatchEvent(new TilesReady());
	}

	public getCurrentPlayer() {
		if (typeof this.mode === "undefined") {
			throw new Error("please set mode first");
		}

		return this.mode.getCurrentPlayer();
	}

	public setMode(mode: (typeof Mode)[keyof typeof Mode]) {
		const resultMode = CreateMode(mode, this.tiles, this);

		resultMode.setup();

		this.mode = resultMode;
		this.dispatchEvent(new BoardReady());
	}
}