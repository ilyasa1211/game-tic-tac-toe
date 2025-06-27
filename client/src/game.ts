import { type RefObject } from "preact";
import GameReadyEvent from "./events/ready.ts";
import { CreateMode } from "./modes/factory.ts";
import type { IGameMode } from "./modes/interfaces.ts";
import type { Mode } from "./modes/enums.ts";

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

	public setMode(mode: (typeof Mode)[keyof typeof Mode]) {
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