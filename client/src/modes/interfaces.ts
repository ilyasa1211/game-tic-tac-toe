import type settings from "../config/settings.ts";
import type { IPlayer } from "../players/interface";

export interface IGameMode {
	getAvailablePositions(): Promise<number[]>;
	getPositions(): Promise<(typeof settings.PLAYER_CHARACTERS[number] | null)[]>;
	getCurrentPlayer(): Promise<IPlayer>;
	acquireTurn(): Promise<void>;
	addPlayer(player: IPlayer): Promise<void>;
	// join(): Promise<void>;
	start(eventTarget: EventTarget): Promise<void>;
}
