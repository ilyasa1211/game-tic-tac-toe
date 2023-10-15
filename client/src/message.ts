class Message {
    public static draw(): string {
        return "Draw!";
    }
    public static won(player: string): string {
        return "Player " + player.toLocaleUpperCase() + " win!";
    }
}
