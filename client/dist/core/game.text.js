"use strict";
class GameText {
    constructor(htmlElement, message = "") {
        this.htmlElement = htmlElement;
        this.message = message;
    }
    setText(message) {
        this.message = message;
    }
    draw() {
        this.htmlElement.textContent = this.message;
    }
}
