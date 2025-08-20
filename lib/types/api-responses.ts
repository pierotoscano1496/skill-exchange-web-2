import { MatchServicioEstado, UsuarioTipo } from "../constants/enums";

// Tipos de respuesta que coinciden con el backend
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Usuario {
  id: string;
  dni: string;
  carnetExtranjeria: string;
  tipoDocumento: "dni" | "carnet_extranjeria";
  correo: string;
  nombres: string;
  apellidos: string;
  tipo: UsuarioTipo;
  fechaNacimiento: string;
  perfilLinkedin: string;
  perfilFacebook: string;
  perfilInstagram: string;
  perfilTiktok: string;
  introduccion: string;
  foto?: string;
  skills: {
    id: string;
    nivelConocimiento: number;
    descripcion: string;
    descripcionDesempeno?: string;
    nombreCategoria?: string;
    nombreSubCategoria?: string;
  }[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  statusCode?: number; // Nuevo campo para el código de estado HTTP
}

export interface Skill {
  id: string;
  descripcion?: string;
  idSubCategoria: string;
  subCategoria?: Subcategoria;
}

export interface SkillInfo {
  id: string;
  descripcion: string;
  nombreSubCategoria: string;
  nombreCategoria: string;
}

export interface SkillUsuario {}

export interface Categoria {
  id: string;
  nombre: string;
  subCategorias: Subcategoria[];
}

export interface Subcategoria {
  id: string;
  nombre: string;
  idCategoria: string;
  categoria?: Categoria;
  skills: Skill[];
}

export interface ServicioCreado {
  id: string;
  titulo: string;
  descripcion: string;
  precio: number;
  estado: string;
  fechaCreacion: string;
}

export interface UploadResponse {
  url: string;
  filename: string;
  size: number;
}

// Tipos para búsqueda de servicios
export interface BusquedaServiciosRequest {
  keyWord?: string;
  idSkill?: string;
  idSubcategoria?: string;
  idCategoria?: string;
}

export interface Proveedor {
  id: string;
  dni?: string;
  carnetExtranjeria?: string;
  tipoDocumento: "dni" | "carnet_extranjeria";
  introduccion?: string;
  correo: string;
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;
  perfilLinkedin?: string;
  perfilFacebook?: string;
  perfilInstagram?: string;
  perfilTiktok?: string;
}

export interface DisponibilidadServicio {
  id: string;
  idServicio: string;
  dia:
    | "lunes"
    | "martes"
    | "miercoles"
    | "jueves"
    | "viernes"
    | "sabado"
    | "domingo";
  horaInicio: string;
  horaFin: string;
}

export interface SkillServicio {
  idServicio: string;
  idSkill: string;
  skill: Skill;
}

export interface ModalidadPagoServicio {
  id: string;
  tipo: "yape" | "tarjeta" | "linea" | "efectivo";
  cuentaBancaria?: string;
  numeroCelular?: string;
  url?: string;
}

export interface ServicioBusqueda {
  id: string;
  proveedor: Proveedor;
  titulo: string;
  descripcion: string;
  precio: number;
  precioMaximo?: number;
  precioMinimo?: number;
  tipoPrecio: "fijo" | "hora" | "rango";
  ubicacion: string;
  modalidad: "presencial" | "remoto" | "mixto";
  aceptaTerminos: boolean;
  disponibilidades: DisponibilidadServicio[];
  skills: SkillServicio[];
  modalidadesPago: ModalidadPagoServicio[];
  urlImagePreview?: string;
}

// Tipos para detalles de servicio y reviews
export interface ServicioDetalle extends ServicioBusqueda {
  // Extiende ServicioBusqueda ya que tienen la misma estructura
}

export interface ComentarioServicio {
  id: string;
  idServicio: string;
  idComentarista: string;
  nombresComentarista: string;
  apellidosComentarista: string;
  comentario: string;
  puntaje: number;
}

export interface ReviewsServicio {
  comentarios: ComentarioServicio[];
  puntajePromedio: number;
}

// Tipos para match de servicio
export interface MatchServicioRequest {
  idServicio: string;
  idCliente: string;
  puntuacion: number;
  costo: number;
}

export interface MatchServicioResponse {
  id: string;
  idServicio: string;
  idCliente: string;
  fecha: string;
  fechaInicio: string;
  fechaCierre: string;
  estado:
    | "solicitado"
    | "pendiente_pago"
    | "rechazado"
    | "ejecucion"
    | "finalizado";
  puntuacion: number;
  costo: number;
}

// Tipos para solicitudes recibidas (como prestamista)
export interface SolicitudRecibida {
  id: string;
  servicio: ServicioBusqueda;
  cliente: Proveedor; // Reutilizamos el tipo Proveedor para el cliente
  fecha: string;
  fechaInicio: string;
  fechaCierre: string;
  estado: MatchServicioEstado;
  puntuacion: number;
  costo: number;
  mensaje: string;
}

// NUEVO: Tipos para solicitudes enviadas (como cliente)
export interface SolicitudEnviada {
  id: string;
  servicio: ServicioBusqueda;
  proveedor: Proveedor;
  fecha: string;
  fechaInicio: string;
  fechaCierre: string;
  estado:
    | "solicitado"
    | "pendiente_pago"
    | "rechazado"
    | "ejecucion"
    | "finalizado";
  puntuacion: number;
  costo: number;
  mensaje: string;
}

// Tipos para chat
export interface ChatMessageRequest {
  idReceptor: string;
  mensaje: string;
  resourceUrl?: string;
}

export interface ChatContact {
  idContact: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
}

export interface ChatMessage {
  sentBy: string;
  fecha: string;
  mensaje: string;
  resourceUrl?: string;
}

export interface ChatResponse {
  id: string;
  contacts: ChatContact[];
  messages: ChatMessage[];
}

export interface OwnLastMessage {
  conversationId: string;
  contact: ChatContact;
  lastMessage: ChatMessage;
}

export interface ChatConversation {
  conversationId: string;
  otherContact: ChatContact;
  messages: ChatMessage[];
}
