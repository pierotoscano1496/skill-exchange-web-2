import classNames from "classnames";

interface SelectProps {
  options: { value?: string | number; label: string }[];
  value: string | number | undefined;
  label?: string;
  name?: string;
  variant?: "primary" | "secondary";
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SESelect: React.FC<SelectProps> = ({
  label,
  options,
  value,
  name,
  className,
  variant = "primary",
  onChange,
}) => {
  const variantStyles = `text-${variant} focus:border-${variant} bg-${variant}-100`;

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
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SESelect;
