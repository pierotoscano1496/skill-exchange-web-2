"use client";

import { useState } from "react";
import SocialMediaRender from "../SocialMediaRender";
import AsignacionRecursoMultimedia from "@/interfaces/registro-servicio/AsignacionRecursoMultimedia";
import { MedioRecursoMultimedia } from "@/utils/types";

type TipoRecurso = "plataforma" | "archivo";

const RecursoMultimediaForm = () => {
    const [openTabPlataforma, setOpenTabPlataforma] = useState<boolean>(true);
    const [openTabArchivo, setOpenTabArchivo] = useState<boolean>(false);
    const [medio, setMedio] = useState<MedioRecursoMultimedia>();
    const [linkPost, setLinkPost] = useState<string>("");

    const addRecursoMultimedia = (tipo: TipoRecurso) => {
        
    };

    const handleArrastraArchivo=()=>{
        
    }

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
                                <button onClick={ }>Añadir</button>
                            </label>
                        </div>
                    </div>

                    <div className={`tab ${openTabPlataforma && "active"}`}>
                        <div>
                            <p>Seleccione un archivo:</p>
                            <div className="drop-area" onDrag={handleArrastraArchivo}>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default RecursoMultimediaForm;