import React from "react";

interface FormProps {
  onSubmit?: () => void;
  children: React.ReactNode;
}

const SEForm: React.FC<FormProps> = ({ children, onSubmit }) => {
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-xl rounded-xl">
      <form onSubmit={onSubmit}>{children}</form>
    </div>
  );
};

export default SEForm;
