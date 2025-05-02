import { ComponentModeType } from "@/enums/ComponentMode";
import { SizeType } from "@/enums/Sizes";
import { ThemesType } from "@/enums/Themes";
import classNames from "classnames";
import React, { ReactNode } from "react";

interface SECardProps {
  children?: ReactNode;
  className?: string;
  mode?: ComponentModeType; // Modalidad del card (filled, outline, ghost, text)
  variant?: ThemesType; // Tema del card (primary, secondary, etc.)
  size?: SizeType; // Tamaño del card (small, medium, large)
  orientation?: "vertical" | "horizontal"; // Orientación del contenido
}

const SECard: React.FC<SECardProps> = ({
  children,
  className,
  variant = "primary",
  size = "medium",
  mode = "filled",
  orientation = "vertical", // Por defecto, orientación vertical
}) => {
  const baseStyles =
    "flex justify-center items-center text-center rounded-md transform duration-300";
  const hoverStyles = "hover:scale-105";

  const sizeClasses = {
    small: "w-[10rem] py-2 px-4 text-sm",
    medium: "w-[15rem] py-3 px-6 text-base",
    large: "w-[20rem] py-4 px-8 text-lg",
  }[size];

  const variantClasses = {
    primary: "bg-primary text-primary-content border-primary",
    secondary: "bg-secondary text-secondary-content border-secondary",
    accent: "bg-accent text-accent-content border-accent",
    neutral: "bg-neutral text-neutral-content border-neutral",
    error: "bg-error text-error-content border-error",
  }[variant];

  const modeClasses = {
    filled: variantClasses,
    outline: `bg-transparent border ${variantClasses}`,
    ghost: `bg-transparent text-${variant} hover:bg-${variant}-hover`,
    text: `bg-transparent text-${variant} hover:underline`,
  }[mode];

  const orientationClasses =
    orientation === "vertical" ? "flex-col" : "flex-row";

  return (
    <div
      className={classNames(
        baseStyles,
        hoverStyles,
        sizeClasses,
        modeClasses,
        orientationClasses,
        className
      )}
    >
      {children}
    </div>
  );
};

export default SECard;
