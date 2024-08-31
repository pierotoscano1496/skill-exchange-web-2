import { ThemesType } from "@/enums/Themes";
import { VariantClasses } from "@/utils/types";
import classNames from "classnames";

interface TextProps {
  label: string;
  variant?: ThemesType;
  className?: string;
}

const variantClasses: VariantClasses = {
  primary: {
    text: "text-primary-600",
  },
  secondary: {
    text: "text-secondary-600",
  },
  accent: {
    text: "text-accent-600",
  },
  neutral: {
    text: "text-neutral-600",
  },
  hero: {
    text: "text-hero-600",
  },
  error: {
    text: "text-error-600",
  },
};

const SEParragraph: React.FC<TextProps> = ({
  label,
  className,
  variant = "primary",
}) => {
  return (
    <h1
      className={classNames(
        "text-base",
        variantClasses[variant]?.text,
        className
      )}
    >
      {label}
    </h1>
  );
};

export default SEParragraph;
