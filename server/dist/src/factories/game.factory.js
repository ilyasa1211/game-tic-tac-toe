"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const game_core_1 = __importDefault(require("../core/game.core"));
const game_player_1 = require("../core/game.player");
const game_position_1 = __importDefault(require("../core/game.position"));
const game_result_1 = __importDefault(require("../core/game.result"));
const player_repository_1 = __importDefault(require("../repositories/player.repository"));
class GameFactory {
    static create(boardSize = 3) {
        const playerRepository = new player_repository_1.default();
        const gamePosition = new game_position_1.default(boardSize);
        const gamePlayer = new game_player_1.GamePlayer(playerRepository);
        const gameResult = new game_result_1.default(gamePosition);
        return new game_core_1.default(boardSize, gameResult, gamePlayer, gamePosition);
    }
}
exports.default = GameFactory;
