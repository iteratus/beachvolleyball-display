import {
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { formatTime } from "@/lib/utils";
import TimerDisplay from "@/components/TimerDisplay";
import type { TimerHandling } from "@/lib/Types";

interface TimerProps {
  initialMinutes: number;
  isPaused: boolean;
}

const Timer = forwardRef<TimerHandling, TimerProps>(
  ({ initialMinutes, isPaused }, ref) => {
    const [time, setTime] = useState(initialMinutes * 60);
    const intervalRef = useRef<number | undefined>(undefined);

    useImperativeHandle(ref, () => ({
      reset() {
        const newTime = initialMinutes * 60;
        setTime(newTime);
        localStorage.setItem("timer", newTime.toString());
        window.dispatchEvent(new Event("storage"));

        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = undefined;
        }
      },
    }));

    useEffect(() => {
      if (!isPaused && !intervalRef.current) {
        intervalRef.current = window.setInterval(() => {
          setTime((prevTime) => {
            const newTime = prevTime - 1;

            localStorage.setItem("timer", newTime.toString());
            window.dispatchEvent(new Event("storage"));

            if (newTime <= 0) {
              window.clearInterval(intervalRef.current);
              intervalRef.current = undefined;
              return 0;
            }

            return newTime;
          });
        }, 1000);
      } else if (isPaused && intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }

      return () => {
        if (intervalRef.current) {
          window.clearInterval(intervalRef.current);
        }
      };
    }, [isPaused]);

    useEffect(() => {
      const newTime = initialMinutes * 60;
      setTime(newTime);
      localStorage.setItem("timer", newTime.toString());
      window.dispatchEvent(new Event("storage"));
    }, [initialMinutes]);

    return <TimerDisplay time={formatTime(time)} />;
  },
);
Timer.displayName = "Timer";

export default Timer;
