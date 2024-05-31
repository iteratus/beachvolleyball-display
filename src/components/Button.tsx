import { type MouseEvent, type ReactNode } from "react";

export enum ButtonEnum {
  regular,
  stepUp,
  stepDown,
  delete,
}

type ButtonProps = {
  children?: ReactNode;
  className?: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: ButtonEnum;
};

export default function Button({
  children,
  className,
  onClick,
  type = ButtonEnum.regular,
}: ButtonProps) {
  let usedChildren = children;

  if (type === ButtonEnum.stepUp) {
    usedChildren = "+";
  } else if (type === ButtonEnum.stepDown) {
    usedChildren = "-";
  } else if (type === ButtonEnum.delete) {
    usedChildren = "X";
  }

  let classNames =
    "rounded py-2 px-7 text-sm bg-button cursor-pointer hover:bg-buttonHover active:bg-buttonActive";

  if (type === ButtonEnum.stepUp || type === ButtonEnum.stepDown) {
    classNames = "rounded-full size-8 font-extrabold bg-stepper";
  } else if (type === ButtonEnum.delete) {
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
