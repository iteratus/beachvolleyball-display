import TimerRemote from "@/components/TimerRemote";
import { Saira } from "next/font/google";
import { useCallback, useEffect, useState } from "react";
import { TeamType } from "@/components/Team";

const saira = Saira({
  weight: "700",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function Home() {
  const [activeTeams, setActiveTeams] = useState<TeamType[]>([]);

  const handleStorageChange = useCallback(() => {
    const active = JSON.parse(localStorage.getItem("activeTeams") || "[]");
    setActiveTeams(active);
  }, []);

  useEffect(() => {
    const active = JSON.parse(localStorage.getItem("activeTeams") || "[]");
    setActiveTeams(active);

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [handleStorageChange]);

  return (
    <main className={`${saira.className} p-10 grid grid-cols-3`}>
      <div className="flex flex-col items-center col-span-3">
        <h1 className="uppercase font-extrabold text-headline italic">
          Countdown
        </h1>
        <TimerRemote />
      </div>
      <div className="px-10 py-6 -skew-x-12">
        <h2 className="uppercase font-extrabold text-headline">Kingside</h2>
        <div className="uppercase font-extrabold text-headline">
          {activeTeams[0] && activeTeams[0].name}
        </div>
        <div className="text-scoreMain mt-3 flex items-center">
          <div
            className="mr-6 rounded-full size-14 skew-x-12 font-extrabold textShadow text-2xl"
            style={{
              backgroundColor:
                (activeTeams[0] && activeTeams[0].color) ?? "transparent",
            }}
          />
          {activeTeams[0] && activeTeams[0].score}
        </div>
      </div>
      <div className="px-10 py-6 border-x-4 -skew-x-12">
        <h2 className="uppercase font-extrabold text-headline">Challenger</h2>
        <div className="uppercase font-extrabold text-headline">
          {activeTeams[1] && activeTeams[1].name}
        </div>
        <div className="text-scoreMain mt-3 flex items-center">
          <div
            className="mr-6 rounded-full size-14 skew-x-12 font-extrabold textShadow text-2xl"
            style={{
              backgroundColor:
                (activeTeams[1] && activeTeams[1].color) ?? "transparent",
            }}
          />
          {activeTeams[1] && activeTeams[1].score}
        </div>
      </div>
      <div className="px-10 py-6 -skew-x-12">
        <h2 className="uppercase font-extrabold text-headline">Next up</h2>
        <ul className="pt-2">
          {activeTeams.map((team: TeamType, index) => {
            if (index < 2) {
              return null;
            }
            return (
              <li key={team.id} className="flex py-1 items-center">
                <div className="uppercase font-extrabold text-team">
                  {team.score}
                </div>
                <div
                  className="mx-3 rounded-full size-4 font-extrabold textShadow text-2xl"
                  style={{ backgroundColor: team.color }}
                />
                <div className="uppercase font-extrabold text-team">
                  {team.name}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
