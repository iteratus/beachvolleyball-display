import TimerGUI from "@/components/TimerGUI";
import TeamGUI from "@/components/TeamGUI";

const Home = () => {
  return (
    <main className="p-10 flex gap-40" data-testid="irgendwas">
      <TimerGUI />
        <p>Neuer Paragraph</p>
      <TeamGUI />
    </main>
  );
};

export default Home;
