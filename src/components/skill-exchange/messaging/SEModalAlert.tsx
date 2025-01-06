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

export default ({
  title = "Mensaje",
  container = false,
  children,
  onClose,
}: Params) => {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-35 flex justify-center items-center z-50`}
    >
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl mx-4 p-6 flex flex-col">
        <header className="flex justify-between border-b border-gray-300 pb-2">
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

        <main className={classNames("py-4", container && "container mx-auto")}>
          {children}
        </main>

        <footer className="flex justify-center pt-2 border-t border-gray-300">
          <SEButton onClick={onClose} label="Cerrar" variant="primary" />
        </footer>
      </div>
    </div>
  );
};
