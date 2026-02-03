import type { TeamType } from "@/lib/Types";

export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes < 10 ? "0" : ""}${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

export const findTeamIndex = (activeTeams: TeamType[], id: string) => {
  return activeTeams.findIndex((team) => {
    return team.id === id;
  });
};

export const updateTeam = (
  activeTeams: TeamType[],
  toUpdate: Partial<TeamType>,
  index: number | null = null,
): TeamType[] => {
  if (index === null) {
    return [...activeTeams, toUpdate] as TeamType[];
  }

  const updatedTeams = [...activeTeams];
  updatedTeams[index] = { ...updatedTeams[index], ...toUpdate };

  return updatedTeams;
};
