export default interface ComentarioServicioResponse{
    id: string;
    idServicio: string;
    idComentarista: string;
    nombresComentarista: string;
    apellidosComentarista: string;
    comentario: string;
    puntaje: number;
}