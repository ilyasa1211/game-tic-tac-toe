import { useContext, useEffect, useMemo, useRef, type Dispatch, type StateUpdater } from "preact/hooks";
import ClickEvent from "../events/click.ts";
import { GameContext } from "../contexts/GameContext.tsx";
import type { entry } from "../states.ts";

export default function Board({ size }: { size: number, setGameState: Dispatch<StateUpdater<typeof entry[keyof typeof entry]>> }) {
  const game = useContext(GameContext);
  const tileRefs = useMemo(() =>
    Array.from({ length: size ** 2 }, () => useRef<HTMLDivElement>(null))
    , [size]);

  useEffect(() => {
    game?.setTiles(tileRefs);
  }, [game, tileRefs]);

  return <div id="game" className="select-none" style={`--size:${size}`}>
    {Array.from({ length: size ** 2 }, ((_, i) =>
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
    ))}
    </div>
}