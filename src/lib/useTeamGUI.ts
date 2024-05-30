import { useCallback } from "react";
import { v4 as uuid } from "uuid";
import { findTeamIndex, updateTeam } from "@/lib/utils";
import { teamColors, TeamType } from "@/components/Team";

const getNextColor = (colorToFind: string) => {
  const index = teamColors.findIndex((color) => {
    return color === colorToFind;
  });

  if (index < 0 || index === teamColors.length - 1) {
    return teamColors[0];
  }

  return teamColors[index + 1];
};

export default function useTeamGUI(
  activeTeams: TeamType[],
  setActiveTeams: (activeTeams: TeamType[]) => void,
  eliminatedTeams: TeamType[],
  setEliminatedTeams: (eliminatedTeams: TeamType[]) => void,
) {
  const possibleTeams = {
    activeTeams: { teams: activeTeams, update: setActiveTeams },
    eliminatedTeams: { teams: eliminatedTeams, update: setEliminatedTeams },
  };

  const handleAdd = () => {
    const updatedTeams = updateTeam(activeTeams, {
      id: uuid(),
      name: "",
      color: teamColors[0],
      score: 0,
      eliminated: false,
    });
    localStorage.setItem("activeTeams", JSON.stringify(updatedTeams));
    setActiveTeams(updatedTeams);
  };

  const handleRemove = (id: string) => {
    Object.entries(possibleTeams).forEach(([stackName, reference]) => {
      const updated = reference.teams.filter((team) => {
        return team.id !== id;
      });
      localStorage.setItem(stackName, JSON.stringify(updated));
      reference.update(updated);
    });
  };

  const handleChangeName = useCallback(
    (id: string, name: string) => {
      Object.entries(possibleTeams).forEach(([stackName, reference]) => {
        const index = findTeamIndex(reference.teams, id);

        if (index >= 0) {
          const updatedTeams = updateTeam(reference.teams, { name }, index);
          localStorage.setItem(stackName, JSON.stringify(updatedTeams));
          reference.update(updatedTeams);
        }
      });
    },
    [possibleTeams],
  );

  const handleChangeColor = useCallback(
    (id: string) => {
      Object.entries(possibleTeams).forEach(([stackName, reference]) => {
        const index = findTeamIndex(reference.teams, id);

        if (index >= 0) {
          const color = getNextColor(reference.teams[index].color);

          const updatedTeams = updateTeam(reference.teams, { color }, index);
          localStorage.setItem(stackName, JSON.stringify(updatedTeams));
          reference.update(updatedTeams);
        }
      });
    },
    [possibleTeams],
  );

  const handleChangeScore = useCallback(
    (id: string, score: number) => {
      Object.entries(possibleTeams).forEach(([stackName, reference]) => {
        const index = findTeamIndex(reference.teams, id);

        if (index >= 0) {
          const currentScore = reference.teams[index].score;
          const updatedTeams = updateTeam(
            reference.teams,
            {
              score: Math.max(currentScore + score, 0),
            },
            index,
          );
          localStorage.setItem(stackName, JSON.stringify(updatedTeams));
          reference.update(updatedTeams);
        }
      });
    },
    [possibleTeams],
  );

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
    handleAdd,
    handleRemove,
    handleChangeColor,
    handleChangeEliminated,
    handleChangeScore,
    handleChangeName,
  };
}
