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
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  variant?: ThemesType;
  size?: SizeType;
  type?: "submit" | "reset" | "button";
}

const variantClasses: VariantClasses = {
  primary: {
    background: "bg-primary-500",
    text: "text-primary-200",
    text500: "text-primary-500",
    hoverBackground600: "hover:bg-primary-600",
    hoverBackground100: "hover:bg-primary-100",
    border: "border-primary-500",
    disable: "bg-primary-200",
  },
  secondary: {
    background: "bg-secondary-500",
    text: "text-secondary-200",
    text500: "text-secondary-500",
    hoverBackground600: "hover:bg-secondary-600",
    hoverBackground100: "hover:bg-secondary-100",
    border: "border-secondary-500",
    disable: "bg-secondary-200",
  },
  accent: {
    background: "bg-accent-500",
    text: "text-accent-200",
    text500: "text-accent-500",
    hoverBackground600: "hover:bg-accent-600",
    hoverBackground100: "hover:bg-accent-100",
    border: "border-accent-500",
    disable: "bg-accent-200",
  },
  neutral: {
    background: "bg-neutral-500",
    text: "text-neutral-200",
    text500: "text-neutral-500",
    hoverBackground600: "hover:bg-neutral-600",
    hoverBackground100: "hover:bg-neutral-100",
    border: "border-neutral-500",
    disable: "bg-neutral-200",
  },
  hero: {
    background: "bg-hero-light",
    text: "text-hero",
    hoverBackground600: "hover:bg-hero",
    border: "border-hero",
  },
  basic: {
    background: "bg-blue-500",
    text: "text-primary-900",
    border: "border-primary-900",
    hoverText: "hover:text-primary-300",
    disable: "bg-blue-200",
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
      margin: "mb-4",
    },
    large: {
      padding: "py-3 px-6",
      text: "text-lg",
      margin: "mb-8",
    },
    medium: {
      padding: "py-2 px-4",
      text: "text-base",
      margin: "mb-6",
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

  const disabledStylesOption = classNames("bg-gray-500 cursor-not-allowed");
  const textDisabledStylesOption = classNames(
    "text-gray-700 cursor-not-allowed"
  );

  const modeClasses = () => {
    switch (mode) {
      case "filled":
        return disabled
          ? classNames(
              variantClasses[variant]?.disable,
              textDisabledStylesOption
            )
          : classNames(
              variantClasses[variant]?.background,
              "text-white",
              variantClasses[variant]?.hoverBackground600
            );
      case "outline":
        return disabled
          ? disabledStylesOption
          : classNames(
              "bg-transparent",
              "border",
              variantClasses[variant]?.border,
              variantClasses[variant]?.text500,
              variantClasses[variant]?.hoverBackground100,
              variantClasses[variant]?.hoverText
            );
      case "ghost":
        return disabled
          ? disabledStylesOption
          : classNames(
              "bg-transparent",
              variantClasses[variant]?.text,
              variantClasses[variant]?.hoverBackground100
            );
      case "flat":
        return disabled
          ? disabledStylesOption
          : classNames(
              "bg-transparent",
              variantClasses[variant]?.text,
              variantClasses[variant]?.hoverText
            );
      case "text":
        return disabled
          ? textDisabledStylesOption
          : classNames(
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

  /* const disabledStyles =
    disabled && "bg-gray-400 text-gray-700 cursor-not-allowed"; */

  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(
        className,
        baseStyles,
        transitionStyles,
        shapeStyles,
        modeClasses()
        /* disabledStyles */
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
