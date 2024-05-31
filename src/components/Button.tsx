import React, { type MouseEvent, type ReactNode } from "react";

export enum ButtonType {
  regular,
  stepUp,
  stepDown,
  delete,
}

type ButtonProps = {
  children?: ReactNode;
  className?: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: ButtonType;
};

export default function Button({
  children,
  className,
  onClick,
  type = ButtonType.regular,
}: ButtonProps) {
  let usedChildren = children;

  if (type === ButtonType.stepUp) {
    usedChildren = "+";
  } else if (type === ButtonType.stepDown) {
    usedChildren = "-";
  } else if (type === ButtonType.delete) {
    usedChildren = "X";
  }

  let classNames =
    "rounded py-2 px-7 text-sm bg-button cursor-pointer hover:bg-buttonHover active:bg-buttonActive";

  if (type === ButtonType.stepUp || type === ButtonType.stepDown) {
    classNames = "rounded-full size-8 font-extrabold bg-stepper";
  } else if (type === ButtonType.delete) {
    classNames =
      "rounded-full size-8 font-extrabold bg-delete text-md leading-none";
  }

  return (
    <button
      type="button"
      className={`${classNames} ${className}`}
      onClick={onClick}
    >
      {usedChildren}
    </button>
  );
}
