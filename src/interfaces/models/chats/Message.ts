export default interface Message {
    sentBy: string;
    fecha: Date;
    mensaje: string;
    resourceUrl?: string;
}