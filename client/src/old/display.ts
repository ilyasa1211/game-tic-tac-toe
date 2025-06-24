export interface IDrawable {
	htmlElement: HTMLElement;
	draw(): void;
}

export interface IRefreshable {
	refresh(): void;
}

export interface IDisplay {
	render(...drawables: IDrawable[]): void;
	refresh(...refreshables: IRefreshable[]): void;
}

export default class Display implements IDisplay {
	public render(...drawables: IDrawable[]): void {
		drawables.forEach((drawable) => drawable.draw());
	}
	public refresh(...refreshables: IRefreshable[]) {
		refreshables.forEach((refreshable) => refreshable.refresh());
	}
}
