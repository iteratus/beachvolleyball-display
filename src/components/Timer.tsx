import React, {
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { formatTime } from "@/lib/utils";
import localFont from "next/font/local";

const myFont = localFont({ src: "../../public/fonts/digital-7-mono.ttf" });

interface TimerProps {
  initialMinutes: number;
  isPaused: boolean;
}

export interface TimerHandle {
  reset: () => void;
}

const Timer = forwardRef<TimerHandle, TimerProps>(
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

    return (
      <div className={`${myFont.className} text-clockFaceGUI relative`}>
        <div className="text-[#333333] select-none">88:88</div>
        <div className="absolute left-0 top-0">{formatTime(time)}</div>
      </div>
    );
  },
);
Timer.displayName = "Timer";

export default Timer;
