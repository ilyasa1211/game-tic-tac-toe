export default class RoomFullEvent<T> extends CustomEvent<T> {
  public static readonly name = "room-full";
  public constructor() {
    super(RoomFullEvent.name);
  }
}
