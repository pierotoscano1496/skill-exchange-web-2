import UsuarioResponse from "../usuario/UsuarioResponse";

export default interface ServicioResponse {
  id: string;
  proveedor: {
    id: string;
    nombres: string;
    apellidos: string;
    // agrega otros campos si los necesitas
  };
  titulo: string;
  descripcion: string;
  precio: number;
  precioMaximo: number;
  precioMinimo: number;
  tipoPrecio: string;
  ubicacion: string;
  modalidad: string;
  aceptaTerminos: boolean;
  disponibilidades: ServicioDisponibilidadResponse[];
  skills: ServicioSkillResponse[];
  modalidadesPago: ModalidadPagoResponse[];
  urlImagePreview?: string;
}

export interface ServicioDisponibilidadResponse {
  id: string;
  idServicio: string;
  dia: string;
  horaInicio: string;
  horaFin: string;
}

export interface ServicioSkillResponse {
  idServicio: string;
  idSkill: string;
}

export interface ModalidadPagoResponse {
  id: string;
  tipo: string;
  cuentaBancaria?: string;
  numeroCelular?: string;
  url?: string;
}
