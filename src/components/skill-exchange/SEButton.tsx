import React, { ReactNode } from "react";
import classNames from "classnames";
import { ThemesType } from "@/enums/Themes";
import { ShapeType } from "@/enums/Shapes";
import { SizeType } from "@/enums/Sizes";
import { ComponentModeType } from "@/enums/ComponentMode";

interface ButtonProps {
  children?: ReactNode;
  mode?: ComponentModeType; // Modalidad del botón (filled, outline, ghost, text)
  shape?: ShapeType; // Forma del botón (circle, rectangle, noShape)
  icon?: ReactNode; // Ícono opcional
  onClick?: () => void; // Función al hacer clic
  className?: string; // Clases adicionales
  disabled?: boolean; // Estado deshabilitado
  variant?: ThemesType; // Tema del botón (primary, secondary, etc.)
  size?: SizeType; // Tamaño del botón (small, medium, large)
  type?: "submit" | "reset" | "button"; // Tipo de botón
}

const SEButton: React.FC<ButtonProps> = ({
  type = "button",
  children,
  mode = "filled",
  shape = "rectangle",
  icon,
  onClick,
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
    primary: `bg-primary text-primary-content hover:bg-primary-hover`,
    secondary: `bg-secondary text-secondary-content hover:bg-secondary-hover`,
    accent: `bg-accent text-accent-content hover:bg-accent-hover`,
    neutral: `bg-neutral text-neutral-content hover:bg-neutral-hover`,
    error: `bg-error text-error-content hover:bg-error-hover`,
  }[variant];

  const modeClasses = {
    filled: variantClasses,
    outline: `bg-transparent border border-${variant} text-${variant}`,
    ghost: `bg-transparent text-${variant} hover:bg-${variant}-hover`,
    text: `bg-transparent text-${variant} hover:underline`,
  }[mode];

  const disabledClasses = disabled
    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
    : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
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
        {children && <span>{children}</span>}
      </span>
    </button>
  );
};

export default SEButton;
