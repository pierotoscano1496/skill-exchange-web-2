import classNames from "classnames";
import React from "react";
import { ThemesType } from "@/enums/Themes";

interface SESpanProps {
  className?: string;
  children: React.ReactNode;
  variant?: ThemesType; // Tema del color (primary, secondary, etc.)
}

const SESpan: React.FC<SESpanProps> = ({
  className,
  children,
  variant = "primary", // Valor por defecto
}) => {
  return (
    <span
      className={classNames(
        "font-montserrat text-base", // Clases base
        `text-${variant}`, // Aplica directamente la clase basada en el tema
        className // Permite sobrescribir o agregar nuevas clases
      )}
    >
      {children}
    </span>
  );
};

SESpan.displayName = "SESpan";

export default SESpan;
