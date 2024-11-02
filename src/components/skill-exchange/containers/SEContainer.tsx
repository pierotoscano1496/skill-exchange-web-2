import classNames from "classnames";
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  wrap?: boolean;
}

const SEContainer: React.FC<ContainerProps> = ({
  children,
  className,
  wrap = true,
}) => {
  return (
    <div
      className={classNames(className, "container flex", wrap && "flex-wrap")}
    >
      {children}
    </div>
  );
};

export default SEContainer;
