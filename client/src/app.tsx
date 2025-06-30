import { useMemo, useState } from "preact/hooks";
import "./app.css";
import GameContainer from "./game.ts";
import { entry } from "./states.ts";
import settings from "./config/settings.ts";
import Board from "./components/Board.tsx";
import Menu from "./components/Menu.tsx";
import { GameContext } from "./contexts/GameContext.tsx";

export function App() {
	const [gameState, setGameState] = useState<
		(typeof entry)[keyof typeof entry]
	>(entry.IN_MENU);
	const game = useMemo(() => new GameContainer(), []);

	return (
		<GameContext value={game}>
			{gameState === entry.IN_MENU && <Menu setGameState={setGameState} />}
			{gameState === entry.IN_GAME && <Board setGameState={setGameState} size={settings.TILE_SIZE} />}
		</GameContext>
	);
}
