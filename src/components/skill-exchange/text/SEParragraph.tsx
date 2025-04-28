import classNames from "classnames";
import React from "react";
import { ThemesType } from "@/enums/Themes";

interface SEParragraphProps {
  className?: string;
  children: React.ReactNode;
  theme?: ThemesType; // Tema del color (primary, secondary, etc.)
}

const SEParragraph: React.FC<SEParragraphProps> = ({
  className,
  children,
  theme = "primary", // Valor por defecto
}) => {
  return (
    <p
      className={classNames(
        "font-montserrat leading-relaxed text-base", // Clases base
        `text-${theme}`, // Aplica el color según el tema
        className // Permite sobrescribir o agregar nuevas clases
      )}
    >
      {children}
    </p>
  );
};

SEParragraph.displayName = "SEParragraph";

export default SEParragraph;
