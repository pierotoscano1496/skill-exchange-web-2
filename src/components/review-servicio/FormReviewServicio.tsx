"use client";

import ComentarioServicioBody from "@/interfaces/requestbody/review/ComentarioServicioBody";
import { useState } from "react";
import reviewStyles from "@/app/styles/review/review-servicio.module.scss";
import { comentarServicio } from "@/actions/servicioreviews.actions";

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

    const comentar = async () => {
        if (puntaje && comentario) {
            const publishedComment = await comentarServicio({
                idServicio,
                idComentarista: comentarista.id,
                nombresComentarista: comentarista.nombres,
                apellidosComentarista: comentarista.apellidos,
                comentario,
                puntaje
            });
            return publishedComment;
        }
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
                    <option value="">--Seleccione--</option>
                    {puntajeOptions.map((n, i) =>
                        <option key={i} value={n}>{n}</option>
                    )}
                </select>
            </div>
            <div className={reviewStyles.rating}>
                <span data-puntaje={puntaje}></span>
                <span className={reviewStyles.puntaje}>{puntaje}</span>
            </div>
            <button className="btn-primary" onClick={comentar}>Comentar</button>
        </div>
    )
}