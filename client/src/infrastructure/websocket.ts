import environment from "../config/environment.ts";
import { isUndefined } from "../validation.ts";

let ws: WebSocket | undefined;

export function getConnection(): WebSocket {
	if (isUndefined(ws)) {
		ws = new WebSocket(environment.SERVER_WEBSOCKET_URI);
		ws.addEventListener("open", (e) => console.info("Connection open!", e));
		ws.addEventListener("close", (e) => console.warn("Connection close!", e));
		ws.addEventListener("error", (e) => console.error("Connection error!", e));
	}

	return ws;
}

export function connect(game: IGame): WebSocket {
	if (isUndefined(ws)) {
		return;
	}

	ws.addEventListener("message", (message) => {
		if (!isGetPlayerData) {
			game.player.addPlayer(JSON.parse(message.data).player as IPlayer);
			isGetPlayerData = true;
		}

		const data = JSON.parse(message.data) as
			| {
					status: "play";
					position: number;
					player: PlayerCharacter;
			  }
			| {
					status: "game_over";
					message: string;
			  };

		if (data.status === "game_over") {
			throw new ResultMessage(data.message);
		}

		game.position.setPosition(data.position, data.player);
		game.refresh();
	});

	return ws;
}

export function close() {
	ws?.close();
}
