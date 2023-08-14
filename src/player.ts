class Player {
    private static _player: Record<string, PlayerCharacter> = {
        p1: "X",
        p2: "O",
    };
    public static count(): number {
        return Object.keys(this._player).length;
    }
    public static getPlayerByTurn(number: number): string {
        return Object.values(this._player)[number];
    }
}
