"use strict";
function errorHandler(event, source, lineNumber, columnNumber, error) {
    if (error instanceof ResultMessage) {
        gameMode.textContent = error.message;
    }
    if (error instanceof InformationalMessage) {
        alertContainer.classList.remove("hidden");
        alertMessage.textContent = error.message;
    }
}
