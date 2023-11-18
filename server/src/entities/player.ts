export type PlayerCharacter = "X" | "O";

export interface IPlayer {
  name: string;
  character: PlayerCharacter;
}

export default class Player implements IPlayer {
  //   public id: string;

  public constructor(public name: string, public character: PlayerCharacter) {
    // this.id = Utils.generateUUID();
  }
}
