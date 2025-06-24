import type { RefObject } from "preact";
import type setting from "../config/settings";

export type IPlayerCharacter = (typeof setting.PLAYER_CHARACTERS)[number];

export interface IPlayer {
	id: string;
	name: string;
	setReady(availablePositions: number[], tiles: RefObject<HTMLElement>[]): Promise<void>;
	setup(acquireTurn: () => Promise<void>, takePosition: (position: number, character: IPlayerCharacter) => Promise<void>): Promise<void>;
	getCharacter(): Promise<IPlayerCharacter | undefined>;
	setCharacter(char: IPlayerCharacter): Promise<void>;
}
