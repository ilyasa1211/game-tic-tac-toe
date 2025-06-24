import type { IPlayer } from "../players/interface.ts";

export type ClickEventData = {
		event: MouseEvent;
		index: number;
		getCurrentPlayer(): Promise<IPlayer>;
}

export default class ClickEvent<
	T extends ClickEventData
> extends CustomEvent<T> {
	public constructor(data: T) {
		super("tile-click", { detail: data });
	}
}