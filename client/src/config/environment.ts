export default {
	SERVER_HTTP_DOMAIN: "http://localhost:3000",
	SERVER_WEBSOCKET_URI: "ws://localhost:3000",

	tiles: document.getElementsByClassName(
		"tile",
	) as HTMLCollectionOf<HTMLDivElement>,
	gameBoard: document.getElementById("gameBoard")!,
	gameMode: document.getElementById("gameModeSelected")!,
	gameModeLists: document.getElementById("gameModeLists")!,
	alertMessage: document.getElementById(
		"alert-message",
	) as HTMLParagraphElement,

	alertContainer: document.getElementById("alert-container") as HTMLDivElement,
	alertButton: document.getElementById("alert-button") as HTMLButtonElement,
} as const;
