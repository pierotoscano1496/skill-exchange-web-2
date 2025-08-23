"use server";

import { isStaticMode } from "../config/environment";
import { apiService } from "../services/api-service";
import { staticService } from "../services/static-service";
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
import { UsuarioTipoDocumento } from "../constants/enums";

const getService = () => (isStaticMode() ? staticService : apiService);

export async function postSimpleCheck(
  nombre: string
): Promise<ApiResponse<string>> {
  return getService().postSimpleCheck(nombre);
}

export async function getSkills(): Promise<ApiResponse<Skill[]>> {
  return getService().getSkills();
}

export async function getSkillsInfo(): Promise<ApiResponse<SkillInfo[]>> {
  return getService().getSkillsInfo();
}

export async function getCategorias(): Promise<ApiResponse<Categoria[]>> {
  return getService().getCategorias();
}

export async function getSubCategoriasByCategoria(
  idCategoria: string
): Promise<ApiResponse<any[]>> {
  return getService().getSubCategoriasByCategoria(idCategoria);
}

export async function getSkillsBySubCategoria(
  idSubcategoria: string
): Promise<ApiResponse<Skill[]>> {
  return getService().getSkillsBySubCategoria(idSubcategoria);
}

export async function createServicio(
  data: ServicioRequestBody
): Promise<ApiResponse<ServicioResponse>> {
  return getService().createServicio(data);
}

export async function uploadFile(
  file: File
): Promise<ApiResponse<UploadResponse>> {
  return getService().uploadFile(file);
}

export async function buscarServicios(
  filtros: BusquedaServiciosRequest
): Promise<ApiResponse<ServicioBusqueda[]>> {
  return getService().buscarServicios(filtros);
}

export async function getServicioDetalle(
  id: string
): Promise<ApiResponse<ServicioDetalle>> {
  return getService().getServicioDetalle(id);
}

export async function getServicioReviews(
  id: string
): Promise<ApiResponse<ReviewsServicio>> {
  return getService().getServicioReviews(id);
}

export async function getServiciosByProveedor(): Promise<
  ApiResponse<ServicioBusqueda[]>
> {
  return getService().getServiciosByProveedor();
}

export async function getSolicitudesPrestamista(
  idPrestamista: string
): Promise<ApiResponse<SolicitudRecibida[]>> {
  return getService().getSolicitudesPrestamista(idPrestamista);
}

export async function getSolicitudesEnviadas(
  idCliente: string
): Promise<ApiResponse<SolicitudEnviada[]>> {
  return getService().getSolicitudesEnviadas(idCliente);
}

export async function createMatchServicio(
  data: MatchServicioRequest
): Promise<ApiResponse<MatchServicioResponse>> {
  return getService().createMatchServicio(data);
}

export async function sendChatMessage(
  data: ChatMessageRequest
): Promise<ApiResponse<ChatResponse>> {
  return getService().sendChatMessage(data);
}

export async function aceptarSolicitud(
  data: AceptarSolicitudRequest
): Promise<ApiResponse<ActualizarSolicitudResponse>> {
  return getService().aceptarSolicitud(data);
}

export async function rechazarSolicitud(
  data: RechazarSolicitudRequest
): Promise<ApiResponse<ActualizarSolicitudResponse>> {
  return getService().rechazarSolicitud(data);
}

export async function confirmarPago(
  data: ConfirmarPagoRequest
): Promise<ApiResponse<ActualizarSolicitudResponse>> {
  return getService().confirmarPago(data);
}

export async function finalizarServicio(
  data: FinalizarServicioRequest
): Promise<ApiResponse<ActualizarSolicitudResponse>> {
  return getService().finalizarServicio(data);
}

export async function getProcesoFinalizacion(): Promise<ProcesoFinalizacion> {
  return getService().getProcesoFinalizacion();
}

export async function getConfirmacionPago(): Promise<ConfirmacionPago> {
  return getService().getConfirmacionPago();
}

export async function getOwnChatConversations(): Promise<
  ApiResponse<OwnLastMessage[]>
> {
  return getService().getOwnChatConversations();
}

export async function getChatConversation(
  idConversation: string
): Promise<ApiResponse<ChatConversation>> {
  return getService().getChatConversation(idConversation);
}

export async function getAverageScoreMatchsProveedor(idProveedor: string) {
  return getService().getAverageScoreMatchsProveedor(idProveedor);
}

export async function checkIfSkillIsPresentInServiciosFromProveedor(
  idSkill: string
): Promise<ApiResponse<boolean>> {
  return getService().checkIfSkillIsPresentInServiciosFromProveedor(idSkill);
}

export async function deleteSkillFromProfile(
  skillId: string
): Promise<ApiResponse<boolean>> {
  return getService().deleteSkillFromProfile(skillId);
}

export async function addSkillToProfile(
  skillUsuario: AsignacionSkillToUsuarioRequest
): Promise<ApiResponse<SkillAsignadoResponse>> {
  return getService().addSkillToProfile(skillUsuario);
}

/* export async function getUsuario(): Promise<ApiResponse<Usuario>> {
  return getService().getUsuario();
} */

export async function checkUserExists(
  tipo?: UsuarioTipoDocumento,
  documento?: string,
  correo?: string
): Promise<ApiResponse<boolean>> {
  return getService().checkUserExists(tipo, documento, correo);
}

export async function registerUser(
  data: RegisterUserRequest
): Promise<ApiResponse<Usuario>> {
  return getService().registerUser(data);
}

export async function getOwnSkillsInfo(): Promise<ApiResponse<SkillInfo[]>> {
  return getService().getOwnSkillsInfo();
}
