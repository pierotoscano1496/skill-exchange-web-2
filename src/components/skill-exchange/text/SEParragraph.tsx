import { TextAlignType } from "@/enums/Text";
import { ThemesType } from "@/enums/Themes";
import { WeightFontType } from "@/enums/WeightFont";
import { VariantClasses } from "@/utils/types";
import classNames from "classnames";

interface TextProps {
  children: React.ReactNode | string;
  variant?: ThemesType;
  className?: string;
  weight?: WeightFontType;
  onClick?: () => void;
  align?: TextAlignType;
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
  children,
  className,
  variant = "primary",
  weight,
  onClick,
  align = "start",
}) => {
  let fontWeightClass;
  switch (weight) {
    case "normal":
      fontWeightClass = "font-normal";
      break;
    case "thin":
      fontWeightClass = "font-thin";
      break;
    case "light":
      fontWeightClass = "font-light";
      break;
    case "semibold":
      fontWeightClass = "font-semibold";
      break;
    case "bold":
      fontWeightClass = "font-bold";
      break;
    default:
      fontWeightClass = "font-normal";
  }

  return (
    <p
      className={classNames(
        "text-base",
        variantClasses[variant]?.text,
        fontWeightClass,
        "w-full",
        className,
        {
          "text-start": align === "start",
          "text-center": align === "center",
          "text-end": align === "end",
          "text-justify": align === "justify",
        }
      )}
      onClick={onClick}
    >
      {children}
    </p>
  );
};

export default SEParragraph;
