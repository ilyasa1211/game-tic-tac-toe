import Game from "./game";
import { PlayerCharacter } from "./player";

export default class Validator {
  public constructor(private game: Game) {}
  public validatePlayer(player: PlayerCharacter): boolean {
    return this.game.getCurrentPlayer() === player;
  }
  public validatePosition(position: number): boolean {
    return this.game._availablePosition[position] == null;
  }
}
