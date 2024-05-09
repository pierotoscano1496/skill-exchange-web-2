import { TipoMatchServicioEstado } from "@/utils/types";

export default interface MatchServicioResponse {
    id: string;
    idServicio: string;
    idCliente: string;
    fecha: Date;
    fechaInicio: Date;
    fechaCierre: Date;
    estado: TipoMatchServicioEstado;
    puntuacion: number;
    costo: number;
}