"use client";

import ComentarioServicioBody from "@/interfaces/requestbody/review/ComentarioServicioBody";
import { getServerInstanceAuthorized } from "@/utils/constants.server";
import { useState } from "react";

type Props = {
    comentarista: {
        id: string;
        nombres: string;
        apellidos: string;
    };
    idServicio: string;
}

export default ({ idServicio, comentarista }: Props) => {
    const [comentario, setComentario] = useState("");

    const comentarServicio = async () => {
        const bodyRequest: ComentarioServicioBody = {
            idServicio,
            idComentarista,
            nombresComentarista
        }
        const response = await getServerInstanceAuthorized().post(`servicios/comments/publish`, bodyRequest);
        return response.data;
    }

    return (
        <div className="form">
            <div className="form-control">
                <label htmlFor="comentario">Comentario:</label>
                <textarea value={comentario} onChange={(e) => setComentario(e.target.value)} />
            </div>
            <button onClick={comentarServicio}>Comentar</button>
        </div>
    )
}