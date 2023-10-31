const SERVER_HTTP_DOMAIN = "http://localhost:3000";
const SERVER_WEBSOCKET_DOMAIN = "ws://localhost:3000";
const GAME_SIZE = 3;

var tiles = document.getElementsByClassName(
  "tile"
) as HTMLCollectionOf<HTMLDivElement>;

var gameBoard = document.getElementById("gameBoard")!;
var gameMode = document.getElementById("gameModeSelected")!;
var gameModeLists = document.getElementById("gameModeLists")!;
var alertMessage = document.getElementById(
  "alert-message"
) as HTMLParagraphElement;

var alertContainer = document.getElementById(
  "alert-container"
) as HTMLDivElement;

var alertButton = document.getElementById("alert-button") as HTMLButtonElement;
