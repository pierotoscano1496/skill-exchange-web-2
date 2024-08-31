import { ThemesType } from "@/enums/Themes";
import { VariantClasses } from "@/utils/types";
import classNames from "classnames";

interface TextareaProps {
  value?: string | readonly string[] | number;
  label?: string;
  placeholder?: string;
  name?: string;
  variant?: ThemesType;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const variantClasses: VariantClasses = {
  primary: {
    background: "bg-primary-200",
    hoverBackground: "hover:bg-primary-600",
  },
  accent: {
    background: "bg-accent-200",
    hoverBackground: "hover:bg-accent-600",
  },
  neutral: {
    background: "bg-neutral-200",
    hoverBackground: "hover:bg-neutral-600",
  },
  hero: {
    background: "bg-hero-light",
    hoverBackground: "hover:bg-hero",
  },
};

const SETextarea: React.FC<TextareaProps> = ({
  label,
  value,
  name,
  variant = "primary",
  className,
  onChange,
  placeholder,
}) => {
  const labelVariantStyles = `text-${variant}`;
  const variantStyles = `text-${variant} focus:border-${variant}`;

  return (
    <div className={classNames("mb-4", className)}>
      {label && (
        <label
          htmlFor={name}
          className={classNames(
            "block font-montserrat mb-2",
            labelVariantStyles
          )}
        >
          {label}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className={classNames(
          "w-full p-2 bg-fondo-tarjetas rounded-md border border-bordes focus:outline-none",
          variantStyles
        )}
        rows={4}
      ></textarea>
    </div>
  );
};

export default SETextarea;
