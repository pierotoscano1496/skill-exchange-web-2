import classNames from "classnames";
import React from "react";
import { ThemesType } from "@/enums/Themes";
import { WeightType } from "@/enums/Text";

interface LabelProps {
  className?: string;
  children: React.ReactNode;
  htmlFor?: string;
  theme?: ThemesType; // Tema del color (primary, secondary, etc.)
  weight?: WeightType; // Grosor del texto (normal, bold)
}

const SELabel: React.FC<LabelProps> = ({
  className,
  children,
  htmlFor,
  theme = "primary", // Valor por defecto
  weight = "normal", // Valor por defecto
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={classNames(
        "block font-montserrat mb-2", // Clases base comunes
        `text-${theme}`, // Aplica el color según el tema
        `font-${weight}`, // Aplica el grosor del texto
        className // Permite sobrescribir o agregar nuevas clases
      )}
    >
      {children}
    </label>
  );
};

export default SELabel;
