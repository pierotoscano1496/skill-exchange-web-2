import classNames from "classnames";

interface SelectProps {
  options: { value?: string | number; label: string }[];
  value: string | number | undefined;
  label?: string;
  name?: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SESelect: React.FC<SelectProps> = ({
  label,
  options,
  value,
  name,
  className,
  onChange,
}) => {
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
        className="w-full p-2 bg-fondo-tarjetas rounded-md text-primary border border-bordes focus:outline-none focus:border-accent-primary"
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
