import classNames from "classnames";

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
  variant?: "primary" | "secondary";
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
  const variantStyles = `text-${variant} focus:border-${variant} bg-${variant}-100`;

  if (!initOption && includeInitOption) {
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

    options.unshift(defaultValueInitOption);
  }

  if (initOption) {
    options.unshift(initOption);
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
        {options.map((option) => (
          <option key={option.key || option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SESelect;
