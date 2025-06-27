import type { RefObject } from "preact";
import type { ClickEventData } from "../events/click.ts";
import { getRandomIntBetween, isOccupied, shuffleArray } from "../utils/common.ts";
import BasePlayer from "./base.ts";
import type { IPlayer, IPlayerCharacter } from "./interface.ts";
import { GameOverStatus } from "../modes/enums.ts";

export default class Bot extends BasePlayer implements IPlayer {
	public async setup(
		acquireTurn: () => Promise<void>, 
		takePosition: (position: number, character: IPlayerCharacter) => Promise<void>,
		getGameOverStatus: () => Promise<typeof GameOverStatus[keyof typeof GameOverStatus]>
	): Promise<void> {
		this.gameEvent.addEventListener("tile-click", async (e: Event) => {
			if (await getGameOverStatus() !== GameOverStatus.NONE) {
				return e.preventDefault();
			}

			const evt = e as CustomEvent<ClickEventData>;

			const { event, getCurrentPlayer, index } = evt.detail;

			const currPlayer = await getCurrentPlayer();

			// validate
			if (event.isTrusted || currPlayer !== this || isOccupied(event.target as HTMLElement)) {
				return;
			}

			const character = await this.getCharacter();

			await takePosition(index, character);
			await acquireTurn();
		});
	}

	public async setReady(availablePositions: number[], tiles: RefObject<HTMLElement>[]): Promise<void> {
		this.simulateThinking(async () => {
			const computerChoose = shuffleArray(
				availablePositions,
			)[0];
			tiles.at(computerChoose)!.current!.click();
		});
	}

	private async simulateThinking<T>(
		callback: () => T | Promise<T>,
		thinkingAverageMilliseconds: number = 1000,
	): Promise<T> {
		const offset = thinkingAverageMilliseconds / 5;
		const minDelay = thinkingAverageMilliseconds - offset;
		const maxDelay = thinkingAverageMilliseconds + offset;
		const delay = getRandomIntBetween(minDelay, maxDelay);

		return new Promise((resolve) => {
			setTimeout(async () => {
				const result = await callback();
				resolve(result);
			}, delay);
		});
	}
}
