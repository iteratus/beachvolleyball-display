import React, { useRef } from "react";
import Team, { TeamType } from "@/components/Team";
import useTeamList from "@/lib/useTeamList";
import { DropTargetMonitor, useDrop } from "react-dnd";
import Button from "@/components/Button";

type TeamListProps = {
  stackName: string;
  title: string;
  teams: TeamType[];
  setTeams: any;
  onChangeEliminated: (id: string) => void;
  onDrag: (
    ref: any,
    hoverId: string,
    dragData: any,
    monitor: DropTargetMonitor,
  ) => void;
};

export default function TeamList({
  stackName,
  title,
  teams,
  setTeams,
  onChangeEliminated,
  onDrag,
}: TeamListProps) {
  const ref = useRef(null);

  const {
    handleAdd,
    handleRemove,
    handleChangeColor,
    handleChangeScore,
    handleChangeName,
  } = useTeamList(stackName, teams, setTeams);

  const dropHandler = useDrop({
    accept: "team",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      onDrag(ref, stackName, item, monitor);
    },
  });

  dropHandler[1](ref);

  return (
    <div>
      <h2 className="text-2xl mb-4">{title}</h2>
      <div className="flex flex-col min-w-[446px] teamList" ref={ref}>
        {teams.map((team) => (
          <Team
            key={team.id}
            id={team.id}
            name={team.name}
            color={team.color}
            score={team.score}
            eliminated={stackName === "eliminatedTeams"}
            onChangeName={handleChangeName}
            onChangeColor={handleChangeColor}
            onChangeScore={handleChangeScore}
            onChangeEliminated={onChangeEliminated}
            onRemove={handleRemove}
            onDrag={onDrag}
          />
        ))}
      </div>
      <Button onClick={handleAdd} className="mt-4">
        Add team
      </Button>
    </div>
  );
}
