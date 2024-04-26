export default interface MensajeChat {
    id: string;
    mensaje: string;
    idEmisor: string;
    idReceptor: string;
    resourceUrl?: string;
    fecha: Date;
}