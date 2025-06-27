export const Mode = {
	OFFLINE_BOT: 1,
	OFFLINE_PLAYER: 2,
	ONLINE_PLAYER: 3,
} as const;

export const GameOverStatus = {
	NONE: 0,
	DRAW: 1,
	WIN: 2,
} as const;