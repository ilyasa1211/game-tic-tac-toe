import type { RefObject } from "preact";
import type { IPlayer, IPlayerCharacter } from "../players/interface.ts";
import Player from "../players/player.ts";
import BasicRoom from "../room/basic.ts";
import type { IRoom } from "../room/interface.ts";
import type { IGameMode } from "./interfaces.ts";
import settings from "../config/settings.ts";

export default class PlayerGame implements IGameMode {
	private room: IRoom;
	private tiles;
	private turn: number = 0;
	private positions: (IPlayerCharacter | null)[] = []

	public constructor(tiles: RefObject<HTMLElement>[], gameEvent: EventTarget) {
		this.room = new BasicRoom();
		this.tiles = tiles;

		const player1 = new Player('player1', gameEvent);
		player1.setCharacter("O");

		const player2 = new Player('player2', gameEvent);
		player2.setCharacter("X");

		this.room.addPlayer(player1);
		this.room.addPlayer(player2);
		this.positions = Array.from({ length: settings.TILE_SIZE ** 2 });
	}

	public addPlayer(player: IPlayer): Promise<void> {
		return Promise.resolve(this.room.addPlayer(player));
	}

	public async acquireTurn(): Promise<void> {
		this.turn = await this.getNextTurn();

		const currPlayer = await this.getCurrentPlayer();
		await currPlayer.setReady(await this.getAvailablePositions(), this.tiles);
	}

	private async getNextTurn(): Promise<number> {
		const turn = this.turn + 1;

		return turn % await this.room.getPlayerCount();
	}

	public async getAvailablePositions(): Promise<number[]> {
		const positions = await this.getPositions();
		const availablePos = (await Promise.all(positions.map(async (character, index) => {
			return typeof character === "undefined" ? index : null;
		}))).filter(v => v !== null);

		return availablePos;
	}

	public async getCurrentPlayer(): Promise<IPlayer> {
		return (await this.room.getPlayers())[this.turn];
	}

	public async getPositions(): Promise<(("X" | "O") | null)[]> {
		return this.positions;	
	}

	public async start(): Promise<void> {
		await this.allPlayerPrepare();

		const currentPlayer = await this.getCurrentPlayer() as IPlayer;

		currentPlayer.setReady(await this.getAvailablePositions(), this.tiles);
	}

	private async takePosition(position: number, character: IPlayerCharacter) {
		this.tiles[position].current!.innerText = character;
		this.positions[position] = character;
	}

	private async allPlayerPrepare(): Promise<void> {
		for (const player of await this.room.getPlayers()) {
			await player.setup(this.acquireTurn.bind(this), this.takePosition.bind(this));
		}
	}
}
