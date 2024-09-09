import classNames from "classnames";
import React from "react";

interface CardProps {
  title?: string;
  description: string;
  variant?: "primary" | "secondary" | "error" | "neutral" | "accent";
  children?: React.ReactNode;
}

const SECard: React.FC<CardProps> = ({
  title,
  description,
  variant = "primary",
  children,
}) => {
  const backgroundVariant = `bg-${variant}-200`;
  const variantStyles = `text-${variant}`;

  return (
    <div
      className={classNames(
        "p-6 rounded-lg shadow-sm border border-bordes",
        backgroundVariant
      )}
    >
      {title && (
        <h2
          className={classNames(
            "font-montserrat font-bold text-xl mb-2",
            variantStyles
          )}
        >
          {title}
        </h2>
      )}
      <p className="text-info font-semibold font-open-sans mb-4">
        {description}
      </p>
      {children}
    </div>
  );
};

export default SECard;
