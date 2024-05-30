import React from "react";
import Team, { TeamType } from "@/components/Team";
import useTeamList from "@/lib/useTeamList";

type TeamListProps = {
  stackName: string;
  title: string;
  teams: TeamType[];
  setTeams: any;
  onChangeEliminated: (id: string) => void;
};

export default function TeamList({
  stackName,
  title,
  teams,
  setTeams,
  onChangeEliminated,
}: TeamListProps) {
  const {
    handleAdd,
    handleRemove,
    handleChangeColor,
    handleChangeScore,
    handleChangeName,
  } = useTeamList(stackName, teams, setTeams);

  return (
    <div>
      <h2 className="text-2xl mb-4">{title}</h2>
      <div className="flex flex-col gap-2">
        {teams.map((team) => (
          <Team
            key={team.id}
            id={team.id}
            name={team.name}
            color={team.color}
            score={team.score}
            eliminated={team.eliminated}
            onChangeName={handleChangeName}
            onChangeColor={handleChangeColor}
            onChangeScore={handleChangeScore}
            onChangeEliminated={onChangeEliminated}
            onRemove={handleRemove}
          />
        ))}
      </div>
      <button type="button" className="button mt-4" onClick={handleAdd}>
        Add team
      </button>
    </div>
  );
}
