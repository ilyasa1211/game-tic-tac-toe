class GamePosition implements IGamePosition {
	public constructor(boardSize: number) {
		const boardDimension = 2;
		this.position = new Array(boardSize ** boardDimension).fill(undefined);
		this.availablePosition = Utils.createIndexArray(
			boardSize ** boardDimension,
		);
	}

	// public getWinStraightPosition(): Array<number[]> {
	//   const resultIndex: Array<number[]> = [];

	//   this.winPositions.forEach((position: number[]) => {
	//     const firstIndex = 1 + this.winPositionsOffset;

	//     const firstTile =
	//       this.position[position[firstIndex] + this.winPositionsOffset];
	//     const secondTile =
	//       this.position[position[firstIndex + 1] + this.winPositionsOffset];
	//     const thirdTile =
	//       this.position[position[firstIndex + 2] + this.winPositionsOffset];

	//     const isValid: boolean = typeof firstTile !== "undefined";
	//     const isMatch1: boolean = firstTile === secondTile;
	//     const isMatch2: boolean = secondTile === thirdTile;

	//     if (isValid && isMatch1 && isMatch2) {
	//       resultIndex.push([firstIndex, firstIndex + 1, firstIndex + 3]);
	//     }
	//   });

	//   return resultIndex;
	// }
}
