import classNames from "classnames";
import React from "react";

type Size = "presentation" | "big" | "medium" | "small" | "minus";

interface ImageProps {
  src: string;
  alt?: string;
  className?: string;
  size?: Size;
}

const SEImage: React.FC<ImageProps> = ({ src, alt, className, size }) => {
  let sizeClassNames = "";

  if (size) {
    switch (size) {
      case "presentation":
        sizeClassNames = "w-[90%]";
        break;
      case "big":
        sizeClassNames = "w-[70%]";
        break;
      case "medium":
        sizeClassNames = "w-[50%]";
        break;
      case "small":
        sizeClassNames = "w-[30%]";
        break;
      case "minus":
        sizeClassNames = "w-[10%]";
        break;
    }
  }

  return (
    <img
      className={classNames(className, sizeClassNames)}
      src={src}
      alt={alt}
    />
  );
};
export default SEImage;
