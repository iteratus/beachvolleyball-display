import React, {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
} from "react";
import Team from "@/components/Team";
import useTeamList from "@/lib/useTeamList";
import { useDrop } from "react-dnd";
import Button from "@/components/Button";
import type { DragDataType, TeamType } from "@/lib/Types";

type TeamListProps = {
  stackName: string;
  title: string;
  teams: TeamType[];
  setTeams: Dispatch<SetStateAction<TeamType[]>>;
  onChangeEliminated: (id: string) => void;
  onDrag: (hoverId: string, dragData: { id: string }) => void;
};

const TeamList = ({
  stackName,
  title,
  teams,
  setTeams,
  onChangeEliminated,
  onDrag,
}: TeamListProps) => {
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
    hover(item) {
      onDrag(stackName, item as DragDataType);
    },
  });

  useEffect(() => {
    dropHandler[1](ref);
  }, [dropHandler]);

  return (
    <div>
      <h2 className="text-2xl mb-4">{title}</h2>
      <div className="flex flex-col min-w-111.5 teamList" ref={ref}>
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
};

export default TeamList;
