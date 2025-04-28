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

  const sizeClasses = {
    small: "max-w-2xl",
    medium: "max-w-3xl",
    large: "max-w-5xl",
    full: "max-w-7xl",
  }[size];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-35 flex justify-center items-center z-50">
      <div
        className={classNames(
          sizeClasses,
          "rounded-lg shadow-lg w-full mx-4 flex flex-col max-h-screen overflow-hidden",
          fullModalClassName ? fullModalClassName : "bg-white"
        )}
      >
        <header className="flex justify-between items-center px-6 pt-6">
          <SETitle size="large" className="flex-grow">
            {title}
          </SETitle>
          <SEButton
            onClick={onClose}
            shape="circle"
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
          <footer className="flex justify-end gap-4 px-6 py-4">
            {onClose && (
              <SEButton mode="text" onClick={onClose}>
                {textCancel}
              </SEButton>
            )}
            {onAccept && (
              <SEButton mode="text" onClick={onAccept}>
                {textAccept}
              </SEButton>
            )}
          </footer>
        )}
      </div>
    </div>
  );
};

SEModal.displayName = "SEModal";

export default SEModal;
