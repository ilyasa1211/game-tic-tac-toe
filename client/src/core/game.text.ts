interface IGameText {
  setText(message: string): void;
}

class GameText implements IDrawable {
  public constructor(
    public htmlElement: HTMLElement,
    private message: string = ""
  ) {}

  public setText(message: string): void {
    this.message = message;
  }

  public draw(): void {
    this.htmlElement.textContent = this.message;
  }
}
