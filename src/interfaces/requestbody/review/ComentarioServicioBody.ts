export default interface ComentarioServicioBody {
    idServicio: string;
    idComentarista: string;
    nombresComentarista: string;
    apellidosComentarista: string;
    comentario: string;
    puntaje: number;
}