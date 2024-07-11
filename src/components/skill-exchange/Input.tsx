import React from "react";

interface InputProps {
  label: string;
  type?: "text" | "password" | "email";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  value,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-accent-primary font-montserrat mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full p-2 bg-fondo-tarjetas rounded-md text-primary border border-bordes focus:outline-none focus:border-accent-primary"
      />
    </div>
  );
};

export default Input;
