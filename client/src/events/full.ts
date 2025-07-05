export default class RoomFullEvent<T> extends CustomEvent<T> {
  public constructor() {
    super("room-full");
  }
}
