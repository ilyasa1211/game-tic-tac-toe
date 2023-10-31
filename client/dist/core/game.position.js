"use strict";
class GamePosition {
    constructor(boardSize) {
        this.position = [];
        this.winPositions = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            [1, 5, 9],
            [3, 5, 7],
        ];
        this.winPositionsOffset = -1;
        const boardDimension = 2;
        this.position = new Array(boardSize ** boardDimension).fill(undefined);
        this.availablePosition = Utils.createIndexArray(boardSize ** boardDimension);
    }
    setPosition(position, character) {
        this.position[position] = character;
        this.takeAvailablePosition(position);
    }
    getAvailablePosition() {
        return this.availablePosition;
    }
    isAvailable(position) {
        return this.position[position] == null;
    }
    takeAvailablePosition(index) {
        const takeCount = 1;
        const position = this.availablePosition.indexOf(index);
        this.availablePosition.splice(position, takeCount);
    }
    getWinStraightPosition() {
        const resultIndex = [];
        this.winPositions.forEach((position) => {
            const firstIndex = 1 + this.winPositionsOffset;
            const firstTile = this.position[position[firstIndex] + this.winPositionsOffset];
            const secondTile = this.position[position[firstIndex + 1] + this.winPositionsOffset];
            const thirdTile = this.position[position[firstIndex + 2] + this.winPositionsOffset];
            const isValid = typeof firstTile !== "undefined";
            const isMatch1 = firstTile === secondTile;
            const isMatch2 = secondTile === thirdTile;
            if (isValid && isMatch1 && isMatch2) {
                resultIndex.push([firstIndex, firstIndex + 1, firstIndex + 3]);
            }
        });
        return resultIndex;
    }
}
