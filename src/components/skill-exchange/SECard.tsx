import { ComponentModeType } from "@/enums/ComponentMode";
import { ThemesType } from "@/enums/Themes";
import { VariantClasses } from "@/utils/types";
import classNames from "classnames";
import React, { ReactNode } from "react";

interface SpanCardProps {
  children?: ReactNode;
  className?: string;
  mode?: ComponentModeType;
  variant?: ThemesType;
  size?: "small" | "medium" | "large";
}

const variantClasses: VariantClasses = {
  primary: {
    background: "bg-primary-500",
    text: "text-primary-200",
    text500: "text-primary-500",
    hoverBackground600: "hover:bg-primary-600",
    hoverBackground100: "hover:bg-primary-100",
    border: "border-primary-500",
  },
  secondary: {
    background: "bg-secondary-500",
    text: "text-secondary-200",
    text500: "text-secondary-500",
    hoverBackground600: "hover:bg-secondary-600",
    hoverBackground100: "hover:bg-secondary-100",
    border: "border-secondary-500",
  },
  accent: {
    background: "bg-accent-500",
    text: "text-accent-200",
    text500: "text-accent-500",
    hoverBackground600: "hover:bg-accent-600",
    hoverBackground100: "hover:bg-accent-100",
    border: "border-accent-500",
  },
  neutral: {
    background: "bg-neutral-500",
    text: "text-neutral-200",
    text500: "text-neutral-500",
    hoverBackground600: "hover:bg-neutral-600",
    hoverBackground100: "hover:bg-neutral-100",
    border: "border-neutral-500",
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
  },
};

const SECard: React.FC<SpanCardProps> = ({
  children,
  className,
  variant = "primary",
  size = "medium",
  mode = "filled",
}) => {
  const variantStyles =
    variant &&
    classNames(
      variantClasses[variant]?.background,
      variantClasses[variant]?.hoverBackground400,
      variantClasses[variant]?.text
    );

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
          variantClasses[variant]?.text500,
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

  return (
    <span
      className={classNames(
        "flex justify-between pb-2 flex-grow-0 w-[15rem]",
        "py-3 px-6 rounded-full",
        "hover:py-4 hover:px-8",
        "transform duration-300",
        "mx-3 my-6",
        variantStyles,
        modeClasses(),
        className
      )}
    >
      {children}
    </span>
  );
};

export default SECard;
