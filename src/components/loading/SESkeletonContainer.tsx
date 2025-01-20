import { ExtendedSizeType } from "@/enums/Sizes";
import classNames from "classnames";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { Direction } from "readline";
import "react-loading-skeleton/dist/skeleton.css";

type Align = "start" | "end" | "center" | "stretch";
type Style = "container" | "text" | "block" | "none";
type Justify = "start" | "end" | "center" | "evenly";

interface ContainerProps {
  className?: string;
  wrap?: boolean;
  style?: Style;
  direction?: Direction;
  size?: ExtendedSizeType;
  align?: Align;
  justify?: Justify;
  numSkeletons?: number;
  height?: number | string;
  width?: number | string;
}

const SESkeletonContainer: React.FC<ContainerProps> = ({
  className,
  wrap = true,
  style = "block",
  size = "full",
  numSkeletons = 1,
  direction = "row",
  justify = "center",
  align = "center",
  width,
  height,
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

  const sizeClasses = classNames({
    "w-lg": size === "small",
    "w-5xl": size === "medium",
    "w-7xl": size === "large",
    "w-full": size === "full",
  });

  let directionClasses = classNames({
    "flex-col": direction === "column",
    "flex-row": direction === "row",
  });

  return (
    <Skeleton
      className={classNames(
        sizeClasses,
        justifyClasses,
        wrap && "flex-wrap",
        itemClasses,
        directionClasses
      )}
      count={numSkeletons}
      height={height}
      width={width}
      borderRadius={style === "container" ? "0.75rem" : undefined}
    />
  );
};

export default SESkeletonContainer;
