import classNames from "classnames";
import React, { ReactNode } from "react";

interface LinkProps {
  link: string;
  className?: string;
  label: string;
  icon?: ReactNode;
  variant?: "primary" | "secondary";
}

const SELink: React.FC<LinkProps> = ({
  link,
  className,
  label,
  icon,
  variant = "primary",
}) => {
  const baseStyles = "rounded-md font-montserrat transition-colors text-center";
  const variantStyles = `text-${variant}`;

  return (
    <a className={classNames(baseStyles, className, variantStyles)} href={link}>
      {icon ? (
        <>
          {label} {icon}
        </>
      ) : (
        label
      )}
    </a>
  );
};

export default SELink;
