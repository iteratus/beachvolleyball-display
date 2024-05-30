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

export default function useTeamList(
  stackName: string,
  teams: TeamType[],
  setTeams: (teams: TeamType[]) => void,
) {
  const handleAdd = () => {
    const updatedTeams = updateTeam(teams, {
      id: uuid(),
      name: "",
      color: teamColors[0],
      score: 0,
      eliminated: stackName !== "activeTeams",
    });
    localStorage.setItem(stackName, JSON.stringify(updatedTeams));
    setTeams(updatedTeams);
  };

  const handleRemove = useCallback(
    (id: string) => {
      const updated = teams.filter((team) => {
        return team.id !== id;
      });
      localStorage.setItem(stackName, JSON.stringify(updated));
      setTeams(updated);
    },
    [setTeams, stackName, teams],
  );

  const handleChangeName = useCallback(
    (id: string, name: string) => {
      const index = findTeamIndex(teams, id);

      if (index >= 0) {
        const updatedTeams = updateTeam(teams, { name }, index);
        localStorage.setItem(stackName, JSON.stringify(updatedTeams));
        setTeams(updatedTeams);
      }
    },
    [setTeams, stackName, teams],
  );

  const handleChangeColor = useCallback(
    (id: string) => {
      const index = findTeamIndex(teams, id);

      if (index >= 0) {
        const color = getNextColor(teams[index].color);

        const updatedTeams = updateTeam(teams, { color }, index);
        localStorage.setItem(stackName, JSON.stringify(updatedTeams));
        setTeams(updatedTeams);
      }
    },
    [setTeams, stackName, teams],
  );

  const handleChangeScore = useCallback(
    (id: string, score: number) => {
      const index = findTeamIndex(teams, id);

      if (index >= 0) {
        const currentScore = teams[index].score;
        const updatedTeams = updateTeam(
          teams,
          {
            score: Math.max(currentScore + score, 0),
          },
          index,
        );
        localStorage.setItem(stackName, JSON.stringify(updatedTeams));
        setTeams(updatedTeams);
      }
    },
    [setTeams, stackName, teams],
  );

  return {
    handleAdd,
    handleRemove,
    handleChangeColor,
    handleChangeScore,
    handleChangeName,
  };
}
