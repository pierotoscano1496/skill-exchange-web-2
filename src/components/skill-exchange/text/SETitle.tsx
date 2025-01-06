import { LevelType, TextSizeType, WeightType } from "@/enums/Text";
import { ThemesType } from "@/enums/Themes";
import { VariantClasses } from "@/utils/types";
import classNames from "classnames";

interface TitleProps {
  label: string;
  variant?: ThemesType;
  className?: string;
  center?: boolean;
  weight?: WeightType;
  size?: TextSizeType;
}

const SETitle: React.FC<TitleProps> = ({
  label,
  className,
  variant = "primary",
  center = true,
  weight = "bold",
  size = "medium",
}) => {
  let TitleComp: LevelType;

  switch (size) {
    case "extraSmall":
      TitleComp = "h5";
      break;
    case "small":
      TitleComp = "h4";
      break;
    case "medium":
      TitleComp = "h3";
      break;
    case "large":
      TitleComp = "h2";
      break;
    case "extraLarge":
      TitleComp = "h1";
      break;
  }

  let classNameComponent = classNames(
    "font-bold mb-6",
    {
      "text-xs": size === "extraSmall",
      "text-sm": size === "small",
      "text-base": size === "medium",
      "text-2xl": size === "large",
      "text-4xl": size === "extraLarge",
    },
    {
      "font-normal": weight === "normal",
      "font-bold": weight === "bold",
      "font-extrabold": weight === "extraBold",
    },
    {
      "text-center": center,
    },
    {
      "text-primary-900": variant === "primary",
      "text-secondary-900": variant === "secondary",
      "text-accent-900": variant === "accent",
      "text-neutral-900": variant === "neutral",
      "text-hero-900": variant === "hero",
      "text-error-900": variant === "error",
    }
  );

  return (
    <TitleComp className={classNames(classNameComponent, className)}>
      {label}
    </TitleComp>
  );
};

export default SETitle;
