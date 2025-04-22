import React from "react";
import SEContainer from "../containers/SEContainer";
import classNames from "classnames";
import { SizeType } from "@/enums/Sizes";
import { FormType } from "@/enums/Form";

interface FormProps {
  onSubmit?: () => void;
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
  let FormComp: FormType;

  let formProps;

  switch (formContent) {
    case "block":
      FormComp = "div";
      formProps = {};
      break;
    case "form":
      FormComp = "form";
      formProps = { onSubmit };
      break;
  }

  return (
    <FormComp
      className={classNames(
        {
          "max-w-7xl w-7/12": size === "large",
          "max-w-5xl w-5/12": size === "medium",
          "max-w-lg w-lg": size === "small",
          "max-w-[100%] w-full": size === "full",
        },
        "mx-auto p-6 bg-white shadow-xl rounded-xl mb-6",
        className
      )}
      {...formProps}
    >
      {children}
    </FormComp>
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
