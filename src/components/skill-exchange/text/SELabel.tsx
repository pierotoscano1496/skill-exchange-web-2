import classNames from "classnames";

interface LabelProps {
  className?: string;
  text: string;
  htmlFor?: string;
}

const SELabel: React.FC<LabelProps> = ({ className, text, htmlFor }) => {
  return (
    <label className={classNames(className, "font-semibold")} htmlFor={htmlFor}>
      {text}
    </label>
  );
};

export default SELabel;
