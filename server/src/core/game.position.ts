import { PlayerCharacter } from "../entities/player";
import Utils from "../utils";

export interface IGamePosition {
  position: Array<PlayerCharacter | undefined>;
  // availablePosition: number[];
  winPositionsOffset: number;
  winPositions: Array<number[]>;
  setPosition(position: number, character: PlayerCharacter): void;
  // getAvailablePosition(): number[];
  isAvailable(position: number): boolean;
  getWinStraightPosition(): Array<number[]>;
}

export default class GamePosition implements IGamePosition {
  public position: Array<PlayerCharacter | undefined> = [];
  // public availablePosition: number[];
  public winPositions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];
  public winPositionsOffset = -1;

  public constructor(boardSize: number) {
    const boardDimension = 2;
    this.position = new Array(boardSize ** boardDimension).fill(undefined);
    // this.availablePosition = Utils.createIndexArray(
    //   boardSize ** boardDimension
    // );
  }

  public setPosition(position: number, character: PlayerCharacter): void {
    this.position[position] = character;
    // this.takeAvailablePosition(position);
  }
  // public getAvailablePosition(): number[] {
  //   return this.availablePosition;
  // }
  public isAvailable(position: number): boolean {
    return this.position[position] == null;
  }
  // private takeAvailablePosition(index: number): void {
  //   const takeCount = 1;
  //   const position = this.availablePosition!.indexOf(index);
  //   this.availablePosition.splice(position, takeCount);
  // }

  public getWinStraightPosition(): Array<number[]> {
    const resultIndex: Array<number[]> = [];

    this.winPositions.forEach((position: number[]) => {
      const firstIndex = 1 + this.winPositionsOffset;

      const firstTile =
        this.position[position[firstIndex] + this.winPositionsOffset];
      const secondTile =
        this.position[position[firstIndex + 1] + this.winPositionsOffset];
      const thirdTile =
        this.position[position[firstIndex + 2] + this.winPositionsOffset];

      const isValid: boolean = typeof firstTile !== "undefined";
      const isMatch1: boolean = firstTile === secondTile;
      const isMatch2: boolean = secondTile === thirdTile;

      if (isValid && isMatch1 && isMatch2) {
        resultIndex.push([firstIndex, firstIndex + 1, firstIndex + 3]);
      }
    });

    return resultIndex;
  }
}
