import type { RefObject } from "preact";
import type { ClickEventData } from "../events/click.ts";
import { isOccupied } from "../utils/common.ts";
import BasePlayer from "./base.ts";
import type { IPlayer, IPlayerCharacter } from "./interface.ts";

export default class Player extends BasePlayer implements IPlayer {
	public async setup(acquireTurn: () => Promise<void>, takePosition: (position: number, character: IPlayerCharacter) => Promise<void>): Promise<void> {
		this.gameEvent.addEventListener("tile-click", async (e: Event) => {
			const evt = e as CustomEvent<ClickEventData>;

			const { event, getCurrentPlayer, index } = evt.detail; 
			const target = event.target as HTMLElement;

			const currPlayer = await getCurrentPlayer();

			if (!event.isTrusted || currPlayer !== this || isOccupied(target)) {
				return;
			}

			const character = await this.getCharacter();

			await takePosition(index, character);
			await acquireTurn();
		});
	}

	public async setReady(availablePositions: number[], tiles: RefObject<HTMLElement>[]): Promise<void> {
		return;	
	}

	// public execute(evt: MouseEvent, index: number, game: IGame): void {
	// 	if (game.result.isGameOver()) {
	// 		return;
	// 	}

	// 	if (!game.position.isAvailable(index)) {
	// 		return;
	// 	}

	// 	const player = game.getCurrentPlayer();

	// 	game.position.setPosition(index, player.character);

	// 	game.refresh();

	// 	if (game.result.isGameOver()) {
	// 		throw new GameOver(game);
	// 	}

	// 	game.turn();
	// }
}
