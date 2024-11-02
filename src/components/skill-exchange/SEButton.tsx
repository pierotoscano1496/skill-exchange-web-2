import React, { ReactNode } from "react";
import classNames from "classnames";
import { ThemesType } from "@/enums/Themes";
import { ShapeClasses, ShapeStyles, VariantClasses } from "@/utils/types";
import { ShapeType } from "@/enums/Shapes";
import { SizeType } from "@/enums/Sizes";
import { ComponentModeType } from "@/enums/ComponentMode";

interface ButtonProps {
  label?: string;
  mode?: ComponentModeType;
  marginBottom?: number;
  shape?: ShapeType;
  icon?: ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  variant?: ThemesType;
  size?: SizeType;
  type?: "submit" | "reset" | "button";
}

const variantClasses: VariantClasses = {
  primary: {
    background: "bg-primary-200",
    text: "text-primary-200",
    hoverBackground600: "hover:bg-primary-600",
    hoverBackground100: "hover:bg-primary-100",
    border: "border-primary-200",
  },
  secondary: {
    background: "bg-secondary-200",
    text: "text-secondary-200",
    hoverBackground600: "hover:bg-secondary-600",
    hoverBackground100: "hover:bg-secondary-100",
    border: "border-secondary-200",
  },
  accent: {
    background: "bg-accent-200",
    text: "text-accent-200",
    hoverBackground600: "hover:bg-accent-600",
    hoverBackground100: "hover:bg-accent-100",
    border: "border-accent-200",
  },
  neutral: {
    background: "bg-neutral-200",
    text: "text-neutral-200",
    hoverBackground600: "hover:bg-neutral-600",
    hoverBackground100: "hover:bg-neutral-100",
    border: "border-neutral-200",
  },
  hero: {
    background: "bg-hero-light",
    text: "text-hero",
    hoverBackground600: "hover:bg-hero",
    border: "border-hero",
  },
  basic: {
    background: "bg-blue-200",
    text: "text-primary-900",
    border: "border-primary-900",
    hoverText: "hover:text-primary-300",
  },
};

const SEButton: React.FC<ButtonProps> = ({
  type = "button",
  label,
  mode = "filled",
  icon,
  shape = "rectangle",
  onClick,
  className,
  disabled = false,
  variant = "primary",
  size = "medium",
}) => {
  const baseStyles = "font-montserrat transition-colors text-center";
  const transitionStyles = `transition ease-out duration-500`;

  const sizeClassesDefintion: {
    [key in SizeType]: ShapeStyles;
  } = {
    small: {
      padding: "py-1 px-2",
      text: "text-sm",
    },
    large: {
      padding: "py-3 px-6",
      text: "text-lg",
    },
    medium: {
      padding: "py-2 px-4",
      text: "text-base",
    },
  };

  let shapeClasses: ShapeClasses = {
    circle: {
      padding: "p-0",
      dimensions: "w-6 h-6",
      margin: "rounded-full",
      flex: "flex items-center justify-center",
    },
    rectangle: {
      padding: sizeClassesDefintion[size].padding,
      text: sizeClassesDefintion[size].text,
      margin: "rounded-md",
    },
    noShape: {
      padding: "p-0",
      another: "bg-transparent hover:bg-blue-100 focus:outline-none",
    },
  };

  const modeClasses = () => {
    switch (mode) {
      case "filled":
        return classNames(
          variantClasses[variant]?.background,
          "text-white",
          variantClasses[variant]?.hoverBackground600
        );
      case "outline":
        return classNames(
          "bg-transparent",
          "border",
          variantClasses[variant]?.border,
          variantClasses[variant]?.text,
          variantClasses[variant]?.hoverBackground100,
          variantClasses[variant]?.hoverText
        );
      case "ghost":
        return classNames(
          "bg-transparent",
          variantClasses[variant]?.text,
          variantClasses[variant]?.hoverBackground100
        );
      case "flat":
        return classNames(
          "bg-transparent",
          variantClasses[variant]?.text,
          variantClasses[variant]?.hoverText
        );
      case "text":
        return classNames(
          "bg-transparent",
          variantClasses[variant]?.text,
          "hover:underline"
        );
      case "elevated":
        return classNames(
          variantClasses[variant]?.background,
          variantClasses[variant]?.text,
          variantClasses[variant]?.hoverBackground600,
          "shadow-lg"
        );
      case "floating":
        return classNames(
          variantClasses[variant]?.background,
          variantClasses[variant]?.text,
          variantClasses[variant]?.hoverBackground600,
          "rounded-full",
          "shadow-lg"
        );
      default:
        return classNames(
          variantClasses[variant]?.background,
          variantClasses[variant]?.text,
          variantClasses[variant]?.hoverBackground600
        );
    }
  };

  const shapeStyles = classNames(
    shapeClasses[shape]?.padding,
    shapeClasses[shape]?.dimensions,
    shapeClasses[shape]?.margin,
    shapeClasses[shape]?.text,
    shapeClasses[shape]?.another,
    shapeClasses[shape]?.flex
  );

  const disabledStyles =
    disabled && "bg-gray-400 text-gray-700 cursor-not-allowed";

  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(
        className,
        baseStyles,
        transitionStyles,
        shapeStyles,
        modeClasses(),
        disabledStyles
      )}
      disabled={disabled}
    >
      {icon && !label ? (
        // Si solo hay ícono y no etiqueta
        icon
      ) : (
        <div className="flex items-center justify-center">
          {icon && <span className="mr-2">{icon}</span>}
          {label}
        </div>
      )}
    </button>
  );
};

export default SEButton;
