import UsuarioResponse from "../usuario/UsuarioResponse";

export default interface ServicioResponse {
  id: string;
  idSkill: string;
  //idUsuario: string;
  usuario: UsuarioResponse;
  precio: number;
  titulo: string;
  descripcion: string;
  urlImagePreview: string;
}
