class Online {
  private static ws: WebSocket | undefined | null;
  private static isCalled = false;
  private static isGetPlayerData = false;
  public static isConnectionEstablished: boolean = false;

  public static getConnection(): WebSocket {
    if (this.ws instanceof WebSocket) {
        return this.ws;
    }
    return new WebSocket(SERVER_WEBSOCKET_DOMAIN);
  }

  public static connect(game: IGame): WebSocket {
    if (this.isCalled) {
      return this.ws!;
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
        game.player.addPlayer(JSON.parse(message.data).player as IPlayer);
        this.isGetPlayerData = true;
      }
      const data = JSON.parse(message.data) as {
        position: number;
        player: PlayerCharacter;
      };
      console.log(data);

      game.position.setPosition(data.position, data.player);
      // game.turn();
      game.refresh();
    };

    return this.ws;
  }

  public static close() {
    this.ws?.close();
    this.ws = null;
    this.isCalled = false;
  }
}
