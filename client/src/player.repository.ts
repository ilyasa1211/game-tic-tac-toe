abstract class PlayerInterface {
  public abstract getPlayerByTurn(turn: number): Player;
  public abstract getPlayerByName(
    namevt: string
  ): Player | Player[] | undefined;
  public abstract createPlayer(player: Player): void;
  public abstract count(): number;
}

class PlayerRepository implements PlayerInterface {
  public constructor(private players: Player[]) {}
  public getPlayerByTurn(turn: number): Player {
    return this.players[turn];
  }
  public getPlayerByName(name: string): Player | Player[] | undefined {
    return this.players.find((player: Player) => player.name === name);
  }
  public createPlayer(player: Player): void {
    this.players.push(player);
  }
  public count(): number {
    return this.players.length;
  }
}
