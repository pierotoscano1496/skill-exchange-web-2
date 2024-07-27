import classNames from "classnames";

interface InputProps {
  type?: "text" | "password" | "email";
  name?: string;
  placeholder?: string;
  label?: string;
  value: string;
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
  className,
  onChange,
  onKeyDown,
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
      <input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="w-full p-2 bg-fondo-tarjetas rounded-md text-primary border border-bordes focus:outline-none focus:border-accent-primary"
      />
    </div>
  );
};

export default SEInput;
