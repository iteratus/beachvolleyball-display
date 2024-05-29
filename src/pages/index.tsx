import { useEffect, useState } from "react";
import { type Teams } from "@/lib/Types";

export default function Home() {
  const [teams, setTeams] = useState<Teams[] | null>(null);
  const [timerStarted, setTimerStarted] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storageTeams = JSON.parse(localStorage.getItem("teams") ?? "[]");
      const storageTimerStarted = localStorage.getItem("timerStarted");

      setTeams(storageTeams);
      setTimerStarted(storageTimerStarted);
    }
  }, []);

  return (
    <main className="flex flex-col items-center h-screen w-screen justify-center">
      <div className="max-w-5xl w-full font-mono text-sm flex">
        {JSON.stringify(teams)}
      </div>
      <div className="max-w-5xl w-full font-mono text-sm flex">
        {timerStarted}
      </div>
    </main>
  );
}
