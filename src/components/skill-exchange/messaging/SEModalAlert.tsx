import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SEButton from "../SEButton";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import SETitle from "../text/SETitle";
import classNames from "classnames";

type Params = {
  title?: string;
  container?: boolean;
  children: React.ReactNode;
  onClose: () => void;
};

const SEModalAlert: React.FC<Params> = ({
  title = "Mensaje",
  container = false,
  children,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-35 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl mx-4 p-6 flex flex-col">
        <header className="flex justify-between items-center border-b border-gray-300 pb-2">
          <SETitle size="large" className="flex-grow">
            {title}
          </SETitle>
          <SEButton
            onClick={onClose}
            shape="circle"
            variant="primary" // <-- ahora usa primary
            icon={<FontAwesomeIcon icon={faClose} />}
          />
        </header>

        <main className={classNames("py-4", container && "container mx-auto")}>
          {children}
        </main>

        <footer className="flex justify-center pt-2 border-t border-gray-300">
          <SEButton variant="primary" onClick={onClose}>
            Cerrar
          </SEButton>
        </footer>
      </div>
    </div>
  );
};

SEModalAlert.displayName = "SEModalAlert";

export default SEModalAlert;
