const SIZE = 3;

var div = document.getElementsByClassName("tile") as HTMLCollectionOf<HTMLDivElement>;
var section = document.getElementsByTagName("section")[0];
var info = document.getElementsByTagName("h1")[1];
var gameModeListContainer = document.getElementsByTagName("ul")[0];
var alertMessage = document.getElementById("alert-message") as HTMLParagraphElement;
var alertContainer = document.getElementById("alert-container") as HTMLDivElement;
var alertButton = document.getElementById("alert-button") as HTMLButtonElement;

section.style.setProperty("--SIZE", String(SIZE));

type PlayerCharacter = "X" | "O";