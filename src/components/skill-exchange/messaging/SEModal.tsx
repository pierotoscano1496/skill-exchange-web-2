import classNames from "classnames";
import SEButton from "../SEButton";
import SETitle from "../text/SETitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
  title?: string;
  children: React.ReactNode;
  textCancel?: string;
  textAccept?: string;
  className?: string;
  onAccept?: () => void;
  onClose: () => void;
  showFootOptions?: boolean;
}

const SEModal: React.FC<ModalProps> = ({
  title = "Mensaje",
  children,
  className,
  textAccept = "Aceptar",
  textCancel = "Cancelar",
  onAccept,
  onClose,
  showFootOptions = true,
}) => {
  return (
    <div
      className={classNames(
        "fixed inset-0 bg-black bg-opacity-35 flex justify-center items-center z-50",
        className
      )}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 flex flex-col max-h-screen overflow-hidden">
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
            "container mx-auto"
          )}
        >
          {children}
        </main>
        {showFootOptions && (
          <footer className={classNames("pb-0", className)}>
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
