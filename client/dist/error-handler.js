"use strict";
function errorHandler(event, source, lineNumber, columnNumber, error) {
    var _a;
    if (error instanceof ResultMessage) {
        gameMode.textContent = error.message;
        return;
    }
    // if (error instanceof InformationalMessage) {
    alertContainer.classList.remove("hidden");
    alertMessage.textContent = (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "Error Occured!";
    // }
}
