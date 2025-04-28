import { ExtendedSizeType } from "@/enums/Sizes";
import classNames from "classnames";
import React from "react";

interface GridProps {
  children: React.ReactNode;
  columns?: number; // Columns en breakpoint md
  gap?: number; // Gap entre elementos
  className?: string;
  size?: ExtendedSizeType;
}

const SEGridContainer: React.FC<GridProps> = ({
  children,
  columns = 3,
  gap = 4,
  size = "full",
  className,
}) => {
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
        "grid",
        `gap-${gap}`, // puedes cambiar esto por `gap-[${gap}]` si pasas valores no válidos de Tailwind
        "grid-cols-1", // default para móviles
        `md:grid-cols-${columns}`, // breakpoint para tablets y más
        "mx-auto mb-6",
        sizeClasses,
        className
      )}
    >
      {children}
    </div>
  );
};

export default SEGridContainer;
