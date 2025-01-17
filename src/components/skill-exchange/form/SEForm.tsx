import React from "react";
import SEContainer from "../containers/SEContainer";
import classNames from "classnames";
import { SizeType } from "@/enums/Sizes";

interface FormProps {
  onSubmit?: () => void;
  children: React.ReactNode;
  size?: ExtendedSizeType;
  formContent?: "form" | "block";
  inline?: boolean;
}

interface FormControlProps {
  children: React.ReactNode;
  column?: boolean;
}

type ExtendedSizeType = SizeType | "full";

const sizeClasses: { [key in ExtendedSizeType]: string } = {
  large: classNames("max-w-7xl", "w-7xl"),
  medium: classNames("max-w-5xl", "w-5xl"),
  small: classNames("max-w-lg", "w-lg"),
  full: classNames("max-w-[100%]", "w-[100%]"),
};

const SEForm: React.FC<FormProps> = ({
  children,
  onSubmit,
  size = "medium",
  formContent = "form",
  inline = false,
}) => {
  return (
    <div
      className={classNames(
        sizeClasses[size],
        "mx-auto p-6 bg-white shadow-xl rounded-xl mb-6"
      )}
    >
      {formContent === "form" && <form onSubmit={onSubmit}>{children}</form>}
      {formContent === "block" && <div>{children}</div>}
    </div>
  );
};

const SEFormFooter: React.FC<FormProps> = ({ children }) => {
  return <SEContainer className="my-6 justify-evenly">{children}</SEContainer>;
};

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
