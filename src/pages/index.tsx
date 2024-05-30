import TimerGUI from "@/components/TimerGUI";
import TeamGUI from "@/components/TeamGUI";

export default function Home() {
  return (
    <main className="p-10 flex gap-40">
      <TimerGUI />
      <TeamGUI />
    </main>
  );
}
