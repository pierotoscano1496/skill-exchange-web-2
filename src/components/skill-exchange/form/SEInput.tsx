import { VariantClasses } from "@/utils/types";
import classNames from "classnames";

interface InputProps {
  type?: "text" | "password" | "email";
  name?: string;
  placeholder?: string;
  label?: string;
  value?: string | readonly string[] | number;
  variant?: "primary" | "secondary";
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const variantClasses: VariantClasses = {
  primary: {
    text: "text-primary-600",
    focus: "focus:border-primary",
    background: "bg-primary-100",
  },
  accent: {
    text: "text-accent-600",
    focus: "focus:border-accent",
    background: "bg-accent-100",
  },
  neutral: {
    text: "text-neutral-600",
    focus: "focus:border-neutral",
    background: "bg-neutral-100",
  },
  error: {
    text: "text-error-600",
    focus: "focus:border-error",
    background: "bg-error-100",
  },
};

const SEInput: React.FC<InputProps> = ({
  label,
  type = "text",
  name,
  placeholder,
  value,
  variant = "primary",
  className,
  onChange,
  onKeyDown,
}) => {
  const labelVariantStyles = classNames(variantClasses[variant]?.text);
  const variantStyles = classNames(
    variantClasses[variant]?.text,
    variantClasses[variant]?.focus,
    variantClasses[variant]?.background
  );

  return (
    <div className={classNames("mb-4", className)}>
      {label && (
        <label
          htmlFor={name}
          className={classNames(
            "block font-montserrat mb-2 font-medium",
            labelVariantStyles
          )}
        >
          {label}
        </label>
      )}
      <input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className={classNames(
          "w-full p-2 bg-fondo-tarjetas rounded-md border border-bordes focus:outline-none",
          variantStyles
        )}
      />
    </div>
  );
};

export default SEInput;
