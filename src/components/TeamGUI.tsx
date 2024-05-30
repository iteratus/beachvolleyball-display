import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TeamType } from "@/components/Team";
import useTeamGUI from "@/lib/useTeamGUI";
import TeamList from "@/components/TeamList";

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

  const { handleChangeEliminated } = useTeamGUI(
    activeTeams,
    setActiveTeams,
    eliminatedTeams,
    setEliminatedTeams,
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex gap-x-12">
        <TeamList
          key="activeTeams"
          stackName="activeTeams"
          title="Active teams"
          teams={activeTeams}
          setTeams={setActiveTeams}
          onChangeEliminated={handleChangeEliminated}
        />
        <TeamList
          key="eliminatedTeams"
          stackName="eliminatedTeams"
          title="Eliminated"
          teams={eliminatedTeams}
          setTeams={setEliminatedTeams}
          onChangeEliminated={handleChangeEliminated}
        />
      </div>
    </DndProvider>
  );
}
