interface IGameResult {
	gamePosition: IGamePosition;
	isWin(): boolean;
	isDraw(): boolean;
	isGameOver(): boolean;
}

class GameResult implements IGameResult {
	public _isGameOver: boolean = false;

	public constructor(public gamePosition: IGamePosition) {}

	public isWin(): boolean {
		this.gamePosition.winPositions.forEach((position: number[]) => {
			const firstTile =
				this.gamePosition.position[
					position[1 + this.gamePosition.winPositionsOffset] +
						this.gamePosition.winPositionsOffset
				];
			const secondTile =
				this.gamePosition.position[
					position[2 + this.gamePosition.winPositionsOffset] +
						this.gamePosition.winPositionsOffset
				];
			const thirdTile =
				this.gamePosition.position[
					position[3 + this.gamePosition.winPositionsOffset] +
						this.gamePosition.winPositionsOffset
				];
			const isValid: boolean = typeof firstTile !== "undefined";
			const isMatch1: boolean = firstTile === secondTile;
			const isMatch2: boolean = secondTile === thirdTile;
			if (isValid && isMatch1 && isMatch2) {
				this._isGameOver = true;
			}
		});
		return this._isGameOver;
	}
	public isDraw(): boolean {
		const isFull = this.gamePosition.position.every(
			(pos) => typeof pos !== "undefined",
		);

		return isFull;
	}

	public isGameOver(): boolean {
		console.log("isdraw" + this.isDraw());
		console.log("iswin" + this.isWin());

		return this.isWin() || this.isDraw();
	}
}
