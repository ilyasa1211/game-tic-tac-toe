import type { RefObject } from "preact";
import settings from "../config/settings.ts";
import system from "../config/system.ts";
import {
  GameResultEventDraw,
  GameResultEventWin,
} from "../events/game-result.ts";
import type { IPlayer, IPlayerCharacter } from "../players/interface.ts";
import BasicRoom from "../room/basic.ts";
import type { IRoom } from "../room/interface.ts";
import { GameOverStatus } from "./enums.ts";
import type { IGameMode } from "./interfaces.ts";

export abstract class OfflineMode implements IGameMode {
  protected room: IRoom;
  protected turn: number = 0;
  protected tiles;
  protected positions: (IPlayerCharacter | undefined)[] = [];
  protected gameEvent;

  // cached status
  private gameOverStatus:
    | (typeof GameOverStatus)[keyof typeof GameOverStatus]
    | undefined;

  public constructor(tiles: RefObject<HTMLElement>[], gameEvent: EventTarget) {
    this.room = new BasicRoom();
    this.tiles = tiles;
    this.gameEvent = gameEvent;

    this.positions = Array.from({ length: settings.TILE_SIZE ** 2 });
  }

  public abstract setup(): Promise<void>;

  public async getPositions() {
    return this.positions;
  }

  public async getAvailablePositions(): Promise<number[]> {
    const positions = await this.getPositions();
    const availablePos = (
      await Promise.all(
        positions.map(async (character, index) => {
          return typeof character === "undefined" ? index : null;
        }),
      )
    ).filter((v) => v !== null);

    return availablePos;
  }

  public addPlayer(player: IPlayer): Promise<void> {
    return Promise.resolve(this.room.addPlayer(player));
  }

  public async start(): Promise<void> {
    await this.allPlayerPrepare();

    const currentPlayer = (await this.getCurrentPlayer()) as IPlayer;
    currentPlayer.setReady(await this.getAvailablePositions(), this.tiles);
  }

  private async allPlayerPrepare(): Promise<void> {
    for (const player of await this.room.getPlayers()) {
      await player.setup(
        this.acquireTurn.bind(this),
        this.takePosition.bind(this),
        this.getGameOverStatus.bind(this),
      );
    }
  }

  public async getCurrentPlayer(): Promise<IPlayer> {
    return (await this.room.getPlayers())[this.turn];
  }

  private async takePosition(position: number, character: IPlayerCharacter) {
    const target = this.tiles?.[position].current;

    if (target === null || typeof target === "undefined") {
      console.error("target is null or undefined");
      return;
    }

    target.innerText = character;
    this.positions[position] = character;
  }

  public async acquireTurn(): Promise<void> {
    // check win
    const status = await this.getGameOverStatus();

    switch (status) {
      case GameOverStatus.DRAW:
        this.gameEvent.dispatchEvent(new GameResultEventDraw());
        return;
      case GameOverStatus.WIN: {
        const currentPlayer = await this.getCurrentPlayer();
        this.gameEvent.dispatchEvent(new GameResultEventWin(currentPlayer));
        return;
      }
      case GameOverStatus.NONE:
        break;
      default:
        break;
    }

    this.turn = await this.getNextTurn();

    const nextPlayer = await this.getCurrentPlayer();
    await nextPlayer.setReady(await this.getAvailablePositions(), this.tiles);
  }

  public async getGameOverStatus(): Promise<
    (typeof GameOverStatus)[keyof typeof GameOverStatus]
  > {
    // cache
    if (typeof this.gameOverStatus !== "undefined") {
      return this.gameOverStatus;
    }

    const calculateResult = async () => {
      const positions = await this.getPositions();

      const size = settings.TILE_SIZE;
      const winPositionOffset = system.WIN_POSITION_OFFSET;

      // if size is 4 (x)
      // make it 2 x 2 loop (x - 2)
      // if size is 3
      // make it 1 x 1 loop
      // (size - 2
      for (let row = 0; row < size - 2; row++) {
        for (let col = 0; col < size - 2; col++) {
          const position = [
            positions[row * size + col],
            positions[row * size + col + 1],
            positions[row * size + col + 2],
            positions[(row + 1) * size + col],
            positions[(row + 1) * size + col + 1],
            positions[(row + 1) * size + col + 2],
            positions[(row + 2) * size + col],
            positions[(row + 2) * size + col + 1],
            positions[(row + 2) * size + col + 2],
          ];

          for (let i = 0; i < system.WIN_POSITIONS.length; i++) {
            const winPos = system.WIN_POSITIONS[i];
            const blockOne = position.at(winPos[0] + winPositionOffset);
            const blockTwo = position.at(winPos[1] + winPositionOffset);
            const blockThree = position.at(winPos[2] + winPositionOffset);

            if (
              [blockOne, blockTwo, blockThree].some(
                (block) => typeof block === "undefined",
              )
            ) {
              continue;
            }

            if (blockOne === blockTwo && blockTwo === blockThree) {
              return GameOverStatus.WIN;
            }
          }
        }
      }

      if (positions.every((pos) => typeof pos !== "undefined")) {
        return GameOverStatus.DRAW;
      }

      return GameOverStatus.NONE;
    };

    const result = await calculateResult();

    if (result === GameOverStatus.NONE) {
      return result;
    }

    this.gameOverStatus = result;

    return result;
  }

  private async getNextTurn(): Promise<number> {
    const turn = this.turn + 1;

    return turn % (await this.room.getPlayerCount());
  }
}
