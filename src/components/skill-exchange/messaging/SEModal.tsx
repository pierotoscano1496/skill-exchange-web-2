import classNames from "classnames";
import SEButton from "../SEButton";
import SEMediumTitle from "../text/SEMediumTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  onClose: () => void;
}

interface ModalFooterProps {
  onClose: () => void;
  textCancel?: string;
  onlyCancelButton?: boolean;
  children?: React.ReactNode;
}

const SEModalFooter: React.FC<ModalFooterProps> = ({
  onClose,
  textCancel = "Cancelar",
  onlyCancelButton = false,
  children,
}) => {
  return (
    <footer className="pb-0">
      {onlyCancelButton ? (
        <SEButton
          mode="text"
          variant="hero"
          label={textCancel}
          onClick={onClose}
        />
      ) : (
        children || (
          <SEButton
            mode="text"
            variant="hero"
            label={textCancel}
            onClick={onClose}
          />
        )
      )}
    </footer>
  );
};

const SEModal: React.FC<ModalProps> = ({
  title = "Mensaje",
  children,
  className,
  onClose,
}) => {
  return (
    <div
      className={classNames(
        "fixed inset-0 bg-black bg-opacity-35 flex justify-center items-center z-50",
        className
      )}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 p-6 flex flex-col max-h-screen overflow-hidden">
        <header className="flex justify-between border-b border-gray-300 pb-2">
          <SEMediumTitle className="flex-grow" label={title} center={true} />
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

        <SEModalFooter onClose={onClose} />
      </div>
    </div>
  );
};

export { SEModalFooter };
export default SEModal;
