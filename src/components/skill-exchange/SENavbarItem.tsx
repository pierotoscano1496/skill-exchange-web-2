import React, { ReactNode, useState } from "react";
import classNames from "classnames";
import { ThemesType } from "@/enums/Themes";
import { ModeViewsType } from "@/enums/ModeViews";

interface ItemProps {
  label: string;
  collapsed?: boolean;
  selected?: boolean;
  className?: string;
  link: string;
  icon: ReactNode;
  variant: ThemesType;
  mode?: ModeViewsType;
}

const SENavbarItem = ({
  selected = false,
  className,
  collapsed,
  variant,
  link,
  label,
  icon,
  mode = "light",
}: ItemProps) => {
  const variantClasses = classNames({
    "hover:bg-primary-600 hover:text-primary-100 text-primary-600":
      mode === "light",
    "hover:bg-primary-100 hover:text-primary-600 text-primary-600":
      mode === "dark",
  });

  const selectedClasses = classNames({
    "bg-primary-600 text-primary-100": selected && mode === "light",
    "bg-primary-100 text-primary-600": selected && mode === "dark",
  });

  return (
    <li>
      <div
        className={classNames(
          className,
          variantClasses,
          selectedClasses,
          "p-4"
        )}
      >
        <a
          className={classNames(
            "rounded-md font-montserrat transition-colors text-center flex",
            className
          )}
          href={link}
        >
          {!collapsed && <span className="flex-1 text-left">{label}</span>}
          <span className={classNames("ml-2")}>{icon}</span>
        </a>
      </div>
    </li>
  );
};

export default SENavbarItem;
