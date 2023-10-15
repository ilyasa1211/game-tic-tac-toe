abstract class Drawable {
  public constructor(public htmlElement: HTMLElement){};
  public abstract draw(): void;
}

abstract class Refreshable {
  public abstract refresh(): void;
}

class Display {
  public constructor(...drawables: Drawable[]) {
    drawables.forEach(drawable => drawable.draw());
  }

  public refresh(...refreshables: Refreshable[]) {
    refreshables.forEach(refreshable => {
        refreshable.refresh();
    });
  }


}