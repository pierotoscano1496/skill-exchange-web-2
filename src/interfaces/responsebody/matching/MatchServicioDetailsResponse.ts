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
    estado: string;
    puntuacion: number;
    costo: number;
}