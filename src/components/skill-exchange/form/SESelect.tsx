import classNames from "classnames";
import { ThemesType } from "@/enums/Themes";

interface OptionSelect {
  value?: string | number;
  label: string;
  key?: number;
}

interface SelectProps {
  options: OptionSelect[];
  type?: "text" | "number";
  initOption?: OptionSelect;
  includeInitOption?: boolean;
  value?: string | number;
  label?: string;
  name?: string;
  variant?: ThemesType;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SESelect: React.FC<SelectProps> = ({
  label,
  initOption,
  includeInitOption = true,
  type = "text",
  options,
  value,
  name,
  className,
  variant = "primary",
  onChange,
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
      secondary: classNames(
        "text-secondary-600",
        "focus:border-secondary",
        "bg-secondary-50"
      ),
      hero: classNames("text-hero", "focus:border-hero", "bg-hero-light"),
      basic: classNames("text-blue-500", "focus:border-blue-500", "bg-blue-50"),
      "yape-purple": classNames(
        "text-yape-purple-600",
        "focus:border-yape-purple-500",
        "bg-yape-purple-50"
      ),
    } as Record<ThemesType, string>
  )[variant];

  const labelClasses = {
    primary: "text-primary-600",
    accent: "text-accent-600",
    neutral: "text-neutral-600",
    error: "text-error-600",
    secondary: "text-secondary-600",
    hero: "text-hero",
    basic: "text-blue-500",
    "yape-purple": "text-yape-purple-600",
  }[variant];

  // Copia segura del array de opciones
  let finalOptions = [...options];

  if (!initOption && includeInitOption) {
    let defaultValueInitOption: OptionSelect = {
      label: "--Seleccione--",
      value: type === "number" ? 0 : "",
    };
    finalOptions.unshift(defaultValueInitOption);
  }

  if (initOption) {
    finalOptions.unshift(initOption);
  }

  return (
    <div className={classNames("mb-4", className)}>
      {label && (
        <label
          htmlFor={name}
          className={classNames("block font-montserrat mb-2", labelClasses)}
        >
          {label}
        </label>
      )}
      <select
        value={value}
        name={name}
        onChange={onChange}
        className={classNames(
          "w-full p-2 rounded-md border border-bordes focus:outline-none",
          "shadow-input bg-fondo-tarjetas",
          variantClasses
        )}
      >
        {finalOptions.map((option) => (
          <option key={option.key || option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SESelect;
