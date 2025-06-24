export class ResultMessage extends Error {}
export class InformationalMessage extends Error {}
export class ErrorMessage extends Error {}

// class GameMessage {
//   public static GAME_DRAW = "Draw!";

//   public static GAME_WON(PlayerCharacter: string): string {
//     return "Player " + PlayerCharacter.toLocaleUpperCase() + " win!";
//   }
// }
// class GameOver extends ResultMessage {
//   public constructor(game: IGame) {
//     super();
//     if (game.result.isDraw()) {
//       this.message = GameMessage.GAME_DRAW;
//     }
//     if (game.result.isWin()) {
//       const winningPlayer = game.getCurrentPlayer().character;
//       this.message = GameMessage.GAME_WON(winningPlayer);
//     }
//   }
// }
