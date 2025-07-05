import {
  type Dispatch,
  type StateUpdater,
  useCallback,
  useContext,
  useState,
} from "preact/hooks";
import { GameContext } from "../contexts/GameContext.tsx";
import { Mode } from "../modes/enums.ts";
import { entry } from "../states.ts";

export default function Menu({
  setGameState,
}: {
  setGameState: Dispatch<StateUpdater<(typeof entry)[keyof typeof entry]>>;
}) {
  const [isPrepare, setIsPrepare] = useState<boolean>(false);
  const [_inSetting, setInSetting] = useState<boolean>(false);

  const game = useContext(GameContext);

  const handleSelectGameMode = useCallback(
    (mode: (typeof Mode)[keyof typeof Mode]) => {
      game?.setMode(mode);
      setGameState(entry.IN_GAME);
    },
    [game],
  );

  const gamemodes = [
    {
      name: "Bot",
      mode: Mode.OFFLINE_BOT,
      backgroundColor: "bg-amber-500",
    },
    {
      name: "Player",
      mode: Mode.OFFLINE_PLAYER,
      backgroundColor: "bg-emerald-500",
    },
    {
      name: "Online",
      mode: Mode.ONLINE_PLAYER,
      backgroundColor: "bg-pink-500",
    },
  ];

  return (
    <div
      id="menu"
      className="flex flex-col justify-center min-h-[300px] h-[80vmin]"
    >
      <h1>Tic Tac Toe</h1>
      <div class="flex flex-col gap-3 my-auto">
        <button class="bg-slate-700" onClick={() => setIsPrepare(true)}>
          Play
        </button>
        <button class="bg-slate-700" onClick={() => setInSetting(true)}>
          Setting
        </button>
      </div>

      {isPrepare && (
        <div className="fixed inset-0 bg-opacity-60 z-50 flex justify-center items-center">
          <div className="flex justify-around gap-3 p-3 min-w-[200px] w-[80vmin] max-w-[600px] bg-amber-200 rounded-xl">
            {gamemodes.map((mode, i) => (
              <button
                key={mode.name}
                onClick={(e) => i >= 2 ? (alert("this mode still under construction")) : handleSelectGameMode(mode.mode)}
                className={`rounded-2xl text-3xl aspect-square ${mode.backgroundColor} flex justify-center items-center flex-1`}
              >
                {mode.name}
              </button>
            ))}
            <button onClick={() => setIsPrepare(false)} className="absolute top-4 right-4 text-white text-xl">
              ✕
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
