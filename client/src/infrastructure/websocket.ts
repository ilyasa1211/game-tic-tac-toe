import environment from "../config/environment.ts";
import { isUndefined } from "../validation.ts";

export default class WebsocketConnection {
  private static ws: WebSocket;

  public constructor() {
    if (isUndefined(WebsocketConnection.ws)) {
      const ws = new WebSocket(environment.SERVER_WEBSOCKET_URI);

      ws.addEventListener("open", (e) => console.info("Connection open!", e));
      ws.addEventListener("close", (e) => console.warn("Connection close!", e));
      ws.addEventListener("error", (e) => console.error("Connection error!", e));

      WebsocketConnection.ws = ws;
    }
  }

  public [Symbol.dispose]() {
    WebsocketConnection.ws.close();
  }
}