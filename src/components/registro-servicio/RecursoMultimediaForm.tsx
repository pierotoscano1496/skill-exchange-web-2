"use client";

import { useState } from "react";
import SocialMediaRender from "../SocialMediaRender";
import AsignacionRecursoMultimedia from "@/interfaces/registro-servicio/AsignacionRecursoMultimedia";
import { MedioRecursoMultimedia } from "@/utils/types";
import DragAndDrop from "../DragAndDrop";

type TipoRecurso = "plataforma" | "archivo";

const RecursoMultimediaForm = ({ show, sendRecursoMultimediaToParent }: {
    show: boolean,
    sendRecursoMultimediaToParent: (recursoMultimedia: AsignacionRecursoMultimedia) => void
}) => {
    const [openTabPlataforma, setOpenTabPlataforma] = useState<boolean>(true);
    const [openTabArchivo, setOpenTabArchivo] = useState<boolean>(false);
    const [medio, setMedio] = useState<MedioRecursoMultimedia>();
    const [linkPost, setLinkPost] = useState<string>("");
    const [archivo, setArchivo] = useState<File>();

    const addRecursoMultimedia = (tipo: TipoRecurso) => {
        switch (tipo) {
            case "plataforma":
                sendRecursoMultimediaToParent({
                    medio: medio!,
                    url: linkPost
                });
                break;
            case "archivo":
                sendRecursoMultimediaToParent({
                    medio: medio!,
                    url: linkPost
                });
                break;
        }

    };

    return (
        <>
            <div>
                <h2>Añade contenido a tu servicio</h2>
                <div className="tabs-content">
                    <div className="tab" onClick={() => {
                        setOpenTabPlataforma(true);
                        setOpenTabArchivo(false);
                    }}>
                        <div className={`${openTabPlataforma && "active"}`}>
                            <label>Link:
                                <input type="url"
                                    value={linkPost}
                                    onChange={(e) => setLinkPost(e.target.value)}
                                    placeholder="" />
                                <h3>Previsualización:</h3>
                                <SocialMediaRender link={linkPost} setterMedio={(m) => setMedio(m)} />
                                <button onClick={() => addRecursoMultimedia("plataforma")}>Añadir</button>
                            </label>
                        </div>
                    </div>

                    <div className="tab" onClick={() => {
                        setOpenTabArchivo(true);
                        setOpenTabPlataforma(false);
                    }}>
                        <div className={`${openTabArchivo && "active"}`}>
                            <p>Seleccione un archivo:</p>
                            <DragAndDrop sendFileHandler={(file) => {
                                setArchivo(file);
                            }} sendMedio={(medioArchivo) => {
                                setMedio(medioArchivo);
                            }} />
                            <button onClick={() => addRecursoMultimedia("archivo")}>Añadir</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default RecursoMultimediaForm;