"use client";

import React from "react";
import SEButton from "@/components/skill-exchange/SEButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const ButtonDemo: React.FC = () => {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Demostración de SEButton</h1>

      {/* Modos de botón */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Modos de Botón</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <SEButton label="Filled" mode="filled" onClick={handleClick} />
          <SEButton label="Outline" mode="outline" onClick={handleClick} />
          <SEButton label="Ghost" mode="ghost" onClick={handleClick} />
          <SEButton label="Flat" mode="flat" onClick={handleClick} />
          <SEButton label="Text" mode="text" onClick={handleClick} />
          <SEButton label="Elevated" mode="elevated" onClick={handleClick} />
          <SEButton
            label="Floating"
            mode="floating"
            shape="circle"
            icon={<FontAwesomeIcon icon={faCoffee} />}
            onClick={handleClick}
          />
        </div>
      </section>

      {/* Variantes de botón */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Variantes de Botón</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <SEButton label="Primary" variant="primary" onClick={handleClick} />
          <SEButton label="Accent" variant="accent" onClick={handleClick} />
          <SEButton label="Neutral" variant="neutral" onClick={handleClick} />
          <SEButton label="Hero" variant="hero" onClick={handleClick} />
        </div>
      </section>

      {/* Tamaños de botón */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Tamaños de Botón</h2>
        <div className="flex space-x-4 items-center">
          <SEButton label="Pequeño" size="small" onClick={handleClick} />
          <SEButton label="Mediano" size="medium" onClick={handleClick} />
          <SEButton label="Grande" size="large" onClick={handleClick} />
        </div>
      </section>

      {/* Formas de botón */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Formas de Botón</h2>
        <div className="flex space-x-4 items-center">
          <SEButton
            label="Rectángulo"
            shape="rectangle"
            onClick={handleClick}
          />
          <SEButton
            shape="circle"
            icon={<FontAwesomeIcon icon={faCoffee} />}
            onClick={handleClick}
          />
          <SEButton
            shape="noShape"
            icon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
            onClick={handleClick}
          />
        </div>
      </section>

      {/* Botones con íconos */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Botones con Íconos</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
          <SEButton
            label="Con Ícono"
            icon={<FontAwesomeIcon icon={faCoffee} />}
            onClick={handleClick}
          />
          <SEButton
            shape="circle"
            icon={<FontAwesomeIcon icon={faCoffee} />}
            onClick={handleClick}
          />
          <SEButton
            label="Ícono a la Derecha"
            icon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
            onClick={handleClick}
          />
          <SEButton
            shape="noShape"
            icon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
            onClick={handleClick}
          />
        </div>
      </section>

      {/* Botón Deshabilitado */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Botón Deshabilitado</h2>
        <SEButton label="Deshabilitado" disabled onClick={handleClick} />
      </section>
    </div>
  );
};

export default ButtonDemo;
