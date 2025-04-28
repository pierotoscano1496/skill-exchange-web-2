import { ThemesType } from "@/enums/Themes";
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

const SETextarea: React.FC<TextareaProps> = ({
  label,
  value,
  name,
  variant = "primary",
  className,
  onChange,
  placeholder,
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

  return (
    <div className={classNames("mb-4", className)}>
      {label && (
        <label
          htmlFor={name}
          className={classNames(
            "block font-montserrat mb-2 font-medium",
            labelClasses
          )}
        >
          {label}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className={classNames(
          "w-full p-2 rounded-md border border-bordes focus:outline-none transition duration-200 ease-in-out shadow-input",
          variantClasses
        )}
        rows={4}
      />
    </div>
  );
};

export default SETextarea;
