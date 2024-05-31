import { useCallback } from "react";
import { findTeamIndex } from "@/lib/utils";
import type { DragDataType, TeamType } from "@/lib/Types";

export default function useTeamGUI(
  activeTeams: TeamType[],
  setActiveTeams: (activeTeams: TeamType[]) => void,
  eliminatedTeams: TeamType[],
  setEliminatedTeams: (eliminatedTeams: TeamType[]) => void,
) {
  const saveTeams = useCallback(
    (newActiveTeams: TeamType[], newEliminatedTeams: TeamType[]) => {
      localStorage.setItem("activeTeams", JSON.stringify(newActiveTeams));
      setActiveTeams(newActiveTeams);

      localStorage.setItem(
        "eliminatedTeams",
        JSON.stringify(newEliminatedTeams),
      );
      setEliminatedTeams(newEliminatedTeams);
    },
    [setActiveTeams, setEliminatedTeams],
  );

  const handleChangeEliminated = useCallback(
    (id: string) => {
      const activeIndex = findTeamIndex(activeTeams, id);
      const eliminatedIndex = findTeamIndex(eliminatedTeams, id);

      let updatedActiveTeams = activeTeams;
      let updatedEliminatedTeams = eliminatedTeams;

      if (activeIndex >= 0) {
        const teamToMove = activeTeams[activeIndex];
        eliminatedTeams.unshift({ ...teamToMove });

        updatedActiveTeams = activeTeams.filter((team) => {
          return team.id !== id;
        });
      } else if (eliminatedIndex >= 0) {
        const teamToMove = eliminatedTeams[eliminatedIndex];
        activeTeams.push({ ...teamToMove });

        updatedEliminatedTeams = eliminatedTeams.filter((team) => {
          return team.id !== id;
        });
      }

      saveTeams(updatedActiveTeams, updatedEliminatedTeams);
    },
    [activeTeams, eliminatedTeams, saveTeams],
  );

  const handleDrag = (hoverId: string, dragData: DragDataType) => {
    // Don't replace items with themselves
    if (dragData.id === hoverId) {
      return;
    }

    let sourceList = "activeTeams";
    let dragIndex = findTeamIndex(activeTeams, dragData.id);
    let targetList = "activeTeams";
    let hoverIndex = findTeamIndex(activeTeams, hoverId);

    if (dragIndex < 0) {
      sourceList = "eliminatedTeams";
      dragIndex = findTeamIndex(eliminatedTeams, dragData.id);
    }
    if (hoverIndex < 0) {
      targetList = "eliminatedTeams";
      hoverIndex = findTeamIndex(eliminatedTeams, hoverId);
    }

    if (hoverId === "eliminatedTeams") {
      if (eliminatedTeams.length === 0) {
        const newEliminatedTeams = [activeTeams[dragIndex]];
        const newActiveTeams = activeTeams.filter((team) => {
          return team.id !== dragData.id;
        });

        saveTeams(newActiveTeams, newEliminatedTeams);
      }
      return;
    }

    if (hoverId === "activeTeams") {
      if (activeTeams.length === 0) {
        const newActiveTeams = [eliminatedTeams[dragIndex]];
        const newEliminatedTeams = eliminatedTeams.filter((team) => {
          return team.id !== dragData.id;
        });

        saveTeams(newActiveTeams, newEliminatedTeams);
      }
      return;
    }

    const newActiveTeams = [...activeTeams];
    const newEliminatedTeams = [...eliminatedTeams];

    if (sourceList === targetList) {
      if (sourceList === "activeTeams") {
        [newActiveTeams[hoverIndex], newActiveTeams[dragIndex]] = [
          activeTeams[dragIndex],
          activeTeams[hoverIndex],
        ];
      } else {
        [newEliminatedTeams[hoverIndex], newEliminatedTeams[dragIndex]] = [
          eliminatedTeams[dragIndex],
          eliminatedTeams[hoverIndex],
        ];
      }
    } else if (sourceList === "activeTeams") {
      const movedTeam = newActiveTeams.splice(dragIndex, 1);
      newEliminatedTeams.splice(hoverIndex, 0, movedTeam[0]);
    } else {
      const movedTeam = newEliminatedTeams.splice(dragIndex, 1);
      newActiveTeams.splice(hoverIndex, 0, movedTeam[0]);
    }

    saveTeams(newActiveTeams, newEliminatedTeams);
  };

  return {
    handleChangeEliminated,
    handleDrag,
  };
}
