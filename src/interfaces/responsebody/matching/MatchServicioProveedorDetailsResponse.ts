import { TipoMatchServicioEstado } from "@/utils/types";
import ServicioResponse from "../servicio/ServicioResponse";
import UsuarioResponse from "../usuario/UsuarioResponse";

export default interface MatchServicioProveedorDetailsResponse {
    id: string;
    servicio: ServicioResponse;
    proveedor: UsuarioResponse;
    //idServicio: string;
    //idCliente: string;
    fecha: number[];
    fechaInicio: number[];
    fechaCierre: number[];
    estado: TipoMatchServicioEstado;
    puntuacion: number;
    costo: number;
}