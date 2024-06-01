import Usuario from "../Usuario";
import SkillResponse from "../responsebody/skill/SkillResponse";
import SubCategoriaResponse from "../responsebody/subCategoria/SubCategoriaResponse";
import MedioPagoResponse from "./MedioPagoResponse";
import RecursoMultimediaResponse from "./RecursoMultimediaResponse";

export default interface ServicioDetailsResponse {
    id: string;
    titulo: string;
    descripcion: string;
    precio: number;
    prestamista: Usuario;
    skill: SkillResponse;
    subCategoria: SubCategoriaResponse;
    categoria: SubCategoriaResponse;
    modalidadesPago: MedioPagoResponse[];
    recursosMultimedia: RecursoMultimediaResponse[];

}