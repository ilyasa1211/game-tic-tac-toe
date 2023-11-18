interface GameModeOptions {
  COMPUTER: "COMPUTER";
  OFFLINE: "OFFLINE";
  ONLINE: "ONLINE";
}

interface IGameMode {
  gameModes: Set<IAction>;
  htmlElement: HTMLElement;
  game: IGame;
}

class GameMode implements IGameMode, IDrawable {
  public gameModes: Set<IAction>;

  public constructor(public game: IGame, public htmlElement: HTMLElement) {
    this.gameModes = new Set();
  }

  public addGameMode(action: IAction): void {
    this.gameModes.add(action);
  }

  public draw() {
    this.gameModes.forEach((action) => {
      const list = document.createElement("li");
      const anchor = document.createElement("a");

      anchor.textContent = action.label;
      anchor.href = "#game";

      list.appendChild(anchor);
      list.onclick = (evt: MouseEvent) => {
        evt.stopPropagation();

        if (this.game.status.isPlaying) {
          return;
        }

        this.game.status.isPlaying = true;
        this.game.action.setAction(action);
      };

      this.htmlElement.appendChild(list);
    });
  }
}
