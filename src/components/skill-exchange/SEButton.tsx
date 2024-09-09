import React, { ReactNode } from "react";
import classNames from "classnames";
import { ThemesType } from "@/enums/Themes";
import { ShapeClasses, ShapeStyles, VariantClasses } from "@/utils/types";
import { ShapeType } from "@/enums/Shapes";
import { SizeType } from "@/enums/Sizes";

interface ButtonProps {
  label?: string;
  marginBottom?: number;
  shape?: ShapeType;
  icon?: ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  variant?: ThemesType;
  size?: SizeType;
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
  shape = "rectangle",
  onClick,
  className,
  disabled = false,
  //marginBottom = 4,
  variant = "primary",
  size = "medium",
}) => {
  const baseStyles = "font-montserrat transition-colors text-center";
  const hoverStyles = "hover:text-white";
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
    },
    rectangle: {
      padding: sizeClassesDefintion[size].padding,
      text: sizeClassesDefintion[size].text,
      margin: "rounded-md",
    },
  };

  const variantStyles = classNames(
    variantClasses[variant]?.background,
    variantClasses[variant]?.hoverBackground
  );

  const shapeStyles = classNames(
    shapeClasses[shape]?.padding,
    shapeClasses[shape]?.dimensions,
    shapeClasses[shape]?.margin,
    shapeClasses[shape]?.text
  );

  return (
    <button
      onClick={onClick}
      className={classNames(
        className,
        baseStyles,
        hoverStyles,
        variantStyles,
        transitionStyles,
        shapeStyles
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
