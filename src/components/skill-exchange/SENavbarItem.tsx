import React, { ReactNode, useState } from "react";
import classNames from "classnames";
import { VariantClasses } from "@/utils/types";
import { ThemesType } from "@/enums/Themes";

interface ItemProps {
  label: string;
  collapsed?: boolean;
  selected?: boolean;
  className?: string;
  link: string;
  icon: ReactNode;
  variant: ThemesType;
  hover?: boolean;
}

const variantClasses: VariantClasses = {
  primary: {
    background: "bg-primary-dark",
    hoverBackground600: "hover:bg-primary-600",
    hoverBackground100: "hover:bg-primary-100",
    text: "text-primary-600",
    text100: "text-primary-100",
  },
  accent: {
    background: "bg-accent-dark",
    text: "text-accent-600",
    hoverBackground600: "hover:bg-accent-600",
    hoverBackground100: "hover:bg-accent-100",
    text100: "text-accent-100",
  },
  neutral: {
    background: "bg-neutral-dark",
    text: "text-neutral-600",
    hoverBackground600: "hover:bg-neutral-600",
    hoverBackground100: "hover:bg-neutral-100",
    text100: "text-neutral-100",
  },
  hero: {
    background: "bg-hero-dark",
    text: "text-hero",
    hoverBackground600: "hover:bg-hero",
  },
};

const SENavbarItem = ({
  selected = false,
  className,
  collapsed,
  variant,
  link,
  label,
  icon,
}: ItemProps) => {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <li>
      <div
        className={classNames(
          className,
          selected && !collapsed && "border-l-primary-600 border-l-4",
          //variantClasses[variant]?.background,
          variantClasses[variant]?.hoverBackground600
        )}
        onMouseOver={() => setHover(true)}
      >
        <a
          className={classNames(
            "rounded-md font-montserrat transition-colors text-center flex",
            className,
            variantClasses[variant]?.text
          )}
          href={link}
        >
          {!collapsed && <span className="flex-1 text-left">{label}</span>}
          <span
            className={classNames(
              "ml-2",
              selected && collapsed && variantClasses[variant]?.text100
            )}
          >
            {icon}
          </span>
        </a>
      </div>
    </li>
  );
};

export default SENavbarItem;
