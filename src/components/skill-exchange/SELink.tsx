import { VariantClasses } from "@/utils/types";
import classNames from "classnames";
import React, { ReactNode } from "react";

interface LinkProps {
  link: string;
  className?: string;
  label?: string;
  icon?: ReactNode;
  variant?: "primary" | "secondary";
}

const variantClasses: VariantClasses = {
  primary: {
    background: "bg-primary-dark",
    text: "text-primary-600",
  },
  accent: {
    background: "bg-accent-dark",
    text: "text-accent-600",
  },
  neutral: {
    background: "bg-neutral-dark",
    text: "text-neutral-600",
  },
  hero: {
    background: "bg-hero-dark",
    text: "text-hero",
  },
};

const SELink: React.FC<LinkProps> = ({
  link,
  className,
  label,
  icon,
  variant = "primary",
}) => {
  const baseStyles = "rounded-md font-montserrat transition-colors text-center";
  const variantStyles = classNames(
    //variantClasses[variant]?.background,
    variantClasses[variant]?.text
  );

  return (
    <a className={classNames(baseStyles, className, variantStyles)} href={link}>
      {label && <span>{label}</span>}
      {label && icon && <>&nbsp;</>}
      {icon && <span>{icon}</span>}
    </a>
  );
};

export default SELink;
