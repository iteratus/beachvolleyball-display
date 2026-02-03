import { useCallback, useEffect, useRef, useState } from "react";
import Timer from "@/components/Timer";
import Button, { ButtonEnum } from "@/components/Button";
import type { TimerHandling } from "@/lib/Types";

const TimerGUI = () => {
  const [initialMinutes, setInitialMinutes] = useState<number>(15);

  const [isPaused, setIsPaused] = useState<boolean>(true);
  const timerRef = useRef<TimerHandling>(null);

  const resetTimer = () => {
    if (timerRef.current) {
      timerRef.current.reset();
      setIsPaused(true);
    }
  };

  useEffect(() => {
    const storageInitialMinutes =
      localStorage.getItem("timerInitialMinutes") ?? "15";

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInitialMinutes(parseInt(storageInitialMinutes, 10));
  }, []);

  const setNewTimerInit = useCallback(
    (step: number) => () => {
      setInitialMinutes((prevState) => {
        const newTime = prevState + step;

        if (newTime > 0 && newTime < 100) {
          localStorage.setItem("timerInitialMinutes", newTime.toString());
          return newTime;
        }

        return prevState;
      });
    },
    [],
  );

  return (
    <div className="grid grid-cols-[50px_1fr_1fr] grid-rows-4 gap-6 w-fit h-fit justify-items-center">
      <div className="self-end">
        <Button onClick={setNewTimerInit(1)} type={ButtonEnum.stepUp} />
      </div>
      <div className="col-span-2 row-span-2">
        <Timer
          ref={timerRef}
          initialMinutes={initialMinutes}
          isPaused={isPaused}
        />
      </div>
      <div className="self-start">
        <Button onClick={setNewTimerInit(-1)} type={ButtonEnum.stepDown} />
      </div>
      <div />
      <div>
        <Button onClick={() => setIsPaused(!isPaused)}>
          {isPaused ? "Start" : "Pause"}
        </Button>
      </div>
      <div>
        <Button onClick={resetTimer}>Reset</Button>
      </div>
      <div />
      <div className="col-span-2 self-center">
        <Button onClick={() => window.open("/screen")}>
          Open remote screen
        </Button>
      </div>
    </div>
  );
};

export default TimerGUI;
