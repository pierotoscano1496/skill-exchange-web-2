import classNames from "classnames";
import { ReactNode } from "react";

interface LinkButtonProps {
  link: string;
  className?: string;
  label: string;
  icon?: ReactNode;
  variant?: "primary" | "secondary" | "error";
  size?: "small" | "medium" | "large";
}

const SELinkButton: React.FC<LinkButtonProps> = ({
  link,
  label,
  icon,
  className,
  variant = "primary",
  size = "medium",
}) => {
  const baseStyles = "rounded-md font-montserrat transition-colors text-center";
  const variantStyles = `bg-${variant} text-white`;
  const sizeStyles =
    size === "small"
      ? "py-2 px-2"
      : size === "large"
        ? "py-4 px-6"
        : "py-3 px-4";

  return (
    <a
      className={classNames(baseStyles, variantStyles, sizeStyles, className)}
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
