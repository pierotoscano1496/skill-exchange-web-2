import { ThemesType } from "@/enums/Themes";
import { VariantClasses } from "@/utils/types";
import classNames from "classnames";
import { ReactNode } from "react";

interface LinkButtonProps {
  link: string;
  className?: string;
  label: string;
  icon?: ReactNode;
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
};

const SELinkButton: React.FC<LinkButtonProps> = ({
  link,
  label,
  icon,
  className,
  variant = "primary",
  size = "medium",
}) => {
  const baseStyles = "rounded-md font-montserrat transition-colors text-center";
  const hoverStyles = "hover:text-white";
  const transitionStyles = `transition ease-out duration-500`;
  const sizeStyles =
    size === "small"
      ? "py-2 px-2"
      : size === "large"
        ? "py-4 px-6"
        : "py-3 px-4";

  const variantStyles = classNames(
    variantClasses[variant]?.background,
    variantClasses[variant]?.hoverBackground
  );

  return (
    <a
      className={classNames(
        baseStyles,
        hoverStyles,
        variantStyles,
        sizeStyles,
        transitionStyles,
        className
      )}
      href={link}
    >
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

export default SELinkButton;
