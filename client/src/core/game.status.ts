interface IGameStatus {
  isPlaying: boolean;
  isThinking: boolean;
  isOnline(): boolean;
}

class GameStatus implements IGameStatus {
  public isPlaying: boolean = false;
  public isThinking: boolean = false;

  public isOnline(): boolean {
    return window.navigator.onLine;
  }
}
