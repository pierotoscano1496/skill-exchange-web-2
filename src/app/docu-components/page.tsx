"use client";

import SEButton from "@/components/skill-exchange/SEButton";
import SECard from "@/components/skill-exchange/SECard";
import SEInput from "@/components/skill-exchange/form/SEInput";
import SELinkButton from "@/components/skill-exchange/SELinkButton";
import SENavbar from "@/components/skill-exchange/SENavbar";
import React from "react";

const Documentation: React.FC = () => {
  return (
    <div className="bg-fondo-principal text-primary min-h-screen p-8">
      <h1 className="text-accent-primary font-montserrat text-4xl mb-8">
        Documentación de Componentes
      </h1>

      <section className="mb-8">
        <h2 className="text-accent-secondary font-montserrat text-2xl mb-4">
          Button
        </h2>
        <SEButton
          label="Small button"
          onClick={() => {}}
          variant="secondary"
          size="small"
        />
        <SEButton
          label="Medium SEButton"
          onClick={() => {}}
          variant="primary"
          size="medium"
        />
        <SELinkButton label="Link" link="https://google.com" size="medium" />
        <pre className="bg-fondo-tarjetas p-4 mt-4 rounded-lg border border-bordes">
          {`
import React from 'react';
import classNames from 'classnames';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

const SEButton: React.FC<ButtonProps> = ({ label, onClick, variant = 'primary', size = 'medium' }) => {
  const baseStyles = 'rounded-md font-montserrat transition-colors';
  const variantStyles = variant === 'primary' ? 'bg-accent-primary text-white' : 'bg-accent-secondary text-white';
  const sizeStyles = size === 'small' ? 'py-1 px-2' : size === 'large' ? 'py-3 px-6' : 'py-2 px-4';

  return (
    <button onClick={onClick} className={classNames(baseStyles, variantStyles, sizeStyles)}>
      {label}
    </button>
  );
};

export default SEButton;
`}
        </pre>
      </section>

      <section className="mb-8">
        <h2 className="text-accent-secondary font-montserrat text-2xl mb-4">
          SECard
        </h2>
        <SECard
          title="Example SECard"
          description="This is an example card description."
        >
          <p>Additional content inside the card.</p>
        </SECard>
        <pre className="bg-fondo-tarjetas p-4 mt-4 rounded-lg border border-bordes">
          {`
import React from 'react';

interface CardProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

const SECard: React.FC<CardProps> = ({ title, description, children }) => {
  return (
    <div className="bg-fondo-tarjetas p-6 rounded-lg shadow-sm border border-bordes">
      <h2 className="text-accent-primary font-montserrat text-xl mb-2">{title}</h2>
      <p className="text-secondary font-open-sans mb-4">{description}</p>
      {children}
    </div>
  );
};

export default SECard;
`}
        </pre>
      </section>

      <section className="mb-8">
        <h2 className="text-accent-secondary font-montserrat text-2xl mb-4">
          SEInput
        </h2>
        <SEInput label="Example SEInput" value="" onChange={() => {}} />
        <pre className="bg-fondo-tarjetas p-4 mt-4 rounded-lg border border-bordes">
          {`
import React from 'react';

interface InputProps {
  label: string;
  type?: 'text' | 'password' | 'email';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SEInput: React.FC<InputProps> = ({ label, type = 'text', value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-accent-primary font-montserrat mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full p-2 bg-fondo-tarjetas rounded-md text-primary border border-bordes focus:outline-none focus:border-accent-primary"
      />
    </div>
  );
};

export default SEInput;
`}
        </pre>
      </section>

      <section className="mb-8">
        <h2 className="text-accent-secondary font-montserrat text-2xl mb-4">
          SENavbar
        </h2>
        <SENavbar />
        <pre className="bg-fondo-tarjetas p-4 mt-4 rounded-lg border border-bordes">
          {`
import React from 'react';
import Link from 'next/link';

const SENavbar: React.FC = () => {
  return (
    <nav className="bg-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-accent-primary font-montserrat text-2xl">ServiceExchange</div>
        <div className="flex space-x-4">
          <Link href="/">
            <a className="text-primary hover:text-accent-primary">Home</a>
          </Link>
          <Link href="/about">
            <a className="text-primary hover:text-accent-primary">About</a>
          </Link>
          <Link href="/contact">
            <a className="text-primary hover:text-accent-primary">Contact</a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default SENavbar;
`}
        </pre>
      </section>
    </div>
  );
};

export default Documentation;
