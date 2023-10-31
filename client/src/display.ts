interface IDrawable {
  htmlElement: HTMLElement;
  draw(): void;
}

interface IRefreshable {
  refresh(): void;
}

interface IDisplay {
  render(...drawables: IDrawable[]): void;
  refresh(...refreshables: IRefreshable[]): void;
}

class Display implements IDisplay {
  public render(...drawables: IDrawable[]): void {
    drawables.forEach((drawable) => drawable.draw());
  }
  public refresh(...refreshables: IRefreshable[]) {
    refreshables.forEach((refreshable) => refreshable.refresh());
  }
}
