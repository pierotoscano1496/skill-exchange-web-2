import React from "react";

interface CardProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, description, children }) => {
  return (
    <div className="bg-fondo-tarjetas p-6 rounded-lg shadow-sm border border-bordes">
      <h2 className="text-accent-primary font-montserrat text-xl mb-2">
        {title}
      </h2>
      <p className="text-secondary font-open-sans mb-4">{description}</p>
      {children}
    </div>
  );
};

export default Card;
