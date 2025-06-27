import Player from "../players/player.ts";
import type { IGameMode } from "./interfaces.ts";
import { OfflineMode } from "./base.ts";
import type { GameResultEventWin } from "../events/game-result.ts";

export default class PlayerGame extends OfflineMode implements IGameMode {
	public async setup(): Promise<void> {
		this.gameEvent.addEventListener("result-win", async (e) => {
			const event = e as GameResultEventWin;

			const player = event.detail;

			const character = await player.getCharacter();
			 
			alert(`Player ${character} win!`);
		});

		const player1 = new Player('player1', this.gameEvent);
		player1.setCharacter("O");

		const player2 = new Player('player2', this.gameEvent);
		player2.setCharacter("X");

		this.room.addPlayer(player1);
		this.room.addPlayer(player2);
	}
}
