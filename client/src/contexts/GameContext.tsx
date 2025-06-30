import { createContext } from "preact";
import type GameContainer from "../game.ts";

export	const GameContext = createContext<GameContainer | null>(null);