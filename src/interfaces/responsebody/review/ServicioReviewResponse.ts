import ComentarioServicioResponse from "./ComentarioServicioResponse";

export default interface ServicioReviewResponse {
    comentarios: ComentarioServicioResponse[];
    puntajePromedio: number;
}