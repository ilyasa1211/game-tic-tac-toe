"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    static generateRandomString() {
        return Math.random().toString(36).substring(7);
    }
    static createIndexArray(size) {
        return new Array(size).fill(null).map((_value, index) => index);
    }
}
exports.default = Utils;
