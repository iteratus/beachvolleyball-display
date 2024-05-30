import { useCallback } from "react";
import { findTeamIndex, updateTeam } from "@/lib/utils";
import { teamColors, TeamType } from "@/components/Team";

export default function useTeamGUI(
  activeTeams: TeamType[],
  setActiveTeams: (activeTeams: TeamType[]) => void,
  eliminatedTeams: TeamType[],
  setEliminatedTeams: (eliminatedTeams: TeamType[]) => void,
) {
  const handleChangeEliminated = useCallback(
    (id: string) => {
      const activeIndex = findTeamIndex(activeTeams, id);
      const eliminatedIndex = findTeamIndex(eliminatedTeams, id);

      let updatedActiveTeams = activeTeams;
      let updatedEliminatedTeams = eliminatedTeams;

      if (activeIndex >= 0) {
        const teamToMove = activeTeams[activeIndex];
        eliminatedTeams.unshift({ ...teamToMove, eliminated: true });

        updatedActiveTeams = activeTeams.filter((team) => {
          return team.id !== id;
        });
      } else if (eliminatedIndex >= 0) {
        const teamToMove = eliminatedTeams[eliminatedIndex];
        activeTeams.push({ ...teamToMove, eliminated: false });

        updatedEliminatedTeams = eliminatedTeams.filter((team) => {
          return team.id !== id;
        });
      }

      localStorage.setItem("activeTeams", JSON.stringify(updatedActiveTeams));
      setActiveTeams(updatedActiveTeams);

      localStorage.setItem(
        "eliminatedTeams",
        JSON.stringify(updatedEliminatedTeams),
      );
      setEliminatedTeams(updatedEliminatedTeams);
    },
    [activeTeams, eliminatedTeams, setActiveTeams, setEliminatedTeams],
  );

  return {
    handleChangeEliminated,
  };
}
