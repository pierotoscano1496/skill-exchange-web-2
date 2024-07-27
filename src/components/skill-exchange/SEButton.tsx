import React from "react";
import classNames from "classnames";

interface ButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
}

const SEButton: React.FC<ButtonProps> = ({
  label,
  onClick,
  className,
  disabled = false,
  variant = "primary",
  size = "medium",
}) => {
  const baseStyles = "rounded-md font-montserrat transition-colors text-center";
  const variantStyles =
    variant === "primary"
      ? "bg-accent-primary text-white"
      : "bg-accent-secondary text-white";
  const sizeStyles =
    size === "small"
      ? "py-1 px-2"
      : size === "large"
        ? "py-3 px-6"
        : "py-2 px-4";

  return (
    <button
      onClick={onClick}
      className={classNames(baseStyles, variantStyles, sizeStyles, className)}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default SEButton;
