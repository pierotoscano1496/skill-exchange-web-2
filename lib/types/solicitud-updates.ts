// Tipos para las actualizaciones de estado de solicitudes

export interface AceptarSolicitudRequest {
  idSolicitud: string;
  fechaInicio?: string;
}

export interface RechazarSolicitudRequest {
  idSolicitud: string;
  motivo: "no_disponible" | "fuera_area" | "precio_inadecuado" | "otro";
  detalleMotivo: string;
  sugerenciaAlternativa?: string;
}

export interface ConfirmarPagoRequest {
  idSolicitud: string;
  metodoPagoRecibido: "yape" | "transferencia" | "efectivo" | "tarjeta";
  montoRecibido: number;
  comprobantePago?: string;
  notasProveedor?: string;
}

export interface FinalizarServicioRequest {
  idSolicitud: string;
  resumenTrabajo: string;
  tiempoEmpleado?: number;
  materialesUtilizados?: string;
  recomendacionesCliente?: string;
  solicitudCalificacion: boolean;
}

export interface SolicitudActualizada {
  id: string;
  estadoAnterior: string;
  estadoNuevo: string;
  fechaActualizacion: string;
}

export interface ActualizarSolicitudResponse {
  success: boolean;
  message: string;
  solicitudActualizada: SolicitudActualizada;
}

export interface ProcesoFinalizacion {
  pasos: string[];
  tiempoEstimado: string;
  requisitos: string[];
  consecuencias: string[];
}

export interface ConfirmacionPago {
  mensaje: string;
  verificaciones: string[];
  advertencias: string[];
}

export interface ConfirmacionPagoRecepcionRequest {
  id: string;
  pagoCompletoAcordado: boolean;
  metodoPagoAcordado: boolean;
  comprobanteRecibido: boolean;
  montoRecibidoCorrecto: boolean;
  metodoPagoRecibido: "yape" | "transferencia" | "efectivo" | "tarjeta";
  montoRecibido: number;
  numeroComprobante?: string;
  notasAdicionales?: string;
  confirmacionEjecucionServicio: boolean;
  idMatchServicio: string;
}

export interface ConfirmacionPagoRecepcionResponse {
  id: string;
  matchServicio: import("../types/api-responses").MatchServicioResponse;
  pagoCompletoAcordado: boolean;
  metodoPagoAcordado: boolean;
  comprobanteRecibido: boolean;
  montoRecibidoCorrecto: boolean;
  metodoPagoRecibido: "yape" | "transferencia" | "efectivo" | "tarjeta";
  montoRecibido: number;
  numeroComprobante?: string;
  notasAdicionales?: string;
  confirmacionEjecucionServicio: boolean;
}
