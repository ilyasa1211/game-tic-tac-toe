import type { RefObject } from "preact";
import GameReadyEvent, { BoardReady, TilesReady } from "./events/ready.ts";
import type { Mode } from "./modes/enums.ts";
import { CreateMode } from "./modes/factory.ts";
import type { IGameMode } from "./modes/interfaces.ts";
import { isUndefined } from "./validation.ts";

export default class GameContainer extends EventTarget {
  private gameMode: IGameMode | undefined;
  private mode: (typeof Mode)[keyof typeof Mode] | undefined;
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
    if (isUndefined(this.mode)) {
      throw new TypeError("mode is undefined");
    }
    if (isUndefined(this.tiles)) {
      throw new TypeError("tiles is undefined");
    }

    const mode = CreateMode(this.mode, this.tiles, this);

    mode.setup();
    mode.start();

    this.gameMode = mode;
  }

  public setTiles(tiles: RefObject<HTMLElement | null>[]) {
    this.tiles = tiles;

    this.dispatchEvent(new TilesReady());
  }

  public getCurrentPlayer() {
    if (typeof this.gameMode === "undefined") {
      throw new Error("please set mode first");
    }

    return this.gameMode.getCurrentPlayer();
  }

  public setMode(mode: (typeof Mode)[keyof typeof Mode]) {
    this.mode = mode;
    this.dispatchEvent(new BoardReady());
  }
}
