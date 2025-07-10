import environment from "../config/environment.ts";
import { isUndefined } from "../validation.ts";

let ws: WebSocket | undefined;

export function getConnection(): WebSocket {
  if (isUndefined(ws)) {
    ws = new WebSocket(environment.SERVER_WEBSOCKET_URI);

    ws.addEventListener("open", (e) => console.info("Connection open!", e));
    ws.addEventListener("close", (e) => console.warn("Connection close!", e));
    ws.addEventListener("error", (e) => console.error("Connection error!", e));
  }

  return ws;
}

export function closeConnection() {
  ws?.close();
}
