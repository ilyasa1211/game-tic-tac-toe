import settings from "../config/settings.ts";
import { GameResultEventWin } from "../events/game-result.ts";
import Bot from "../players/bot.ts";
import Player from "../players/player.ts";
import { getRandomIntBetween } from "../utils/common.ts";
import { OfflineMode } from "./base.ts";
import type { IGameMode } from "./interfaces.ts";

export default class BotGame extends OfflineMode implements IGameMode {
  public async setup(): Promise<void> {
    this.gameEvent.addEventListener(GameResultEventWin.name, (e) => {
      const event = e as GameResultEventWin;

      const player = event.detail;

      if (player instanceof Bot) {
        alert(`Bot win!`);
        return;
      }

      alert("You win!");
    });

    this.addPlayer(new Bot("bot", this.gameEvent));
    this.addPlayer(new Player("player", this.gameEvent));

    this.shuffleTurn();
    this.assignEachPlayerRandomCharacter();
  }

  private async shuffleTurn() {
    this.turn = getRandomIntBetween(0, (await this.room.getPlayerCount()) - 1);
  }

  private async assignEachPlayerRandomCharacter() {
    const availableChars = [...settings.PLAYER_CHARACTERS];

    for (const player of await this.room.getPlayers()) {
      const index = getRandomIntBetween(0, availableChars.length - 1);
      const char = availableChars.splice(index, 1).at(0);

      if (typeof char === "undefined") {
        throw new TypeError("char is undefined");
      }

      player.setCharacter(char);
    }
  }
}
