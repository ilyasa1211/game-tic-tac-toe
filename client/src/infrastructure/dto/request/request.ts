export default interface WebsocketRequest<E extends string, T> {
  event: E,
  data: T
}