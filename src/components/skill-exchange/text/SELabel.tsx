import classNames from "classnames";
import React from "react";

interface LabelProps {
  className?: string;
  children: React.ReactNode | React.ReactNode[];
  htmlFor?: string;
}

const SELabel: React.FC<LabelProps> = ({ className, children, htmlFor }) => {
  return (
    <label className={classNames(className, "font-semibold")} htmlFor={htmlFor}>
      {children}
    </label>
  );
};

export default SELabel;
