import type { RefObject } from "preact";
import type { IPlayer } from "../players/interface.ts";
import OnlinePlayer from "../players/online-player.ts";
import Player from "../players/player.ts";
import BasicRoom from "../room/basic.ts";
import type { IGameMode } from "./interfaces.ts";
import type { GameOverStatus } from "./enums.ts";
import WebsocketConnection from "../infrastructure/websocket.ts";

/**
 * There should be three options: join room with code, host room, and quick play randomly choose room
 */
export default class OnlineMode implements IGameMode {
  /**
   * Virtual room,  client side only
   */
  private readonly vRoom;
  private readonly gameEvent;
  private readonly tiles;
  private readonly connection;

  public constructor(tiles: RefObject<HTMLElement>[], gameEvent: EventTarget) {
    using connection = new WebsocketConnection();

    this.tiles = tiles;
    this.gameEvent = gameEvent;
    this.vRoom = new BasicRoom();
    this.connection = connection;
  }

  public async setup(): Promise<void> {
    // this stored on both client and server
    await this.addPlayer(new Player("player", this.gameEvent));

    // this stored on the client only
    this.vRoom.addPlayer(new OnlinePlayer("online-player", this.gameEvent));
  }

  public async addPlayer(player: IPlayer): Promise<void> {
    this.connection.send();
  }

  public async start(eventTarget: EventTarget): Promise<void> {}

  public async getPositions(): Promise<(("X" | "O") | undefined)[]> {}

  public async getGameOverStatus(): Promise<
    typeof GameOverStatus[keyof typeof GameOverStatus]
  > {}

  public async getCurrentPlayer(): Promise<IPlayer> {}

  public async getAvailablePositions(): Promise<number[]> {}

  public async acquireTurn(): Promise<void> {}
}
