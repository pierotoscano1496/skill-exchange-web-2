import { DiaServicio, TipoModalidadPago } from "@/utils/types";
import ModalidadPagoBody from "./ModalidadPagoBody";
import RecursoMultimediaBody from "./RecursoMultimediaBody";

export default interface CreateServicioBody {
  titulo: string;
  descripcion: string;
  precio: number;
  idProveedor: string;
  tipoPrecio: string;
  precioMinimo: number;
  precioMaximo: number;
  ubicacion: string;
  modalidad: string;
  aceptaTerminos: boolean;
  skills: {
    idSkill: string;
  }[];
  disponibilidades: {
    dia: DiaServicio;
    horaInicio: string;
    horaFin: string;
  }[];
  modalidadesPago: {
    tipo: TipoModalidadPago;
    cuentaBancaria: string;
    numeroCelular: string;
    url: string;
  }[];
  recursosMultimedia: FormData;
}
