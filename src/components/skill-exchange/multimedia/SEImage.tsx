import classNames from "classnames";
import React from "react";

interface ImageProps {
  src: string;
  alt?: string;
  className?: string;
}

const SEImage: React.FC<ImageProps> = ({ src, alt, className }) => {
  return <img className={classNames(className)} src={src} alt={alt} />;
};
export default SEImage;
