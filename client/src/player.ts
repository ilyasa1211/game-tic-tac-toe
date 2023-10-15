type PlayerCharacter = "X" | "O";

class Player {
  //   public id: string;

  public constructor(public name: string, public character: PlayerCharacter) {
    // this.id = Utils.generateUUID();
  }
}
