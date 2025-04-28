import classNames from "classnames";
import React from "react";
import { ThemesType } from "@/enums/Themes";
import { TextSizeType, LevelType } from "@/enums/Text";

interface SETitleProps {
  children: React.ReactNode;
  className?: string;
  variant?: ThemesType; // Tema del color (primary, secondary, etc.)
  size?: TextSizeType; // Tamaño del texto basado en TextSize
  as?: LevelType; // Etiqueta HTML dinámica basada en Level
}

const SETitle: React.FC<SETitleProps> = ({
  children,
  className,
  variant = "primary", // Valor por defecto
  size = "medium", // Tamaño por defecto
  as: Component = "h2", // Etiqueta por defecto
}) => {
  return (
    <Component
      className={classNames(
        "font-montserrat font-bold leading-tight", // Clases base
        size, // Aplica el tamaño directamente desde TextSize
        `text-${variant}`, // Aplica el color según el tema
        className // Permite sobrescribir o agregar nuevas clases
      )}
    >
      {children}
    </Component>
  );
};

SETitle.displayName = "SETitle";

export default SETitle;
