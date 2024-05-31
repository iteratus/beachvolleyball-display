import TimerRemote from "@/components/TimerRemote";
import { Saira } from "next/font/google";
import { useCallback, useEffect, useState } from "react";
import type { TeamType } from "@/lib/Types";

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
    <main
      className={`${saira.className} p-7 grid grid-cols-3 h-screen w-screen justify-center`}
    >
      <div className="flex flex-col items-center col-span-3 pb-6">
        <h1 className="uppercase font-extrabold text-headline italic">
          Countdown
        </h1>
        <TimerRemote />
      </div>
      <div className="px-8 py-5 -skew-x-12">
        <h2 className="uppercase font-extrabold text-headline text-nowrap">
          👑 Kingside
        </h2>
        <div className="uppercase font-extrabold text-headline pt-2 text-nowrap">
          {activeTeams[0] && activeTeams[0].name}
        </div>
        <div className="text-scoreMain mt-3 flex items-center">
          <div
            className="mr-6 rounded-full dotBig skew-x-12 font-extrabold textShadow text-2xl shrink-0"
            style={{
              backgroundColor:
                (activeTeams[0] && activeTeams[0].color) ?? "transparent",
            }}
          />
          {activeTeams[0] && activeTeams[0].score}
        </div>
      </div>
      <div className="px-8 py-5 border-x-4 -skew-x-12">
        <h2 className="uppercase font-extrabold text-headline">Challenger</h2>
        <div className="uppercase font-extrabold text-headline pt-2 text-nowrap">
          {activeTeams[1] && activeTeams[1].name}
        </div>
        <div className="text-scoreMain mt-3 flex items-center">
          <div
            className="mr-6 rounded-full dotBig skew-x-12 font-extrabold textShadow text-2xl shrink-0"
            style={{
              backgroundColor:
                (activeTeams[1] && activeTeams[1].color) ?? "transparent",
            }}
          />
          {activeTeams[1] && activeTeams[1].score}
        </div>
      </div>
      <div className="px-8 py-5 -skew-x-12">
        <h2 className="uppercase font-extrabold text-headline text-nowrap">
          Next up
        </h2>
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
                  className="mx-3 rounded-full dotSmall skew-x-12 font-extrabold textShadow text-2xl shrink-0"
                  style={{ backgroundColor: team.color }}
                />
                <div className="uppercase font-extrabold text-team text-nowrap">
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
