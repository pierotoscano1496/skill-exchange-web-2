"use client";

import AsignacionMedioPago from "@/interfaces/registro-servicio/AsignacionMedioPago";
import { TipoModalidadPago, TipoModalidadPagoOption } from "@/utils/types";
import { useEffect, useState } from "react";
import modalStyles from "@/app/styles/modal.module.scss";
import DragAndDrop from "../DragAndDrop";
import Tab from "../tabs/Tab";
import { FileData } from "@/interfaces/registro-servicio/FileData";
import YapeData from "@/interfaces/registro-servicio/YapeData";
import SEModal from "../skill-exchange/messaging/SEModal";
import classNames from "classnames";
import SEForm from "../skill-exchange/form/SEForm";
import SEInput from "../skill-exchange/form/SEInput";
import SEParragraph from "../skill-exchange/text/SEParragraph";
import SELabel from "../skill-exchange/text/SELabel";
import SEDragAndDrop from "../skill-exchange/multimedia/SEDragAndDrop";
import SEButton from "../skill-exchange/SEButton";
import { SEFormControl } from "@/components/skill-exchange/form/SEForm";

type Props = {
  onSendDataFromYape: (yapeData: YapeData) => void;
  onSendDataFromCCI: (cci: string) => void;
  onClose: () => void;
};

const ModalAddModalidadPago = ({
  onSendDataFromYape,
  onSendDataFromCCI,
  onClose,
}: Props) => {
  const [activeTab, setActiveTab] = useState(1);
  const [numeroCelular, setNumeroCelular] = useState<string>("");
  const [codCuentaInterbancario, setCodCuentaInterbancario] =
    useState<string>("");
  const [attempSubmitYape, setAttempSubmitYape] = useState<boolean>(false);
  const [attempSubmitCCI, setAttempSubmitCCI] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      setActiveTab(0);
      setNumeroCelular("");
      setCodCuentaInterbancario("");
      setAttempSubmitYape(false);
      setAttempSubmitCCI(false);
    };
  }, []);

  const tabs = [
    { order: 1, label: "Yape" },
    { order: 2, label: "Tarjeta" },
  ];

  const acceptedFilesForQR = {
    "image/png": [".png"],
    "image/jpg": [".jpg", ".jpeg"],
  };

  const sendYapeData = (fileData?: FileData) => {
    if (numeroCelular) {
      const data: YapeData = {
        qrImage: fileData?.file,
        numCelular: numeroCelular,
      };
      onSendDataFromYape(data);
    } else {
      setAttempSubmitYape(true);
    }
  };

  const sendCCI = () => {
    if (codCuentaInterbancario) {
      onSendDataFromCCI(codCuentaInterbancario);
    } else {
      setAttempSubmitCCI(true);
    }
  };

  return (
    <SEModal title="Método de pago" onClose={onClose}>
      <div className="mx-5 my-auto">
        <div className="flex">
          {tabs.map((tab, index) => (
            <div
              key={tab.label}
              className={classNames(
                "cursor-pointer w-full border-solid border-4 border-b-0 px-4 py-2",
                index === activeTab && "bg-primary-300"
              )}
              onClick={() => setActiveTab(index)}
            >
              {tab.label}
            </div>
          ))}
        </div>
        <div className="border-2 border-solid border-white">
          {activeTab === 0 && (
            <SEForm>
              <SEFormControl>
                <SEInput
                  name="yape-phone"
                  label="Número de celular"
                  value={numeroCelular}
                  onChange={(e) => setNumeroCelular(e.target.value)}
                  type="tel"
                  formatTextProps={{
                    pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
                    maxLength: 9,
                  }}
                />
                {attempSubmitYape && !numeroCelular && (
                  <SEParragraph variant="error">
                    Especifique un número donde se pueda yapear
                  </SEParragraph>
                )}
              </SEFormControl>
              <SEFormControl column={true}>
                <SELabel htmlFor="yape-image">Imagen del QR (opcional)</SELabel>
                <SEDragAndDrop
                  limit={1}
                  required={false}
                  acceptSelect={acceptedFilesForQR}
                  onSendFilesData={(filesData) => sendYapeData(filesData[0])}
                  onError={() => setAttempSubmitYape(true)}
                />
              </SEFormControl>
            </SEForm>
          )}
          {activeTab === 1 && (
            <SEForm>
              <SEInput
                label="Cuenta interbancaria"
                name="num-cci"
                value={codCuentaInterbancario}
                onChange={(e) => setCodCuentaInterbancario(e.target.value)}
                formatTextProps={{
                  inputMode: "numeric",
                  pattern: "[0-9s]{20}",
                  maxLength: 20,
                }}
                uxProps={{ autoComplete: "cc-number" }}
                placeholder="00000000000000000000"
              />
              {attempSubmitCCI && !codCuentaInterbancario && (
                <SEParragraph variant="error">
                  Indique una cuenta bancaria
                </SEParragraph>
              )}
              <SEButton label="Agregar" onClick={sendCCI} />
            </SEForm>
          )}
        </div>
      </div>
    </SEModal>
  );
};

ModalAddModalidadPago.displayName = "ModalAddModalidadPago";

export default ModalAddModalidadPago;
