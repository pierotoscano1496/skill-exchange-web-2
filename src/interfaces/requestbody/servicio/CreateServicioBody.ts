import ModalidadPagoBody from "./ModalidadPagoBody";
import RecursoMultimediaBody from "./RecursoMultimediaBody";

export default interface CreateServicioBody {
    titulo: string;
    descripcion: string;
    precio: number;
    idUsuario: string
    idSkill: string;
    /* modalidadesPago: ModalidadPagoBody[];
    recursosMultimedia: RecursoMultimediaBody[]; */
}