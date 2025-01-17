"use client";

import { useState } from "react";
import SEContainer from "../containers/SEContainer";
import { SizeType } from "@/enums/Sizes";
import classNames from "classnames";

interface StarProps {
  rating: number;
  onRate?: (rating: number) => void;
  focusable?: boolean;
  size?: SizeType;
  className?: string;
}

const StarRating: React.FC<StarProps> = ({
  rating,
  onRate,
  focusable = false,
  size = "medium",
  className,
}) => {
  const [hoverRating, setHoverRating] = useState<number>(0);
  const totalStars = 5;

  const handleMouseEnter = (index: number) => {
    setHoverRating(index + 1);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (index: number) => {
    if (onRate) {
      onRate(index + 1);
    }
  };

  return (
    <SEContainer style="none" className={className} size="content">
      {Array.from({ length: totalStars }, (_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          className={classNames(
            {
              "w-8 h-8": size === "medium",
              "w-4 h-4": size === "small",
              "w-12 h-12": size === "large",
            },
            index < (hoverRating || rating)
              ? "text-yellow-400"
              : "text-gray-300"
          )}
          fill="currentColor"
          viewBox="0 0 24 24"
          onMouseEnter={() => focusable && handleMouseEnter(index)}
          onMouseLeave={() => focusable && handleMouseLeave()}
          onClick={() => focusable && handleClick(index)}
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </SEContainer>
  );
};

export default StarRating;
