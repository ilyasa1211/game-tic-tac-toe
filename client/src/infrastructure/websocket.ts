import environment from "../config/environment.ts";
import { isUndefined } from "../old/validation.ts";

let ws: WebSocket | undefined;

export function getConnection(): WebSocket {
	if (isUndefined(ws)) {
		ws = new WebSocket(environment.SERVER_WEBSOCKET_URI);

		ws.onopen = (e) => {
			console.log("Connection Open!");
		};

		ws.onclose = (e) => {
			console.log("Connection Closed!");
		};

		ws.onerror = (e) => {
			throw new Error("WS Error detected!");
		};
	}

	return ws;
}

export function connect(game: IGame): WebSocket {
	if (isUndefined(ws)) {
		return;
	}

	ws.onmessage = (message) => {
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
	};

	return ws;
}

export function close() {
	ws?.close();
}
