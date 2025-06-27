import { useEffect, useRef, useState } from "preact/hooks";
import "./app.css";
import GameContainer from "./game.tsx";
import { Mode } from "./modes/enums.ts";
import { entry } from "./states.ts";
import ClickEvent from "./events/click.ts";
import settings from "./config/settings.ts";
import type { GameResultEventWin } from "./events/game-result.ts";
import Player from "./players/player.ts";

export function App() {
	const [gameState, setGameState] = useState<
		(typeof entry)[keyof typeof entry]
	>(entry.IN_MENU);
	const [isPrepare, setIsPrepare] = useState<boolean>(false);
	const [game, setGame] = useState<GameContainer | null>(null);

	const size = settings.TILE_SIZE ** 2;
	const tileRefs = Array.from({ length: size }, () => useRef<HTMLDivElement>(null));
	const gamemodes = [
		{
			name: "Bot",
			mode: Mode.OFFLINE_BOT,
			backgrounColor: "bg-indigo-500"
		},
		{
			name: "Player",
			mode: Mode.OFFLINE_PLAYER,
			backgrounColor: "bg-emerald-500"
		},
		{
			name: "Online",
			mode: Mode.ONLINE_PLAYER,
			backgrounColor: "bg-pink-500"
		},
	];

	useEffect(() => {
		const game = new GameContainer();

		setGame(game);
	}, []);

	useEffect(() => {
		game?.setTiles(tileRefs);
	}, [game, tileRefs]);

	const handleSelectGameMode = (mode: (typeof Mode)[keyof typeof Mode]) => {
		game!.listenAndStart();
		game!.setMode(mode);
		setGameState(entry.IN_GAME);
	};

	return (
		<>
			{gameState === entry.IN_MENU ? (
				<div id="menu">
					<h1 className="m-20">Tic Tac Toe</h1>
					<div>
						<div className="bg-amber-50 px-10" onClick={() => setIsPrepare(!isPrepare)}>
							{isPrepare ? "Back" : "Play"}
						</div>
					</div>
					{isPrepare ? (
						<div className="flex justify-around gap-3 p-7 min-w-[400px] w-[100%] max-w-[600px]">
							{gamemodes.map((mode) => (
								<div
									onClick={() => handleSelectGameMode(mode.mode)}
									className={`aspect-square ${mode.backgrounColor} flex justify-center items-center flex-1`}
								>
									{mode.name}
								</div>
							))}
						</div>
					) : (
						<></>
					)}
				</div>
			) : (
				<></>
			)}
			{gameState === entry.IN_GAME ? (
				<div id="game" className="select-none" style={`--size:${settings.TILE_SIZE}`}>{Array.from({ length: size }).map((_, i) => {
					return (
						<div
							className="bg-stone-100 text-gray-950 text-5xl font-mono flex justify-center-safe items-center-safe font-extrabold"
							onClick={(ev: MouseEvent) => {
								game!.dispatchEvent(new ClickEvent({
									index: i,
									event: ev,
									getCurrentPlayer: game!.getCurrentPlayer.bind(game)
								}))
							}}
							key={i}
							ref={tileRefs[i]}
						></div>
					);
				})}</div>
			) : (
				<></>
			)}
		</>
	);
}
