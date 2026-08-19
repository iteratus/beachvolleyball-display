import TimerGUI from "@/components/TimerGUI";
import TeamGUI from "@/components/TeamGUI";

const Home = () => {
  return (
    <main className="p-10 flex gap-40" data-testid="irgendwas">
      <TimerGUI />
      <p style="font-size: 12px;">Neuer Paragraph</p>
      <TeamGUI />
    </main>
  );
};

export default Home;
