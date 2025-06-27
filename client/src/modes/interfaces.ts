import type settings from "../config/settings.ts";
import type { IPlayer } from "../players/interface";
import type { GameOverStatus } from "./enums.ts";

export interface IGameMode {
	/**
	 * Check wether the game is draw, win, or still playing
	 */
	getGameOverStatus(): Promise<typeof GameOverStatus[keyof typeof GameOverStatus]>;

	/**
	 * Get available positions by index
	 */
	getAvailablePositions(): Promise<number[]>;

	/**
	 * Get current positions state
	 */
	getPositions(): Promise<(typeof settings.PLAYER_CHARACTERS[number] | undefined)[]>;

	getCurrentPlayer(): Promise<IPlayer>;

	/**
	 * this is used when a player take their turn successfuly
	 */
	acquireTurn(): Promise<void>;

	addPlayer(player: IPlayer): Promise<void>;

	start(eventTarget: EventTarget): Promise<void>;

	setup(): Promise<void>;
}
