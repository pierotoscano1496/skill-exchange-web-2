import { WeightType } from "@/enums/Text";
import { ThemesType } from "@/enums/Themes";
import classNames from "classnames";
import React, { ReactNode } from "react";

interface LinkProps {
  link: string;
  className?: string;
  icon?: ReactNode;
  image?: {
    src: string;
    alt: string;
    className?: string;
  };
  children?: ReactNode;
  variant?: ThemesType; // Tema del enlace (primary, secondary, etc.)
  weight?: WeightType; // Grosor del texto (normal, bold)
}

const SELink: React.FC<LinkProps> = ({
  link,
  className,
  icon,
  image,
  children,
  variant = "primary",
  weight = "normal",
}) => {
  const variantClasses = {
    primary: "text-primary hover:text-primary-hover",
    secondary: "text-secondary hover:text-secondary-hover",
    accent: "text-accent hover:text-accent-hover",
    neutral: "text-neutral hover:text-neutral-hover",
    error: "text-error hover:text-error-hover",
  } as Record<ThemesType, string>;

  const baseStyles =
    "rounded-md font-montserrat transition-colors inline-flex items-center";

  const weightClasses = {
    normal: "font-normal",
    bold: "font-bold",
  }[weight];

  return (
    <a
      className={classNames(
        baseStyles,
        variantClasses[variant],
        weightClasses,
        className
      )}
      href={link}
    >
      {image && (
        <img
          src={image.src}
          alt={image.alt}
          className={classNames("inline-block mr-2", image.className)}
        />
      )}
      {children && <span>{children}</span>}
      {icon && <span className={classNames({ "ml-2": children })}>{icon}</span>}
    </a>
  );
};

SELink.displayName = "SELink";

export default SELink;
