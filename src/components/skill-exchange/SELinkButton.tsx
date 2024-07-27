import classNames from "classnames";

interface LinkButtonProps {
  link: string;
  className?: string;
  label: string;
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
}

const SELinkButton: React.FC<LinkButtonProps> = ({
  link,
  label,
  className,
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
      ? "py-2 px-2"
      : size === "large"
        ? "py-4 px-6"
        : "py-3 px-4";

  return (
    <a
      className={classNames(baseStyles, variantStyles, sizeStyles, className)}
      href={link}
    >
      {label}
    </a>
  );
};

export default SELinkButton;
