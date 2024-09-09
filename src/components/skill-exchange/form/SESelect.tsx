import classNames from "classnames";

interface OptionSelect {
  value?: string | number;
  label: string;
}

interface SelectProps {
  options: OptionSelect[];
  type?: "text" | "number";
  initOption?: OptionSelect;
  value?: string | number;
  label?: string;
  name?: string;
  variant?: "primary" | "secondary";
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SESelect: React.FC<SelectProps> = ({
  label,
  initOption,
  type = "text",
  options,
  value,
  name,
  className,
  variant = "primary",
  onChange,
}) => {
  const variantStyles = `text-${variant} focus:border-${variant} bg-${variant}-100`;

  if (!initOption) {
    let defaultValueInitOption: OptionSelect = {
      label: "--Seleccione--",
      value: undefined,
    };
    switch (type) {
      case "text":
        defaultValueInitOption = { ...defaultValueInitOption, value: "" };
        break;
      case "number":
        defaultValueInitOption = { ...defaultValueInitOption, value: 0 };
        break;
      default:
        defaultValueInitOption = { ...defaultValueInitOption, value: "" };
    }

    initOption = defaultValueInitOption;
  }

  return (
    <div className={classNames("mb-4", className)}>
      {label && (
        <label
          htmlFor={name}
          className="block text-accent-primary font-montserrat mb-2"
        >
          {label}
        </label>
      )}
      <select
        value={value}
        name={name}
        onChange={onChange}
        className={classNames(
          "w-full p-2 bg-fondo-tarjetas rounded-md border border-bordes focus:outline-none",
          variantStyles
        )}
      >
        {[initOption, ...options].map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SESelect;
