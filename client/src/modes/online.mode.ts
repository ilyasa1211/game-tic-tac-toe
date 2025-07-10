import type { RefObject } from "preact";
import type { IPlayer } from "../players/interface.ts";
import OnlinePlayer from "../players/online-player.ts";
import Player from "../players/player.ts";
import type { IGameMode } from "./interfaces.ts";
import { getConnection } from "../infrastructure/websocket.ts";
import BasicRoom from "../room/basic.ts";

/**
 * There should be three options: join room with code, host room, and quick play randomly choose room
 */
export default class OnlineMode implements IGameMode {
  /**
   * Virtual room, actual logic was on the backend
   */
  private readonly vRoom;
  private readonly gameEvent;
  private readonly tiles;
  private readonly connection;

  public constructor(tiles: RefObject<HTMLElement>[], gameEvent: EventTarget) {
    this.tiles = tiles;
    this.gameEvent = gameEvent;
    this.vRoom = new BasicRoom();
    this.connection = getConnection();
  }

  public async setup(): Promise<void> {
    // this stored on both client and server
    await this.addPlayer(new Player("player", this.gameEvent));

    // this stored on the client only
    this.vRoom.addPlayer(new OnlinePlayer("online-player", this.gameEvent));
  }

  public async addPlayer(player: IPlayer): Promise<void> {
    this.connection.send()
  }

  public async start(eventTarget: EventTarget): Promise<void> {
    
  }

  public async getPositions(): Promise<(("X" | "O") | undefined)[]> {
    
  }

  public async getGameOverStatus(): Promise<GameOverStatus[keyof GameOverStatus]> {
    
  }

  public async getCurrentPlayer(): Promise<IPlayer> {
    
  }

  public async getAvailablePositions(): Promise<number[]> {
    
  }

  public async acquireTurn(): Promise<void> {
    
  }
}
