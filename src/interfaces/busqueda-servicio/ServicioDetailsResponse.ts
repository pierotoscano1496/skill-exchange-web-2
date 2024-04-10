import Usuario from "../Usuario";
import MedioPagoResponse from "./MedioPagoResponse";
import RecursoMultimediaResponse from "./RecursoMultimediaResponse";

export default interface ServicioDetailsResponse {
    id: string;
    titulo: string;
    descripcion: string;
    precio: number;
    usuario: Usuario;
    modalidadesPago: MedioPagoResponse[];
    recursosMultimedia: RecursoMultimediaResponse[];
}