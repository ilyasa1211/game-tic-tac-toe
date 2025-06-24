import type { IGameMode } from "./interfaces.ts";

export default class OnlineGame implements IGameMode {}

interface OnlineActionRequest {
	position: number;
	player: PlayerCharacter;
}

type IActionVsOnline = {};

class ActionVSOnline implements IAction, IActionVsOnline {
	public label: string = "2 Player (Online)";

	public execute(evt: MouseEvent, index: number, game: IGame): void {
		evt.stopPropagation();

		if (!game.status.isOnline()) {
			return;
		}
		const ws = Online.connect(game);

		if (!Online.isConnectionEstablished) {
			return;
		}

		const data: OnlineActionRequest = {
			position: index,
			player: game.getCurrentPlayer().character,
		};

		ws.send(JSON.stringify(data));
	}
}
