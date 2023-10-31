type PlayerCharacter = "X" | "O";

interface IPlayer {
  name: string;
  character: PlayerCharacter;
}

class Player implements IPlayer {
  //   public id: string;

  public constructor(public name: string, public character: PlayerCharacter) {
    // this.id = Utils.generateUUID();
  }
}
