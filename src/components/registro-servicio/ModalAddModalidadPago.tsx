"use client";

import AsignacionMedioPago from "@/interfaces/registro-servicio/AsignacionMedioPago";
import { TipoModalidadPago, TipoModalidadPagoOption } from "@/utils/types";
import { useEffect, useState } from "react";
import modalStyles from "@/app/styles/modal.module.scss";
import DragAndDrop from "../DragAndDrop";
import Tab from "../tabs/Tab";
import { FileData } from "@/interfaces/registro-servicio/FileData";
import YapeData from "@/interfaces/registro-servicio/YapeData";

type Props = {
    onSendDataFromYape: (yapeData: YapeData) => void;
    onSendDataFromCCI: (cci: string) => void;
    onClose: () => void;
}

export default ({
    onSendDataFromYape,
    onSendDataFromCCI,
    onClose
}: Props) => {
    const [activeTab, setActiveTab] = useState(1);
    const [numeroCelular, setNumeroCelular] = useState<string>("");
    const [codCuentaInterbancario, setCodCuentaInterbancario] = useState<string>("");
    const [attempSubmitYape, setAttempSubmitYape] = useState<boolean>(false);
    const [attempSubmitCCI, setAttempSubmitCCI] = useState<boolean>(false);

    useEffect(() => {
        return (() => {
            setActiveTab(1);
            setNumeroCelular("");
            setCodCuentaInterbancario("");
            setAttempSubmitYape(false);
            setAttempSubmitCCI(false);
        })
    }, []);

    const tabs = [
        { order: 1, label: "Yape" },
        { order: 2, label: "Tarjeta" }
    ];

    const acceptedFilesForQR = {
        "image/png": [".png"],
        "image/jpg": [".jpg", ".jpeg"]
    };

    const sendYapeData = (fileData?: FileData) => {
        if (numeroCelular) {
            const data: YapeData = {
                qrImage: fileData?.file,
                numCelular: numeroCelular
            }
            onSendDataFromYape(data);
        } else {
            setAttempSubmitYape(true);
        }
    }

    const sendCCI = () => {
        if (codCuentaInterbancario) {
            onSendDataFromCCI(codCuentaInterbancario);
        } else {
            setAttempSubmitCCI(true);
        }
    }

    return (
        <div className={`${modalStyles.modalContainer} ${modalStyles.fullScreen}`}>
            <div className={modalStyles.modal}>
                <header className={modalStyles.modalHeader}>
                    <h2>Asignar nuevo medio de pago</h2>
                </header>

                <main className={modalStyles.modalContent}>
                    <div className="tabs-container container column">
                        <div className="tabs">
                            {tabs.map((tab, index) => (
                                <Tab key={index}
                                    label={tab.label}
                                    onClick={() => setActiveTab(tab.order)}
                                    isActive={tab.order === activeTab}
                                />
                            ))}
                        </div>
                        <div className="tab-content">
                            {activeTab === 1 &&
                                <div className="form">
                                    <div className="form-control">
                                        <label htmlFor="yape-phone">Número de celular:</label>
                                        <input
                                            name="yape-phone"
                                            value={numeroCelular}
                                            onChange={(e) => setNumeroCelular(e.target.value)}
                                            type="tel"
                                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                            maxLength={9} />
                                        {(attempSubmitYape && !numeroCelular) && <p className="text-danger">Especifique un número donde se pueda yapear</p>}
                                    </div>
                                    <div className="form-control">
                                        <label htmlFor="yape-image">QR (opcional)</label>
                                        <DragAndDrop
                                            limit={1}
                                            required={false}
                                            acceptSelect={acceptedFilesForQR}
                                            onSendFilesData={(filesData) => sendYapeData(filesData[0])}
                                            onError={() => setAttempSubmitYape(true)}
                                        />
                                    </div>
                                </div>}
                            {activeTab === 2 &&
                                <div className="form">
                                    <label htmlFor="num-cci">Cuenta interbancaria:</label>
                                    <input
                                        name="num-cci"
                                        value={codCuentaInterbancario}
                                        onChange={(e) => setCodCuentaInterbancario(e.target.value)}
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9\s]{20}"
                                        autoComplete="cc-number"
                                        maxLength={20}
                                        placeholder="00000000000000000000"
                                    />
                                    {(attempSubmitCCI && !codCuentaInterbancario) && <p className="text-danger">Indique una cuenta bancaria</p>}
                                    <button className="btn-primary" onClick={sendCCI}>Agregar</button>
                                </div>}
                        </div>
                    </div>
                </main>

                <footer className={modalStyles.modalFooter}>
                    <button onClick={onClose}>Cancelar</button>
                </footer>
            </div>

        </div>
    )
};