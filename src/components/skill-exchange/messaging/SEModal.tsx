import classNames from "classnames";
import SEButton from "../SEButton";
import SETitle from "../text/SETitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { ExtendedSizeType } from "@/enums/Sizes";

interface ModalProps {
  title?: string;
  children: React.ReactNode;
  textCancel?: string;
  textAccept?: string;
  className?: string;
  fullModalClassName?: string;
  onAccept?: () => void;
  onClose: () => void;
  onOpen?: () => void;
  showFootOptions?: boolean;
  size?: ExtendedSizeType;
}

const SEModal: React.FC<ModalProps> = ({
  title = "Mensaje",
  children,
  fullModalClassName,
  className,
  textAccept = "Aceptar",
  textCancel = "Cancelar",
  onAccept,
  onClose,
  onOpen,
  showFootOptions = true,
  size = "medium",
}) => {
  useEffect(() => {
    if (onOpen) {
      onOpen();
    }
  }, [onOpen]);

  return (
    <div
      className={classNames(
        "fixed inset-0 bg-black bg-opacity-35 flex justify-center items-center z-50"
      )}
    >
      <div
        className={classNames(
          {
            "max-w-2xl": size === "small",
            "max-w-3xl": size === "medium",
            "max-w-5xl": size === "large",
            "max-w-7xl": size === "full",
          },
          { "bg-white": !fullModalClassName },
          "rounded-lg shadow-lg w-full mx-4 flex flex-col max-h-screen overflow-hidden",
          fullModalClassName
        )}
      >
        <header className="flex justify-between px-6 pt-6">
          <SETitle size="large" className="flex-grow" label={title} />
          <SEButton
            onClick={onClose}
            shape="circle"
            variant="neutral"
            icon={<FontAwesomeIcon icon={faClose} />}
          />
        </header>
        <main
          className={classNames(
            "px-6 py-6 flex-grow overflow-auto",
            "container mx-auto",
            className
          )}
        >
          {children}
        </main>
        {showFootOptions && (
          <footer className={classNames("pb-0")}>
            {onClose && (
              <SEButton
                mode="text"
                variant="hero"
                label={textCancel}
                onClick={onClose}
              />
            )}
            {onAccept && (
              <SEButton mode="text" label={textAccept} onClick={onAccept} />
            )}
          </footer>
        )}
      </div>
    </div>
  );
};

export default SEModal;
