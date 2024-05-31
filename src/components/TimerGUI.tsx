import React, { useCallback, useEffect, useRef, useState } from "react";
import Timer, { TimerHandle } from "@/components/Timer";
import Button, { ButtonType } from "@/components/Button";

export default function TimerGUI() {
  const [initialMinutes, setInitialMinutes] = useState<number>(15);

  const [isPaused, setIsPaused] = useState<boolean>(true);
  const timerRef = useRef<TimerHandle>(null);

  const resetTimer = () => {
    if (timerRef.current) {
      timerRef.current.reset();
      setIsPaused(true);
    }
  };

  useEffect(() => {
    const storageInitialMinutes =
      localStorage.getItem("timerInitialMinutes") ?? "15";

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
    <div className="grid grid-cols-[50px_1fr_1fr] grid-rows-3 gap-6 w-fit h-fit justify-items-center">
      <div className="self-end">
        <Button onClick={setNewTimerInit(1)} type={ButtonType.stepUp} />
      </div>
      <div className="col-span-2 row-span-2">
        <Timer
          ref={timerRef}
          initialMinutes={initialMinutes}
          isPaused={isPaused}
        />
      </div>
      <div className="self-start">
        <Button onClick={setNewTimerInit(-1)} type={ButtonType.stepDown} />
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
    </div>
  );
}
