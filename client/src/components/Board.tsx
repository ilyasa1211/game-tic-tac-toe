import {
  type Dispatch,
  type StateUpdater,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "preact/hooks";
import { GameContext } from "../contexts/GameContext.tsx";
import ClickEvent from "../events/click.ts";
import type { entry } from "../states.ts";

export default function Board({
  size,
}: {
  size: number;
  setGameState: Dispatch<StateUpdater<(typeof entry)[keyof typeof entry]>>;
}) {
  const game = useContext(GameContext);
  const tileRefs = useMemo(
    () =>
      Array.from({ length: size ** 2 }, () => useRef<HTMLButtonElement>(null)),
    [size],
  );

  useEffect(() => {
    game?.setTiles(tileRefs);
  }, [game, tileRefs]);

  return (
    <div id="game" className="select-none" style={`--size:${size}`}>
      {/* double map here just to get rid of formatter warning */}
      {Array.from({ length: size ** 2 }, (_, i) => i).map((i) => (
        <button
          type="button"
          className="bg-stone-100 text-gray-950 text-5xl font-mono flex justify-center items-center font-extrabold"
          onClick={(ev) => {
            game?.dispatchEvent(
              new ClickEvent({
                index: i,
                event: ev,
                getCurrentPlayer: game?.getCurrentPlayer.bind(game),
              }),
            );
          }}
          key={i}
          ref={tileRefs[i]}
        ></button>
      ))}
    </div>
  );
}
