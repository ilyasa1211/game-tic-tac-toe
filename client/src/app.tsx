import { useEffect, useRef, useState } from "preact/hooks";
import "./app.css";
import GameContainer from "./game.tsx";
import { modes } from "./modes/enums.ts";
import { entry } from "./states.ts";
import ClickEvent from "./events/click.ts";
import settings from "./config/settings.ts";

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
			mode: modes.OFFLINE_BOT,
		},
		{
			name: "Player",
			mode: modes.OFFLINE_PLAYER,
		},
		{
			name: "Online",
			mode: modes.ONLINE_PLAYER,
		},
	];

	useEffect(() => {
		setGame(new GameContainer());
	}, []);

	useEffect(() => {
		game?.setTiles(tileRefs);
	}, [game, tileRefs]);

	const handleSelectGameMode = (mode: (typeof modes)[keyof typeof modes]) => {
		game!.listenAndStart();
		game!.setMode(mode);
		setGameState(entry.IN_GAME);
	};

	return (
		<>
			{gameState === entry.IN_MENU ? (
				<div id="menu">
					<h1 className="">Tic Tac Toe</h1>
					<div>
						<div onClick={() => setIsPrepare(!isPrepare)}>
							{isPrepare ? "Back" : "Play"}
						</div>
					</div>
					{isPrepare ? (
						<div className="flex justify-around gap-3 p-7 flex-1 min-w-[400px] w-[100%] max-w-[600px]">
							{gamemodes.map((mode) => (
								<div
									onClick={() => handleSelectGameMode(mode.mode)}
									className="aspect-square bg-amber-600 flex justify-center items-center flex-1"
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
				<div id="game" className="select-none">{Array.from({ length: size }).map((_, i) => {
					return (
						<div
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
