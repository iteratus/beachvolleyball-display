import { useCallback, useEffect, useState } from "react";
import { formatTime } from "@/lib/utils";
import TimerDisplay, { TimerSize } from "@/components/TimerDisplay";

const TimerRemote = () => {
  const [currentTime, setCurrentTime] = useState<string>("00:00");

  const handleStorageChange = useCallback(() => {
    const savedTime = parseInt(localStorage.getItem("timer") ?? "0", 10);
    setCurrentTime(formatTime(savedTime));
  }, []);

  useEffect(() => {
    let savedTime = 0;

    if (typeof window !== "undefined") {
      savedTime = parseInt(localStorage?.getItem("timer") ?? "0", 10);
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentTime(formatTime(savedTime));

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [handleStorageChange]);

  return <TimerDisplay size={TimerSize.big} time={currentTime} />;
};

export default TimerRemote;
