import React, { useEffect, useRef, useState } from "react";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import invariant from "tiny-invariant";

export const teamColors = ["blue", "green", "red", "yellow"];

export type TeamType = {
  id: string;
  name: string;
  color: string;
  score: number;
  eliminated: boolean;
};

type TeamPropType = TeamType & {
  onChangeName: (id: string, name: string) => void;
  onChangeColor: (id: string) => void;
  onChangeScore: (id: string, score: number) => void;
  onChangeEliminated: (id: string) => void;
  onRemove: (id: string) => void;
};

export default function Team({
  id,
  name,
  color,
  score,
  eliminated,
  onChangeName,
  onChangeColor,
  onChangeScore,
  onChangeEliminated,
  onRemove,
}: TeamPropType) {
  const ref = useRef(null);
  const [dragging, setDragging] = useState<boolean>(false);

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return draggable({
      element: el,
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    });
  }, []);

  return (
    <div
      className="flex items-center gap-2"
      ref={ref}
      style={{ opacity: dragging ? 0.8 : 1 }}
    >
      <div className="draggable" />
      <input
        type="text"
        className="input"
        defaultValue={name}
        onChange={(event) => onChangeName(id, event.target.value)}
      />
      <button
        type="button"
        className="rounded-full size-8 font-extrabold bg-[#2c2c2e]"
        onClick={() => onChangeScore(id, 1)}
      >
        +
      </button>
      <button
        type="button"
        className="rounded-full size-10 font-extrabold stroke text-2xl"
        style={{ backgroundColor: color }}
        onClick={() => onChangeColor(id)}
      >
        {score}
        {dragging}
      </button>
      <button
        type="button"
        className="rounded-full size-8 font-extrabold bg-[#2c2c2e]"
        onClick={() => onChangeScore(id, -1)}
      >
        -
      </button>
      <button
        type="button"
        className="button"
        onChange={() => onChangeEliminated(id)}
      >
        {eliminated ? "Activate" : "Eliminate"}
      </button>
      <button
        type="button"
        className="bg-[#c7000a] rounded-full size-8 font-extrabold text-md leading-none"
        onClick={() => onRemove(id)}
      >
        X
      </button>
    </div>
  );
}
