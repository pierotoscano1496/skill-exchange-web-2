import { ExtendedSizeType } from "@/enums/Sizes";
import classNames from "classnames";
import React from "react";

type Style = "container" | "text" | "block" | "none";
type Direction = "row" | "column";
type Justify = "start" | "end" | "center" | "evenly";
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
}) => {
  const justifyClasses = classNames({
    "justify-center": justify === "center",
    "justify-start": justify === "start",
    "justify-end": justify === "end",
    "justify-evenly": justify === "evenly",
  });

  const itemClasses = classNames({
    "items-start": align === "start",
    "items-end": align === "end",
    "items-center": align === "center",
    "items-stretch": align === "stretch",
  });

  const styleClasses = classNames({
    "p-6 bg-white shadow-xl rounded-xl": style === "container",
    "flex-col justify-center items-center": style === "text",
  });

  let directionClasses = classNames({
    "flex-col": direction === "column",
    "flex-row": direction === "row",
  });

  const sizeClasses = classNames({
    "max-w-lg w-lg": size === "small",
    "max-w-5xl w-5xl": size === "medium",
    "max-w-7xl w-7xl": size === "large",
    "max-w-[100%] w-full": size === "full",
    "w-fit": size === "content",
  });

  return (
    <div
      className={classNames(
        "flex",
        size !== "content" && "mx-auto",
        styleClasses,
        itemClasses,
        justifyClasses,
        wrap && "flex-wrap",
        directionClasses,
        sizeClasses,
        { "mb-6": style !== "none" },
        className
      )}
    >
      {children}
    </div>
  );
};

export default SEContainer;
