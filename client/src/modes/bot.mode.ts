import type { RefObject } from "preact";
import settings from "../config/settings.ts";
import Bot from "../players/bot.ts";
import type { IPlayer, IPlayerCharacter } from "../players/interface.ts";
import Player from "../players/player.ts";
import BasicRoom from "../room/basic.ts";
import type { IRoom } from "../room/interface.ts";
import { getRandomIntBetween } from "../utils/common.ts";
import type { IGameMode } from "./interfaces.ts";

export default class BotGame implements IGameMode {
	private room: IRoom;
	private turn: number = 0;
	private positions: (IPlayerCharacter | null)[] = []
	private tiles;
	private gameEvent;

	public constructor(tiles: RefObject<HTMLElement>[], gameEvent: EventTarget,) {
		this.room = new BasicRoom();
		this.tiles = tiles;
		this.gameEvent = gameEvent;

		this.addPlayer(new Bot('bot', gameEvent));
		this.addPlayer(new Player("player", this.gameEvent));

		this.shuffleTurn();
		this.assignEachPlayerRandomCharacter();
		this.positions = Array.from({ length: settings.TILE_SIZE ** 2 });
	}

	public async getPositions() {
		return this.positions;
	}

	public async getAvailablePositions(): Promise<number[]> {
		const positions = await this.getPositions();
		const availablePos = (await Promise.all(positions.map(async (character, index) => {
			return typeof character === "undefined" ? index : null;
		}))).filter(v => v !== null);

		return availablePos;
	}

	public addPlayer(player: IPlayer): Promise<void> {
		return Promise.resolve(this.room.addPlayer(player));
	}

	public async start(): Promise<void> {
		await this.allPlayerPrepare();

		const currentPlayer = await this.getCurrentPlayer() as IPlayer;

		currentPlayer.setReady(await this.getAvailablePositions(), this.tiles);
	}

	private async allPlayerPrepare(): Promise<void> {
		for (const player of await this.getAllPlayers()) {
			await player.setup(this.acquireTurn.bind(this), this.takePosition.bind(this));
		}
	}

	public async getAllPlayers(): Promise<IPlayer[]> {
		return await this.room.getPlayers();
	}

	public async getCurrentPlayer(): Promise<IPlayer> {
		return (await this.room.getPlayers())[this.turn];
	}

	private async takePosition(position: number, character: IPlayerCharacter) {
		this.tiles[position].current!.innerText = character;
		this.positions[position] = character;
	}

	/**
	 * this is used when a player take their turn successfuly
	 */
	public async acquireTurn(): Promise<void> {
		this.turn = await this.getNextTurn();

		const currPlayer = await this.getCurrentPlayer();
		await currPlayer.setReady(await this.getAvailablePositions(), this.tiles);
	}

	private async getNextTurn(): Promise<number> {
		const turn = this.turn + 1;

		return turn % await this.room.getPlayerCount();
	}

	private async shuffleTurn() {
		this.turn = getRandomIntBetween(0, await this.room.getPlayerCount() - 1);
	}

	// private async getNextPlayer() {
	// 	const nextTurn = await this.getNextTurn();

	// 	return (await this.getAllPlayers())[nextTurn];
	// }

	private async assignEachPlayerRandomCharacter() {
		const availableChars = [...settings.PLAYER_CHARACTERS];

		for (const player of (await this.getAllPlayers())) {
			const index = getRandomIntBetween(0, availableChars.length - 1);
			const char = availableChars.splice(index, 1).at(0);

			player.setCharacter(char!);
		}
	}
}
