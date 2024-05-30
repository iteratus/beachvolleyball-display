import React, { useState, useEffect, useCallback } from "react";
import { formatTime } from "@/lib/utils";

export default function TimerDisplay() {
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

    setCurrentTime(formatTime(savedTime));

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [handleStorageChange]);

  return <div>Current time in localStorage: {currentTime}</div>;
}
