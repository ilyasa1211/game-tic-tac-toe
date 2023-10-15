class GameModeOptions {
  public readonly COMPUTER = "COMPUTER";
  public readonly OFFLINE = "OFFLINE";
  public readonly ONLINE = "ONLINE";
}

class GameMode extends Drawable {
  public constructor(htmlElement: HTMLElement) {
    super(htmlElement);
  }

  public gameModeLabel: Record<keyof GameModeOptions, string> = {
    COMPUTER: "1 Player (Computer)",
    OFFLINE: "2 Player (Offline)",
    ONLINE: "2 Player (Online)",
  };

  public draw() {
    const labels = Object.keys(this.gameModeLabel) as (keyof GameModeOptions)[];

    labels.forEach((label: keyof GameModeOptions, index: number) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      li.dataset.mode = label;
      li.onclick = (evt: MouseEvent) => this.game.action(evt, index);
      a.textContent = this.gameModeLabel[label];
      a.href = "#main";
      li.appendChild(a);
      gameModeListContainer!.appendChild(li);
    });
  }

  private chooseMode(evt: MouseEvent, game: Game): void {
    evt.stopPropagation();

    
    const childTarget = evt.target as HTMLAnchorElement;
    const liTarget = childTarget.parentElement as HTMLLIElement;
    const mode = liTarget.dataset.mode as keyof GameModeOptions;

    game.isPlaying(true);
    game.currentMode(mode);
    info.textContent = childTarget.textContent;
  }
}
