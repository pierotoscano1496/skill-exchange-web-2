import classNames from "classnames";

interface TextareaProps {
  value: string;
  label?: string;
  name?: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const SETextarea: React.FC<TextareaProps> = ({
  label,
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
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 bg-fondo-tarjetas rounded-md text-primary border border-bordes focus:outline-none focus:border-accent-primary"
        rows={4}
      ></textarea>
    </div>
  );
};

export default SETextarea;
