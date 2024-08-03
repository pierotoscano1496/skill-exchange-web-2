import classNames from "classnames";

interface InputProps {
  type?: "text" | "password" | "email";
  name?: string;
  placeholder?: string;
  label?: string;
  value: string;
  variant?: "primary" | "secondary";
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

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
  const labelVariantStyles = `text-${variant}`;
  const variantStyles = `text-${variant} focus:border-${variant} bg-${variant}-100`;

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
