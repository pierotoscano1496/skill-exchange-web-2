import React from "react";
import SEContainer from "../containers/SEContainer";
import classNames from "classnames";
import { SizeType } from "@/enums/Sizes";
import { FormType } from "@/enums/Form";

interface FormProps {
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  size?: ExtendedSizeType;
  formContent?: "form" | "block";
  inline?: boolean;
  className?: string;
}

interface FormControlProps {
  children: React.ReactNode;
  column?: boolean;
}

type ExtendedSizeType = SizeType | "full";

const SEForm: React.FC<FormProps> = ({
  children,
  onSubmit,
  size = "medium",
  formContent = "form",
  inline = false,
  className,
}) => {
  const sizeClasses = {
    small: "max-w-md w-full",
    medium: "max-w-3xl w-full",
    large: "max-w-6xl w-full",
    full: "max-w-full w-full",
  }[size];

  const FormComponent = formContent === "form" ? "form" : "div";

  return React.createElement(
    FormComponent,
    {
      className: classNames(
        sizeClasses,
        "mx-auto p-6 bg-white shadow-xl rounded-xl mb-6",
        inline ? "flex flex-row flex-wrap items-center" : "flex flex-col",
        className
      ),
      ...(formContent === "form" ? { onSubmit } : {}),
    },
    children
  );
};

const SEFormFooter: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <SEContainer className="my-6 justify-evenly">{children}</SEContainer>;

const SEFormControl: React.FC<FormControlProps> = ({
  children,
  column = true,
}) => {
  return (
    <div
      className={classNames(
        "mb-4",
        column ? "flex flex-col" : "flex flex-row items-center space-x-4"
      )}
    >
      {children}
    </div>
  );
};

export { SEFormFooter, SEFormControl };
export default SEForm;
