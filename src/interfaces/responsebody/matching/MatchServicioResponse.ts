export default interface MatchServicioResponse {
    id: string;
    idServicio: string;
    idCliente: string;
    fecha: Date;
    fechaInicio: Date;
    fechaCierre: Date;
    estado: string;
    puntuacion: number;
    costo: number;
}