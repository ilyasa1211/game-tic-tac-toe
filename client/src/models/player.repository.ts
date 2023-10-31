class PlayerRepository implements PlayerInterface {
  public constructor(private players: Player[] = []) {}

  public getPlayerByTurn(turn: number): IPlayer {
    return this.players[turn];
  }
  public getPlayerByName(name: string): IPlayer | IPlayer[] | undefined {
    return this.players.find((player: Player) => player.name === name);
  }
  public createPlayer(player: Player): void {
    this.players.push(player);
  }
  public count(): number {
    return this.players.length;
  }
}
