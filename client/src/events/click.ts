import type { IPlayer } from "../players/interface.ts";

export type ClickEventData = {
  event: Event;
  index: number;
  getCurrentPlayer(): Promise<IPlayer>;
};

export default class ClickEvent<
  T extends ClickEventData,
> extends CustomEvent<T> {
  public static readonly name = "tile-click";

  public constructor(data: T) {
    super(ClickEvent.name, { detail: data });
  }
}
