class ResultMessage extends Error {}
class InformationalMessage extends Error {}
class ErrorMessage extends Error {}


class GameMessage {
  public static GAME_DRAW = "Draw!";

  public static GAME_WON(PlayerCharacter: string): string {
    return "Player " + PlayerCharacter.toLocaleUpperCase() + " win!";
  }
}
