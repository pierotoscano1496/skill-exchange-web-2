import classNames from "classnames";
import SEButton from "../SEButton";
import SETitle from "../text/SETitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
  title?: string;
  children: React.ReactNode;
  footerContent?: React.ReactNode;
  className?: string;
  onClose: () => void;
}

interface ModalFooterProps {
  onClose: () => void;
  textCancel?: string;
  onlyCancelButton?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const SEModalFooter: React.FC<ModalFooterProps> = ({
  onClose,
  className,
  textCancel = "Cancelar",
  onlyCancelButton = false,
  children,
}) => {
  return (
    <footer className={classNames("pb-0", className)}>
      {onlyCancelButton ? (
        <SEButton
          mode="text"
          variant="hero"
          label={textCancel}
          onClick={onClose}
        />
      ) : (
        children
      )}
    </footer>
  );
};

const SEModal: React.FC<ModalProps> = ({
  title = "Mensaje",
  children,
  className,
  footerContent = null,
  onClose,
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
          <SETitle
            size="large"
            className="flex-grow"
            label={title}
            center={true}
          />
          <SEButton
            onClick={onClose}
            shape="circle"
            variant="neutral"
            icon={<FontAwesomeIcon icon={faClose} />}
          />
        </header>
        <main
          className={classNames(
            "py-4 flex-grow overflow-auto",
            "container mx-auto"
          )}
        >
          {children}
        </main>
        <SEModalFooter onClose={onClose}>{footerContent}</SEModalFooter>
      </div>
    </div>
  );
};

export { SEModalFooter };
export default SEModal;
