import classNames from "classnames";
import React from "react";

type Size = "presentation" | "big" | "medium" | "small" | "minus";

interface ImageProps {
  src: string;
  alt?: string;
  className?: string;
  size?: Size;
  onClick?: () => void;
}

const SEImage: React.FC<ImageProps> = ({
  src,
  alt = "Imagen",
  className,
  size = "medium",
  onClick,
}) => {
  const sizeClasses = {
    presentation: "w-[90%]",
    big: "w-[70%]",
    medium: "w-[50%]",
    small: "w-[30%]",
    minus: "w-[10%]",
  } as Record<Size, string>;

  return (
    <img
      src={src}
      alt={alt}
      onClick={onClick}
      className={classNames(
        "rounded-md object-cover", // agregado para mejor calidad de imagen
        sizeClasses[size],
        className
      )}
    />
  );
};

SEImage.displayName = "SEImage";

export default SEImage;
