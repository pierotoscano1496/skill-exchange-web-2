export default interface UsuarioRegisteredResponse {
    id: string;
    dni: string;
    carnetExtranjeria: string;
    tipoDocumento: string;
    correo: string;
    nombres: string;
    apellidos: string;
    tipo: string;
    fechaNacimiento: Date;
    perfilLinkedin: string;
    perfilFacebook: string;
    perfilInstagram: string;
    perfilTiktok: string;
    introduccion: string;
}