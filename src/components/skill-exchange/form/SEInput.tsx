import { InputType } from "@/enums/InputTypes";
import { InputThemesType } from "@/enums/Themes";
import classNames from "classnames";
import { HTMLInputAutoCompleteAttribute } from "react";

type NumericInputProps = {
  min?: number;
  max?: number;
  step?: string | number;
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

interface ExtraInformationProps {
  title?: string;
}

interface UXProps {
  autoComplete?: HTMLInputAutoCompleteAttribute;
}

interface InputProps {
  type?: InputType;
  name?: string;
  placeholder?: string;
  label?: string;
  value?: string | readonly string[] | number;
  defaultValue?: string | number | readonly string[];
  variant?: InputThemesType;
  className?: string;
  numericProps?: NumericInputProps;
  formatTextProps?: FormatTextProps;
  dateInputProps?: DateInputProps;
  extraInformationProps?: ExtraInformationProps;
  uxProps?: UXProps;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

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
  extraInformationProps,
  uxProps,
  onChange,
  onKeyDown,
}) => {
  const variantClasses = (
    {
      primary: classNames(
        "text-primary-600",
        "focus:border-primary",
        "bg-primary-50"
      ),
      accent: classNames(
        "text-accent-600",
        "focus:border-accent",
        "bg-accent-50"
      ),
      neutral: classNames(
        "text-neutral-600",
        "focus:border-neutral",
        "bg-neutral-50"
      ),
      error: classNames("text-error-600", "focus:border-error", "bg-error-50"),
    } as Record<InputThemesType, string>
  )[variant];

  const labelVariantStyles = {
    primary: "text-primary-600",
    accent: "text-accent-600",
    neutral: "text-neutral-600",
    error: "text-error-600",
  }[variant];

  // Preparar min y max según tipo de input
  const min =
    type === "number"
      ? numericProps?.min
      : type === "date"
        ? dateInputProps?.min?.toISOString().split("T")[0]
        : undefined;

  const max =
    type === "number"
      ? numericProps?.max
      : type === "date"
        ? dateInputProps?.max?.toISOString().split("T")[0]
        : undefined;

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
        id={name}
        name={name}
        type={type}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className={classNames(
          "w-full p-2 rounded-md border border-bordes focus:outline-none transition duration-200 ease-in-out shadow-input",
          variantClasses
        )}
        title={extraInformationProps?.title}
        min={min}
        max={max}
        step={numericProps?.step}
        pattern={formatTextProps?.pattern}
        maxLength={formatTextProps?.maxLength}
        inputMode={formatTextProps?.inputMode}
        autoComplete={uxProps?.autoComplete}
      />
    </div>
  );
};

export default SEInput;
