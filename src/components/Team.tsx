import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import Button, { ButtonEnum } from "@/components/Button";
import type { DragDataType, TeamType } from "@/lib/Types";

export const teamColors = ["blue", "green", "red", "yellow"];

type TeamHandler = {
  onChangeName: (id: string, name: string) => void;
  onChangeColor: (id: string) => void;
  onChangeScore: (id: string, score: number) => void;
  onChangeEliminated: (id: string) => void;
  onRemove: (id: string) => void;
  onDrag: (hoverId: string, dragData: { id: string }) => void;
};

type TeamPropType = TeamType & TeamHandler;

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
  onDrag,
}: TeamPropType) {
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

  drag(drop(ref));

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
        className="bg-input rounded p-2.5 w-24 text-sm focus:outline-none"
        defaultValue={name}
        onChange={(event) => onChangeName(id, event.target.value)}
      />
      <Button onClick={() => onChangeScore(id, 1)} type={ButtonEnum.stepUp} />
      <button
        type="button"
        className="rounded-full size-10 font-extrabold textShadow text-2xl"
        style={{ backgroundColor: color }}
        onClick={() => onChangeColor(id)}
      >
        {score}
      </button>
      <Button
        onClick={() => onChangeScore(id, -1)}
        type={ButtonEnum.stepDown}
      />
      <Button onClick={() => onChangeEliminated(id)}>
        {eliminated ? "Activate" : "Eliminate"}
      </Button>
      <Button type={ButtonEnum.delete} onClick={() => onRemove(id)} />
    </div>
  );
}
