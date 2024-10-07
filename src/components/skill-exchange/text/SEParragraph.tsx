import { ThemesType } from "@/enums/Themes";
import { VariantClasses } from "@/utils/types";
import classNames from "classnames";

interface TextProps {
  content: string;
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
  content,
  className,
  variant = "primary",
}) => {
  return (
    <p
      className={classNames(
        "text-base",
        variantClasses[variant]?.text,
        className
      )}
    >
      {content}
    </p>
  );
};

export default SEParragraph;
