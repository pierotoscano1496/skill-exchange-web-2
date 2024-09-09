import { ThemesType } from "@/enums/Themes";
import { VariantClasses } from "@/utils/types";
import classNames from "classnames";

interface TitleProps {
  label: string;
  variant?: ThemesType;
  className?: string;
  center?: boolean;
}

const variantClasses: VariantClasses = {
  primary: {
    text: "text-primary-900",
  },
  secondary: {
    text: "text-secondary-900",
  },
  accent: {
    text: "text-accent-900",
  },
  neutral: {
    text: "text-neutral-900",
  },
  hero: {
    text: "text-hero-900",
  },
  error: {
    text: "text-error-900",
  },
};

const SELargeTitle: React.FC<TitleProps> = ({
  label,
  className,
  variant = "primary",
  center = true,
}) => {
  return (
    <h2
      className={classNames(
        "text-3xl font-bold mb-6",
        variantClasses[variant]?.text,
        center && "text-center",
        className
      )}
    >
      {label}
    </h2>
  );
};

export default SELargeTitle;
