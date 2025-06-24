import type { IPlayer } from "../players/interface";

export interface IRoom {
	addPlayer(player: IPlayer): void;
	getPlayers(): Promise<IPlayer[]>;
	getPlayerCount(): Promise<number>;
}
