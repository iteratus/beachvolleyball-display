import { useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import Button, { ButtonEnum } from "@/components/Button";
import type { DragDataType, TeamType } from "@/lib/Types";

export const teamColors = [
  "#2196F3", // strong blue
  "#FF6F61", // strong coral red
  "#FFC107", // bright yellow
  "#4CAF50", // vibrant green
  "#E91E63", // intense pink
];

type TeamHandler = {
  onChangeName: (id: string, name: string) => void;
  onChangeColor: (id: string) => void;
  onChangeScore: (id: string, score: number) => void;
  onChangeEliminated: (id: string) => void;
  onRemove: (id: string) => void;
  onDrag: (hoverId: string, dragData: { id: string }) => void;
};

type TeamPropType = TeamType & TeamHandler;

const Team = ({
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
  onDrag,
}: TeamPropType) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop({
    accept: "team",
    collect(monitor) {
      return {
        isOver: monitor.isOver(),
      };
    },
    hover(item) {
      onDrag(id, item as DragDataType);
    },
  });

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "team",
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    drag(drop(ref));
  }, [drag, drop]);

  return (
    <div
      className={`flex items-center py-1 px-2 gap-2 ${isOver ? "teamHover" : ""}`}
      ref={ref}
      style={{
        opacity: isDragging ? 0.8 : 1,
      }}
    >
      <div className="draggable" />
      <input
        type="text"
        className="bg-input rounded p-2.5 w-40 text-sm focus:outline-none"
        defaultValue={name}
        onChange={(event) => onChangeName(id, event.target.value)}
      />
      <Button type={ButtonEnum.stepUp} onClick={() => onChangeScore(id, 1)} />
      <button
        type="button"
        className="rounded-full size-10 font-extrabold textShadow text-2xl"
        style={{ backgroundColor: color }}
        onClick={() => onChangeColor(id)}
      >
        {score}
      </button>
      <Button
        type={ButtonEnum.stepDown}
        onClick={() => onChangeScore(id, -1)}
      />
      <Button
        emoji={eliminated ? "⬅️" : "➡️"}
        className="mx-3"
        onClick={() => onChangeEliminated(id)}
      />
      <Button emoji="🗑️" onClick={() => onRemove(id)} />
    </div>
  );
};

export default Team;
