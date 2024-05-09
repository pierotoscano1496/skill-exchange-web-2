import { TipoMatchServicioEstado } from "@/utils/types";
import ServicioResponse from "../servicio/ServicioResponse";
import UsuarioResponse from "../usuario/UsuarioResponse";

export default interface MatchServicioDetailsResponse {
    id: string;
    servicio: ServicioResponse;
    cliente: UsuarioResponse;
    //idServicio: string;
    //idCliente: string;
    fecha: Date;
    fechaInicio: Date;
    fechaCierre: Date;
    estado: TipoMatchServicioEstado;
    puntuacion: number;
    costo: number;
}