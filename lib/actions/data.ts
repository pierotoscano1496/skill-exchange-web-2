"use server";

import { apiService } from "../services/api-service";
import type {
  ApiResponse,
  Skill,
  Categoria,
  ServicioCreado,
  UploadResponse,
  ServicioBusqueda,
  BusquedaServiciosRequest,
  ServicioDetalle,
  ReviewsServicio,
  MatchServicioRequest,
  MatchServicioResponse,
  ChatMessageRequest,
  ChatResponse,
  SolicitudRecibida,
  SolicitudEnviada,
  OwnLastMessage,
  ChatConversation,
  Usuario,
  SkillInfo,
  SkillUsuario,
  SkillAsignadoResponse,
  AsignacionSkillToUsuarioRequest,
  CreateFirstMatchServicioBody,
} from "../types/api-responses";
import type {
  AceptarSolicitudRequest,
  RechazarSolicitudRequest,
  ConfirmarPagoRequest,
  FinalizarServicioRequest,
  ActualizarSolicitudResponse,
  ProcesoFinalizacion,
  ConfirmacionPago,
} from "../types/solicitud-updates";
import type {
  ServicioRequestBody,
  ServicioResponse,
} from "../api/servicio-api";
import { RegisterUserRequest } from "../types/user-registration";
import { MatchServicioEstado, UsuarioTipoDocumento } from "../constants/enums";

export async function postSimpleCheck(
  nombre: string
): Promise<ApiResponse<string>> {
  return apiService.postSimpleCheck(nombre);
}

export async function getSkills(): Promise<ApiResponse<Skill[]>> {
  return apiService.getSkills();
}

export async function getSkillsInfo(): Promise<ApiResponse<SkillInfo[]>> {
  return apiService.getSkillsInfo();
}

export async function getCategorias(): Promise<ApiResponse<Categoria[]>> {
  return apiService.getCategorias();
}

export async function getSubCategoriasByCategoria(
  idCategoria: string
): Promise<ApiResponse<any[]>> {
  return apiService.getSubCategoriasByCategoria(idCategoria);
}

export async function getSkillsBySubCategoria(
  idSubcategoria: string
): Promise<ApiResponse<Skill[]>> {
  return apiService.getSkillsBySubCategoria(idSubcategoria);
}

export async function createServicio(
  data: ServicioRequestBody
): Promise<ApiResponse<ServicioResponse>> {
  return apiService.createServicio(data);
}

export async function uploadFile(
  file: File
): Promise<ApiResponse<UploadResponse>> {
  return apiService.uploadFile(file);
}

export async function buscarServicios(
  filtros: BusquedaServiciosRequest
): Promise<ApiResponse<ServicioBusqueda[]>> {
  return apiService.buscarServicios(filtros);
}

export async function getServicioDetalle(
  id: string
): Promise<ApiResponse<ServicioDetalle>> {
  return apiService.getServicioDetalle(id);
}

export async function getServicioReviews(
  id: string
): Promise<ApiResponse<ReviewsServicio>> {
  return apiService.getServicioReviews(id);
}

export async function checkAvailableMatchForServicio(
  idServicio: string
): Promise<ApiResponse<boolean>> {
  return apiService.checkAvailableMatchForServicio(idServicio);
}

export async function getServiciosByProveedor(): Promise<
  ApiResponse<ServicioBusqueda[]>
> {
  return apiService.getServiciosByProveedor();
}

export async function getSolicitudesPrestamista(
  estado: MatchServicioEstado
): Promise<ApiResponse<SolicitudRecibida[]>> {
  return apiService.getSolicitudesPrestamista(estado);
}

export async function getSolicitudesEnviadas(
  idCliente: string
): Promise<ApiResponse<SolicitudEnviada[]>> {
  return apiService.getSolicitudesEnviadas(idCliente);
}

export async function createMatchServicio(
  data: MatchServicioRequest
): Promise<ApiResponse<MatchServicioResponse>> {
  return apiService.createMatchServicio(data);
}

export async function registrarMatch(
  data: CreateFirstMatchServicioBody
): Promise<ApiResponse<MatchServicioResponse>> {
  return apiService.registrarMatch(data);
}

export async function sendChatMessage(
  data: ChatMessageRequest
): Promise<ApiResponse<ChatResponse>> {
  return apiService.sendChatMessage(data);
}

export async function aceptarSolicitud(
  data: AceptarSolicitudRequest
): Promise<ApiResponse<MatchServicioResponse>> {
  return apiService.aceptarSolicitud(data);
}

export async function rechazarSolicitud(
  data: RechazarSolicitudRequest
): Promise<ApiResponse<ActualizarSolicitudResponse>> {
  return apiService.rechazarSolicitud(data);
}

export async function confirmarPago(
  data: ConfirmarPagoRequest
): Promise<ApiResponse<ActualizarSolicitudResponse>> {
  return apiService.confirmarPago(data);
}

export async function finalizarServicio(
  data: FinalizarServicioRequest
): Promise<ApiResponse<ActualizarSolicitudResponse>> {
  return apiService.finalizarServicio(data);
}

export async function getProcesoFinalizacion(): Promise<ProcesoFinalizacion> {
  return apiService.getProcesoFinalizacion();
}

export async function getConfirmacionPago(): Promise<ConfirmacionPago> {
  return apiService.getConfirmacionPago();
}

export async function getOwnChatConversations(): Promise<
  ApiResponse<OwnLastMessage[]>
> {
  return apiService.getOwnChatConversations();
}

export async function getChatConversation(
  idConversation: string
): Promise<ApiResponse<ChatConversation>> {
  return apiService.getChatConversation(idConversation);
}

export async function getAverageScoreMatchsProveedor(idProveedor: string) {
  return apiService.getAverageScoreMatchsProveedor(idProveedor);
}

export async function checkIfSkillIsPresentInServiciosFromProveedor(
  idSkill: string
): Promise<ApiResponse<boolean>> {
  return apiService.checkIfSkillIsPresentInServiciosFromProveedor(idSkill);
}

export async function deleteSkillFromProfile(
  skillId: string
): Promise<ApiResponse<boolean>> {
  return apiService.deleteSkillFromProfile(skillId);
}

export async function addSkillToProfile(
  skillUsuario: AsignacionSkillToUsuarioRequest
): Promise<ApiResponse<SkillAsignadoResponse>> {
  return apiService.addSkillToProfile(skillUsuario);
}

/* export async function getUsuario(): Promise<ApiResponse<Usuario>> {
  return apiService.getUsuario();
} */

export async function getOwnSkillsAsignados(): Promise<
  ApiResponse<SkillAsignadoResponse[]>
> {
  return apiService.getOwnSkillsAsignados();
}

export async function checkUserExists(
  tipo?: UsuarioTipoDocumento,
  documento?: string,
  correo?: string
): Promise<ApiResponse<boolean>> {
  return apiService.checkUserExists(tipo, documento, correo);
}

export async function registerUser(
  data: RegisterUserRequest
): Promise<ApiResponse<Usuario>> {
  return apiService.registerUser(data);
}

export async function getOwnSkillsInfo(): Promise<ApiResponse<SkillInfo[]>> {
  return apiService.getOwnSkillsInfo();
}
