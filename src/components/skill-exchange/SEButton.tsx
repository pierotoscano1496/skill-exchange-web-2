import React, { ReactNode } from "react";
import classNames from "classnames";

interface ButtonProps {
  label?: string;
  marginBottom?: number;
  icon?: ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "error";
  size?: "small" | "medium" | "large";
}

const SEButton: React.FC<ButtonProps> = ({
  label,
  icon,
  onClick,
  className,
  disabled = false,
  marginBottom = 4,
  variant = "primary",
  size = "medium",
}) => {
  const baseStyles = "rounded-md font-montserrat transition-colors text-center";
  const variantStyles = `bg-${variant} text-white`;
  const sizeStyles =
    size === "small"
      ? "py-1 px-2"
      : size === "large"
        ? "py-3 px-6"
        : "py-2 px-4";
  const margin = `mb-${marginBottom}`;

  return (
    <button
      onClick={onClick}
      className={classNames(baseStyles, variantStyles, sizeStyles, className)}
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
