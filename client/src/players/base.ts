import type { RefObject } from "preact";
import type { IPlayer, IPlayerCharacter } from "./interface.ts";
import type { GameOverStatus } from "../modes/enums.ts";

export default abstract class BasePlayer implements IPlayer {
	public id: string;
	private name: string;
	public character: IPlayerCharacter | undefined;

	protected gameEvent;

	public constructor(name: string, gameEvent: EventTarget) {
		this.id = crypto.randomUUID();
		this.name = name;
		this.gameEvent = gameEvent;
		// this.character = character;
	}

	public getName(): Promise<string> {
		return Promise.resolve(this.name);
	}

	public async setCharacter(char: IPlayerCharacter): Promise<void> {
		this.character = char;
	}

	public getCharacter(): Promise<IPlayerCharacter> {
		if (!this.character) {
			throw new Error('character undefined, please set the character');
		}

		return Promise.resolve(this.character as IPlayerCharacter);
	}

	public abstract setup(
		acquireTurn: () => Promise<void>, 
		takePosition: (position: number, character: IPlayerCharacter) => Promise<void>,
		getGameOverStatus: () => Promise<typeof GameOverStatus[keyof typeof GameOverStatus]>
	): Promise<void>;
	public abstract setReady(availablePositions: number[], tiles: RefObject<HTMLElement>[]): Promise<void>;
}
