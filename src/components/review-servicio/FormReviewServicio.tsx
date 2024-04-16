"use client";

import ComentarioServicioBody from "@/interfaces/requestbody/review/ComentarioServicioBody";
import { getServerInstanceAuthorized } from "@/utils/constants.server";
import { useState } from "react";
import reviewStyles from "@/app/styles/review/review-servicio.module.scss";

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
    const [puntaje, setPuntaje] = useState<number | undefined>();

    const puntajeOptions = [0, 1, 2, 3, 4, 5];

    const comentarServicio = async () => {
        const bodyRequest: ComentarioServicioBody = {
            idServicio,
            idComentarista: comentarista.id,
            nombresComentarista: comentarista.nombres,
            apellidosComentarista: comentarista.apellidos,
            comentario,
            puntaje: puntaje!
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
            <div className="form-control">
                <label htmlFor="puntaje">Puntaje:</label>
                <select name="puntaje" onChange={(e) => setPuntaje(e.target.value ? Number.parseInt(e.target.value) : undefined)}>
                    <option>--Seleccione--</option>
                    {puntajeOptions.map(n =>
                        <option value={n}>{n}</option>
                    )}
                </select>
                <div className={reviewStyles.rating}>
                    <span data-puntaje={puntaje}></span>
                    <span className={reviewStyles.puntaje}>{puntaje}</span>
                </div>
            </div>
            <button onClick={comentarServicio}>Comentar</button>
        </div>
    )
}