import { ThemesType } from "@/enums/Themes";
import { VariantClasses } from "@/utils/types";
import classNames from "classnames";
import React, { ReactNode } from "react";

interface SpanCardPropperties {
  children?: ReactNode;
  className?: string;
  variant?: ThemesType;
  size?: "small" | "medium" | "large";
}

const variantClasses: VariantClasses = {
  primary: {
    background: "bg-primary-400",
  },
  accent: {
    background: "bg-accent-400",
  },
  neutral: {
    background: "bg-neutral-400",
  },
  hero: {
    background: "bg-hero-light",
  },
};

const SESpanCard: React.FC<SpanCardPropperties> = ({
  children,
  className,
  variant,
  size,
}) => {
  const variantStyles =
    variant &&
    classNames(
      variantClasses[variant]?.background,
      variantClasses[variant]?.hoverBackground
    );

  return (
    <span
      className={classNames(
        "py-3 px-6 rounded-full bg-orange-500 text-white",
        "hover:py-4 hover:px-8",
        "transform duration-500",
        variantStyles,
        className
      )}
    >
      {children}
    </span>
  );
};

export default SESpanCard;
