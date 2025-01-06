import { ExtendedSizeType } from "@/enums/Sizes";
import classNames from "classnames";

interface GridProps {
  children: React.ReactNode;
  columns?: number;
  gap?: number;
  className?: string;
  size?: ExtendedSizeType;
}

const SEGridContainer: React.FC<GridProps> = ({
  children,
  columns = 3,
  gap = 4,
  size = "full",
  className,
}) => {
  const sizeClasses = classNames({
    "max-w-lg": size === "small",
    "max-w-5xl": size === "medium",
    "max-w-7xl": size === "large",
    "max-w-[100%]": size === "full",
  });

  return (
    <div
      className={classNames(
        `grid grid-cols-${columns} mx-auto`,
        `gap-${gap}`,
        "mb-6",
        sizeClasses,
        className
      )}
    >
      {children}
    </div>
  );
};

export default SEGridContainer;
