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
                    <div className={`tab ${openTabPlataforma && "active"}`}>
                        <div>
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

                    <div className={`tab ${openTabArchivo && "active"}`}>
                        <div>
                            <p>Seleccione un archivo:</p>
                            <DragAndDrop sendFileHandler={(file) => {
                                setArchivo(file);
                                setMedio()
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