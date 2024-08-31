import React, { ReactNode } from "react";
import classNames from "classnames";
import { ThemesType } from "@/enums/Themes";
import { VariantClasses } from "@/utils/types";

interface ButtonProps {
  label?: string;
  marginBottom?: number;
  icon?: ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  variant?: ThemesType;
  size?: "small" | "medium" | "large";
}

const variantClasses: VariantClasses = {
  primary: {
    background: "bg-primary-200",
    hoverBackground: "hover:bg-primary-600",
  },
  accent: {
    background: "bg-accent-200",
    hoverBackground: "hover:bg-accent-600",
  },
  neutral: {
    background: "bg-neutral-200",
    hoverBackground: "hover:bg-neutral-600",
  },
  hero: {
    background: "bg-hero-light",
    hoverBackground: "hover:bg-hero",
  },
};

const SEButton: React.FC<ButtonProps> = ({
  label,
  icon,
  onClick,
  className,
  disabled = false,
  //marginBottom = 4,
  variant = "primary",
  size = "medium",
}) => {
  const baseStyles = "rounded-md font-montserrat transition-colors text-center";
  const hoverStyles = "hover:text-white";
  const transitionStyles = `transition ease-out duration-500`;
  const sizeStyles =
    size === "small"
      ? "py-1 px-2"
      : size === "large"
        ? "py-3 px-6"
        : "py-2 px-4";
  //const margin = `mb-${marginBottom}`;

  const variantStyles = classNames(
    variantClasses[variant]?.background,
    variantClasses[variant]?.hoverBackground
  );

  return (
    <button
      onClick={onClick}
      className={classNames(
        baseStyles,
        hoverStyles,
        variantStyles,
        sizeStyles,
        transitionStyles,
        className
      )}
      disabled={disabled}
    >
      {label ? (
        <>
          {label} {icon}
        </>
      ) : (
        icon
      )}
    </button>
  );
};

export default SEButton;
