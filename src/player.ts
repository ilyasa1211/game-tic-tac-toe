class Player {
    private _player: Record<string, PlayerCharacter> = {
        p1: "X",
        p2: "O",
    };
    public count(): number {
        return Object.keys(this._player).length;
    }
    public getPlayerByTurn(number: number): string {
        return Object.values(this._player)[number];
    }
}
