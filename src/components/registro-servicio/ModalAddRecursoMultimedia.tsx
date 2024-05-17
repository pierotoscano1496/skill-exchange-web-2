"use client";

import { useEffect, useState } from "react";
import SocialMediaRender from "../SocialMediaRender";
import AsignacionRecursoMultimedia from "@/interfaces/registro-servicio/AsignacionRecursoMultimedia";
import { MedioRecursoMultimedia } from "@/utils/types";
import DragAndDrop from "../DragAndDrop";
import modalStyles from "@/app/styles/modal.module.scss";
import Tab from "../tabs/Tab";
import { FileData } from "@/interfaces/registro-servicio/FileData";
import LinkData from "@/interfaces/registro-servicio/LinkData";

type Props = {
    onSendFilesDataFromDragAndDrop: (filesData: FileData[]) => void;
    onSendLinkDataFromPlataformas: (linkData: LinkData) => void;
    onErrorFromDragAndDrop: () => void;
    onErrorFromPlataformas: () => void;
    onClose: () => void;
}

export default ({ onSendLinkDataFromPlataformas,
    onClose,
    onSendFilesDataFromDragAndDrop,
    onErrorFromDragAndDrop,
    onErrorFromPlataformas
}: Props) => {
    const [linkPost, setLinkPost] = useState<string>("");
    const [activeTab, setActiveTab] = useState(1);
    const [medio, setMedio] = useState<MedioRecursoMultimedia>();
    //const [newLinkDataFromRender, setNewLinkDataFromRender] = useState<LinkData>();

    useEffect(() => {
        return (() => {
            setLinkPost("");
            setActiveTab(1);
            setMedio(undefined);
        })
    }, []);

    const tabs = [
        { order: 1, label: "Plataformas" },
        { order: 2, label: "Archivos" }
    ];

    const acceptedFilesForMultimedia = {
        "image/png": [".png"],
        "image/jpg": [".jpg", ".jpeg"],
        "image/bmp": [".bmp"],
        "image/gif": [".gif"],
        "video/mp4": [".mp4"],
        "video/mov": [".mov"],
        "video/wmv": [".wmv"],
        "video/avi": [".avi"]
    };

    const sendLinkDataFromRender = () => {
        if (medio && linkPost) {
            onSendLinkDataFromPlataformas({
                link: linkPost,
                medio
            });
        } else {
            onErrorFromPlataformas();
        }
    }

    return (
        <div className={`${modalStyles.modalContainer} ${modalStyles.fullScreen}`}>
            <div className={modalStyles.modal}>
                <header className={modalStyles.modalHeader}>
                    <h2>Añade contenido a tu servicio</h2>
                </header>

                <main className={modalStyles.modalContent}>
                    <div className="tabs-container container column">
                        <div className="tabs">
                            {tabs.map((tab, index) => (
                                <Tab key={index}
                                    label={tab.label}
                                    onClick={() => setActiveTab(index)}
                                    isActive={index === activeTab}
                                />
                            ))}
                        </div>
                        <div className="tab-content">
                            {activeTab === 0 &&
                                <div className="container column content-center center">
                                    <div className="form">
                                        <div className="form-control">
                                            <label htmlFor="link">Link:</label>
                                            <input name="link" type="url"
                                                value={linkPost}
                                                onChange={(e) => setLinkPost(e.target.value)}
                                                placeholder="" />
                                        </div>
                                    </div>
                                    <SocialMediaRender link={linkPost} onRender={(medio) => setMedio(medio)} />
                                    <button className="btn-primary" onClick={sendLinkDataFromRender}>Añadir</button>
                                </div>}
                            {activeTab === 1 &&
                                <DragAndDrop onSendFilesData={(filesData) => onSendFilesDataFromDragAndDrop(filesData)}
                                    acceptSelect={acceptedFilesForMultimedia}
                                    limit={3}
                                    onError={onErrorFromDragAndDrop} />}
                        </div>
                    </div>
                </main>

                <footer className={modalStyles.modalFooter}>
                    <button className="btn-secondary" onClick={onClose}>Cerrar</button>
                </footer>
            </div>
        </div>
    )
};