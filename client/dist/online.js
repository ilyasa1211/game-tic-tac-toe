"use strict";
class Online {
    static getConnection() {
        if (this.ws instanceof WebSocket) {
            return this.ws;
        }
        return new WebSocket(SERVER_WEBSOCKET_DOMAIN);
    }
    static connect(game) {
        if (this.isCalled) {
            return this.ws;
        }
        this.isCalled = true;
        this.ws = this.getConnection();
        this.ws.onopen = (e) => {
            console.log("Connection Open!");
            this.isConnectionEstablished = true;
        };
        this.ws.onclose = (e) => {
            console.log("Connection Closed!");
        };
        this.ws.onerror = (e) => {
            throw new Error("WS Error detected!");
        };
        this.ws.onmessage = (message) => {
            if (!this.isGetPlayerData) {
                game.player.addPlayer(JSON.parse(message.data).player);
                this.isGetPlayerData = true;
            }
            const data = JSON.parse(message.data);
            console.log(data);
            if (data.status == "game_over") {
                this.close();
                throw new ResultMessage(data.message);
            }
            game.position.setPosition(data.position, data.player);
            // game.turn();
            game.refresh();
        };
        return this.ws;
    }
    static close() {
        var _a;
        (_a = this.ws) === null || _a === void 0 ? void 0 : _a.close();
        this.ws = null;
        this.isCalled = false;
    }
}
Online.isCalled = false;
Online.isGetPlayerData = false;
Online.isConnectionEstablished = false;
