import React, { ReactNode } from "react";
import Link from "next/link";
import classNames from "classnames";
import { ThemesType } from "@/enums/Themes";
import { ShapeType } from "@/enums/Shapes";
import { SizeType } from "@/enums/Sizes";
import { ComponentModeType } from "@/enums/ComponentMode";

interface LinkButtonProps {
  link: string;
  children: ReactNode;
  mode?: ComponentModeType; // Modalidad del botón (filled, outline, ghost, text)
  shape?: ShapeType; // Forma del botón (circle, rectangle, noShape)
  icon?: ReactNode; // Ícono opcional
  className?: string; // Clases adicionales
  disabled?: boolean; // Estado deshabilitado
  variant?: ThemesType; // Tema del botón (primary, secondary, etc.)
  size?: SizeType; // Tamaño del botón (small, medium, large)
}

const SELinkButton: React.FC<LinkButtonProps> = ({
  link,
  children,
  mode = "filled",
  shape = "rectangle",
  icon,
  className,
  disabled = false,
  variant = "primary",
  size = "medium",
}) => {
  const baseStyles =
    "font-montserrat transition-colors text-center focus:outline-none";
  const transitionStyles = "transition ease-out duration-300";

  const sizeClasses = {
    small: "py-1 px-2 text-sm",
    medium: "py-2 px-4 text-base",
    large: "py-3 px-6 text-lg",
  }[size];

  const shapeClasses = {
    circle: "p-0 w-8 h-8 rounded-full flex items-center justify-center",
    rectangle: "rounded-md",
    noShape: "p-0 bg-transparent hover:bg-gray-100 focus:outline-none",
  }[shape];

  const variantClasses = {
    primary: "bg-primary text-primary-content hover:bg-primary-hover",
    secondary: "bg-secondary text-secondary-content hover:bg-secondary-hover",
    accent: "bg-accent text-accent-content hover:bg-accent-hover",
    neutral: "bg-neutral text-neutral-content hover:bg-neutral-hover",
    error: "bg-error text-error-content hover:bg-error-hover",
  }[variant];

  const modeClasses = {
    filled: variantClasses,
    outline: `bg-transparent border border-${variant} text-${variant}`,
    ghost: `bg-transparent text-${variant} hover:bg-${variant}-hover`,
    text: `bg-transparent text-${variant} hover:underline`,
  }[mode];

  const disabledClasses = disabled
    ? "pointer-events-none bg-gray-400 text-gray-700"
    : "";

  return (
    <Link
      href={link}
      className={classNames(
        baseStyles,
        transitionStyles,
        sizeClasses,
        shapeClasses,
        modeClasses,
        disabledClasses,
        className
      )}
    >
      <span className="flex items-center justify-center">
        {icon && (
          <span className={classNames(children ? "mr-2" : "")}>{icon}</span>
        )}
        <span>{children}</span>
      </span>
    </Link>
  );
};

SELinkButton.displayName = "SELinkButton";

export default SELinkButton;
