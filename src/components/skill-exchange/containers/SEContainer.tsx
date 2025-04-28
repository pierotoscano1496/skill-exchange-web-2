import { ExtendedSizeType } from "@/enums/Sizes";
import classNames from "classnames";
import React from "react";

type Style = "container" | "text" | "block" | "none";
type Direction = "row" | "column";
type Justify = "start" | "end" | "center" | "evenly" | "between" | "around";
type Align = "start" | "end" | "center" | "stretch";

interface ContainerProps {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  wrap?: boolean;
  style?: Style;
  direction?: Direction;
  size?: ExtendedSizeType;
  justify?: Justify;
  align?: Align;
  onClick?: () => void;
}

const SEContainer: React.FC<ContainerProps> = ({
  children,
  className,
  wrap = true,
  style = "block",
  direction = "row",
  size = "full",
  justify = "center",
  align = "center",
  onClick,
}) => {
  const justifyClasses = {
    center: "justify-center",
    start: "justify-start",
    end: "justify-end",
    evenly: "justify-evenly",
    between: "justify-between",
    around: "justify-around",
  }[justify];

  const alignClasses = {
    start: "items-start",
    end: "items-end",
    center: "items-center",
    stretch: "items-stretch",
  }[align];

  const styleClasses = {
    container: "p-6 bg-primary-50 shadow-md rounded-2xl", // Aplicando tu color primario más suave
    text: "flex-col justify-center items-center text-primary-800",
    block: "",
    none: "",
  }[style];

  const directionClasses = {
    column: "flex-col",
    row: "flex-row",
  }[direction];

  const sizeClasses = {
    small: "max-w-md w-full",
    medium: "max-w-3xl w-full",
    large: "max-w-6xl w-full",
    full: "max-w-full w-full",
    content: "w-fit",
    custom: "",
  }[size];

  return (
    <div
      className={classNames(
        "flex",
        size !== "content" && "mx-auto",
        wrap && "flex-wrap",
        justifyClasses,
        alignClasses,
        directionClasses,
        styleClasses,
        sizeClasses,
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default SEContainer;
