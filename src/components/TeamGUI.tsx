import React, { useState, useEffect } from "react";
import Team, { TeamType } from "@/components/Team";
import useTeamGUI from "@/lib/useTeamGUI";

export default function TeamGUI() {
  const [activeTeams, setActiveTeams] = useState<TeamType[]>([]);
  const [eliminatedTeams, setEliminatedTeams] = useState<TeamType[]>([]);

  useEffect(() => {
    const active = JSON.parse(localStorage.getItem("activeTeams") || "[]");
    const eliminated = JSON.parse(
      localStorage.getItem("eliminatedTeams") || "[]",
    );
    setActiveTeams(active);
    setEliminatedTeams(eliminated);
  }, []);

  const {
    handleAdd,
    handleRemove,
    handleChangeColor,
    handleChangeEliminated,
    handleChangeScore,
    handleChangeName,
  } = useTeamGUI(
    activeTeams,
    setActiveTeams,
    eliminatedTeams,
    setEliminatedTeams,
  );

  return (
    <div className="flex gap-x-12">
      <div>
        <h2 className="text-2xl mb-4">Active teams</h2>
        <div className="flex flex-col gap-2">
          {activeTeams.map((team) => (
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
              onChangeEliminated={handleChangeEliminated}
              onRemove={handleRemove}
            />
          ))}
        </div>
        <button type="button" className="button mt-4" onClick={handleAdd}>
          Add team
        </button>
      </div>
      <div>
        <h2 className="text-2xl mb-4">Eliminated</h2>
        <div>
          {eliminatedTeams.map((team) => (
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
              onChangeEliminated={handleChangeEliminated}
              onRemove={handleRemove}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
