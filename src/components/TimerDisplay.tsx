import React from "react";
import localFont from "next/font/local";

const myFont = localFont({ src: "../../public/fonts/digital-7-mono.ttf" });

export enum TimerSize {
  regular,
  big,
}

interface TimerDisplayProps {
  size?: TimerSize;
  time: string;
}

export default function TimerDisplay({
  size = TimerSize.regular,
  time,
}: TimerDisplayProps) {
  const fontSize =
    size === TimerSize.big ? "text-clockFaceRemote" : "text-clockFaceGUI";

  return (
    <div className={`${myFont.className} ${fontSize} not-italic relative`}>
      <div className="text-clockBackdrop select-none">88:88</div>
      <div className="absolute left-0 top-0">{time}</div>
    </div>
  );
}
