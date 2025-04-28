import React, { ReactNode } from "react";
import classNames from "classnames";
import { ThemesType } from "@/enums/Themes";
import { ModeViewsType } from "@/enums/ModeViews";

interface ItemProps {
  children: ReactNode;
  collapsed?: boolean;
  selected?: boolean;
  className?: string;
  link: string;
  icon: ReactNode;
  variant: ThemesType;
  mode?: ModeViewsType;
}

const SENavbarItem: React.FC<ItemProps> = ({
  children,
  collapsed = false,
  selected = false,
  className,
  link,
  icon,
  variant,
  mode = "light",
}) => {
  const modeClasses = {
    light: "hover:bg-primary-600 hover:text-primary-100 text-primary-600",
    dark: "hover:bg-primary-100 hover:text-primary-600 text-primary-100",
  }[mode];

  const selectedClasses = {
    light: selected ? "bg-primary-600 text-primary-100" : "",
    dark: selected ? "bg-primary-100 text-primary-600" : "",
  }[mode];

  return (
    <li>
      <a
        href={link}
        className={classNames(
          "rounded-md font-montserrat transition-colors flex items-center p-4",
          modeClasses,
          selectedClasses,
          className
        )}
        aria-current={selected ? "page" : undefined}
      >
        <span className="ml-2">{icon}</span>
        {!collapsed && (
          <span className="flex-1 text-left ml-2">{children}</span>
        )}
      </a>
    </li>
  );
};

export default SENavbarItem;
