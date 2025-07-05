import type { RefObject } from "preact";
import type { ClickEventData } from "../events/click.ts";
import { GameOverStatus } from "../modes/enums.ts";
import { isOccupied } from "../utils/common.ts";
import BasePlayer from "./base.ts";
import type { IPlayer, IPlayerCharacter } from "./interface.ts";

export default class Player extends BasePlayer implements IPlayer {
  public async setup(
    acquireTurn: () => Promise<void>,
    takePosition: (
      position: number,
      character: IPlayerCharacter,
    ) => Promise<void>,
    getGameOverStatus: () => Promise<
      (typeof GameOverStatus)[keyof typeof GameOverStatus]
    >,
  ): Promise<void> {
    this.gameEvent.addEventListener("tile-click", async (e: Event) => {
      if ((await getGameOverStatus()) !== GameOverStatus.NONE) {
        return e.preventDefault();
      }

      const evt = e as CustomEvent<ClickEventData>;
      const { event, getCurrentPlayer, index } = evt.detail;
      const currPlayer = await getCurrentPlayer();

      // validate
      if (
        !event.isTrusted ||
        currPlayer !== this ||
        isOccupied(event.target as HTMLElement)
      ) {
        return;
      }

      const character = await this.getCharacter();

      await takePosition(index, character);
      await acquireTurn();
    });
  }

  public async setReady(
    _availablePositions: number[],
    _tiles: RefObject<HTMLElement>[],
  ): Promise<void> {
    return;
  }
}
