"use strict";
class Utils {
    static SimulateThinking(callback, thinkingkAverageMilisecond = 1000) {
        const offset = thinkingkAverageMilisecond / 5;
        const quartile1 = thinkingkAverageMilisecond - offset;
        const quartile3 = thinkingkAverageMilisecond + offset;
        setTimeout(() => callback(), this.getRandomIntBetween(quartile1, quartile3));
    }
    static getRandomIntBetween(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    static showAlert(message) {
        alertMessage.textContent = message;
        alertContainer.classList.remove("hidden");
    }
    static createIndexArray(size) {
        return new Array(size).fill(null).map((_, index) => index);
    }
    static shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }
}
