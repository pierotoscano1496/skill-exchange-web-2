export default interface CreateUsuarioBody {
    dni: string;
    carnetExtranjeria: string;
    tipoDocumento: string;
    correo: string;
    nombres: string;
    apellidos: string;
    tipo: string;
    fechaNacimiento: Date;
    clave: string;
    perfilLinkedin: string;
    perfilFacebook: string;
    perfilInstagram: string;
    perfilTiktok: string;
    introduccion: string;
}