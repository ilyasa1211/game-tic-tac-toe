import { useCallback, useContext, useState, type Dispatch, type StateUpdater } from "preact/hooks";
import { Mode } from "../modes/enums.ts";
import { GameContext } from "../contexts/GameContext.tsx";
import { entry } from "../states.ts";

export default function Menu({ setGameState }: { setGameState: Dispatch<StateUpdater<typeof entry[keyof typeof entry]>> }) {
  const [isPrepare, setIsPrepare] = useState<boolean>(false);
  const [inSetting, setInSetting] = useState<boolean>(false);

  const game = useContext(GameContext);

  const handleSelectGameMode = useCallback((mode: (typeof Mode)[keyof typeof Mode]) => {
    game?.setMode(mode);
    setGameState(entry.IN_GAME);
  }, [game]);

  const gamemodes = [
    {
      name: "Bot",
      mode: Mode.OFFLINE_BOT,
      backgroundColor: "bg-indigo-500"
    },
    {
      name: "Player",
      mode: Mode.OFFLINE_PLAYER,
      backgroundColor: "bg-emerald-500"
    },
    {
      name: "Online",
      mode: Mode.ONLINE_PLAYER,
      backgroundColor: "bg-pink-500"
    },
  ];

  return (
    <div id="menu" className="flex flex-col gap-4 justify-around min-h-[300px] h-[80vmin]">
      <h1>Tic Tac Toe</h1>
      <div>
        <div className="" onClick={() => setIsPrepare(true)}>Play</div>
        <div onClick={() => setInSetting(true)}>Setting</div>
      </div>

      {isPrepare && (
        <div className="flex justify-around gap-3 p-3 min-w-[200px] w-[80vmin] max-w-[600px]">
          {gamemodes.map((mode) => (
            <div
              onClick={() => handleSelectGameMode(mode.mode)}
              className={`rounded-2xl aspect-square ${mode.backgroundColor} flex justify-center items-center flex-1`}
            >
              {mode.name}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}