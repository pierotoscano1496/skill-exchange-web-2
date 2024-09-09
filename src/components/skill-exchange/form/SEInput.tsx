import { VariantClasses } from "@/utils/types";
import classNames from "classnames";

type NumericInputProps = {
  min?: number;
  max?: number;
};

type DateInputProps = {
  min?: Date;
  max?: Date;
};

type FormatTextProps = {
  pattern?: string;
  maxLength?: number;
  inputMode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search";
};

interface InputProps {
  type?: "text" | "password" | "email" | "number" | "date";
  name?: string;
  placeholder?: string;
  label?: string;
  value?: string | readonly string[] | number;
  defaultValue?: string | number | readonly string[];
  variant?: "primary" | "secondary";
  className?: string;
  numericProps?: NumericInputProps;
  formatTextProps?: FormatTextProps;
  dateInputProps?: DateInputProps;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const variantClasses: VariantClasses = {
  primary: {
    text: "text-primary-600",
    focus: "focus:border-primary",
    background: "bg-primary-50",
  },
  accent: {
    text: "text-accent-600",
    focus: "focus:border-accent",
    background: "bg-accent-50",
  },
  neutral: {
    text: "text-neutral-600",
    focus: "focus:border-neutral",
    background: "bg-neutral-50",
  },
  error: {
    text: "text-error-600",
    focus: "focus:border-error",
    background: "bg-error-50",
  },
};

const SEInput: React.FC<InputProps> = ({
  label,
  type = "text",
  name,
  placeholder,
  value,
  defaultValue,
  variant = "primary",
  className,
  numericProps,
  formatTextProps,
  dateInputProps,
  onChange,
  onKeyDown,
}) => {
  const labelVariantStyles = classNames(variantClasses[variant]?.text);
  const variantStyles = classNames(
    variantClasses[variant]?.text,
    variantClasses[variant]?.focus,
    variantClasses[variant]?.background
  );

  let max, min;

  switch (type) {
    case "number":
      min = numericProps?.min;
      max = numericProps?.max;
      break;
    case "date":
      min = dateInputProps?.min?.toISOString().split("T")[0];
      max = dateInputProps?.max?.toISOString().split("T")[0];
      break;
    default:
      min = undefined;
      max = undefined;
  }

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
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className={classNames(
          "w-full p-2 bg-fondo-tarjetas rounded-md border border-bordes focus:outline-none transition duration-200 ease-in-out",
          variantStyles
        )}
        min={numericProps?.min}
        max={numericProps?.max}
        pattern={formatTextProps?.pattern}
        maxLength={formatTextProps?.maxLength}
        inputMode={formatTextProps?.inputMode}
      />
    </div>
  );
};

export default SEInput;
