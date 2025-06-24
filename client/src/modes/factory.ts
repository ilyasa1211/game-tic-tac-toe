import BotGame from "./bot.mode.ts";
import { modes } from "./enums.ts";
import OnlineGame from "./online.mode.ts";
import PlayerGame from "./player.mode.ts";
import type { MutableRef } from "preact/hooks";

export function CreateMode(mode: (typeof modes)[keyof typeof modes], tiles: MutableRef<HTMLElement | null>[], gameEvent: EventTarget) {
	switch (mode) {
		case modes.OFFLINE_BOT:
			return new BotGame(tiles, gameEvent);
		case modes.OFFLINE_PLAYER:
			return new PlayerGame(tiles, gameEvent);
		case modes.ONLINE_PLAYER:
			return new OnlineGame(tiles, gameEvent);
		default:
			throw new Error("failed to create game mode");
	}
}
