import OnlinePlayer from "../players/online-player.ts";
import Player from "../players/player.ts";
import type { IGameMode } from "./interfaces.ts";

export default class OnlineMode implements IGameMode {
  public async setup(): Promise<void> {
    this.addPlayer(new Player("player", this.gameEvent));
    this.addPlayer(new OnlinePlayer("player", this.gameEvent));
  }
}
