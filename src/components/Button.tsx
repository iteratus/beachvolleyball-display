import { type MouseEvent, type ReactNode } from "react";

export enum ButtonEnum {
  regular,
  stepUp,
  stepDown,
  emoji,
}

type ButtonProps = {
  children?: ReactNode;
  className?: string;
  emoji?: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: ButtonEnum;
};

const Button = ({
  children,
  className,
  emoji,
  onClick,
  type = ButtonEnum.regular,
}: ButtonProps) => {
  let usedChildren = children;

  let classNames =
    "rounded py-2 px-7 text-sm bg-button cursor-pointer hover:bg-buttonHover active:bg-buttonActive";

  if (type === ButtonEnum.stepUp) {
    usedChildren = "+";
    classNames = "rounded-full size-8 font-extrabold bg-stepper";
  } else if (type === ButtonEnum.stepDown) {
    usedChildren = "-";
    classNames = "rounded-full size-8 font-extrabold bg-stepper";
  } else if (emoji) {
    usedChildren = emoji;
    classNames = "text-3xl";
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
};

export default Button;
