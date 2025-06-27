import BotGame from "./bot.mode.ts";
import { Mode } from "./enums.ts";
import OnlineGame from "./online.mode.ts";
import PlayerGame from "./player.mode.ts";
import type { MutableRef } from "preact/hooks";

export function CreateMode(mode: (typeof Mode)[keyof typeof Mode], tiles: MutableRef<HTMLElement | null>[], gameEvent: EventTarget) {
	switch (mode) {
		case Mode.OFFLINE_BOT:
			return new BotGame(tiles, gameEvent);
		case Mode.OFFLINE_PLAYER:
			return new PlayerGame(tiles, gameEvent);
		case Mode.ONLINE_PLAYER:
			return new OnlineGame(tiles, gameEvent);
		default:
			throw new Error("failed to create game mode");
	}
}
