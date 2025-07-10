// Servicio principal que decide qué implementación usar
import { isStaticMode } from "../config/environment";
import { apiService } from "./api-service";
import { staticService } from "./static-service";
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
import type { ServicioRequestBody } from "../api/servicio-api";

class DataService {
  private get service() {
    return isStaticMode() ? staticService : apiService;
  }

  async getSkills(): Promise<ApiResponse<Skill[]>> {
    return this.service.getSkills();
  }

  async getCategorias(): Promise<ApiResponse<Categoria[]>> {
    return this.service.getCategorias();
  }

  async createServicio(
    data: ServicioRequestBody
  ): Promise<ApiResponse<ServicioCreado>> {
    return this.service.createServicio(data);
  }

  async uploadFile(file: File): Promise<ApiResponse<UploadResponse>> {
    return this.service.uploadFile(file);
  }

  async buscarServicios(
    filtros: BusquedaServiciosRequest
  ): Promise<ApiResponse<ServicioBusqueda[]>> {
    return this.service.buscarServicios(filtros);
  }

  async getServicioDetalle(id: string): Promise<ApiResponse<ServicioDetalle>> {
    return this.service.getServicioDetalle(id);
  }

  async getServicioReviews(id: string): Promise<ApiResponse<ReviewsServicio>> {
    return this.service.getServicioReviews(id);
  }

  async getServiciosUsuario(
    idUsuario: string
  ): Promise<ApiResponse<ServicioBusqueda[]>> {
    return this.service.getServiciosUsuario(idUsuario);
  }

  async getSolicitudesPrestamista(
    idPrestamista: string
  ): Promise<ApiResponse<SolicitudRecibida[]>> {
    return this.service.getSolicitudesPrestamista(idPrestamista);
  }

  async getSolicitudesEnviadas(
    idCliente: string
  ): Promise<ApiResponse<SolicitudEnviada[]>> {
    return this.service.getSolicitudesEnviadas(idCliente);
  }

  async createMatchServicio(
    data: MatchServicioRequest
  ): Promise<ApiResponse<MatchServicioResponse>> {
    return this.service.createMatchServicio(data);
  }

  async sendChatMessage(
    data: ChatMessageRequest
  ): Promise<ApiResponse<ChatResponse>> {
    return this.service.sendChatMessage(data);
  }

  // ===== NUEVAS FUNCIONES PARA ACTUALIZACIÓN DE SOLICITUDES =====

  async aceptarSolicitud(
    data: AceptarSolicitudRequest
  ): Promise<ApiResponse<ActualizarSolicitudResponse>> {
    return this.service.aceptarSolicitud(data);
  }

  async rechazarSolicitud(
    data: RechazarSolicitudRequest
  ): Promise<ApiResponse<ActualizarSolicitudResponse>> {
    return this.service.rechazarSolicitud(data);
  }

  async confirmarPago(
    data: ConfirmarPagoRequest
  ): Promise<ApiResponse<ActualizarSolicitudResponse>> {
    return this.service.confirmarPago(data);
  }

  async finalizarServicio(
    data: FinalizarServicioRequest
  ): Promise<ApiResponse<ActualizarSolicitudResponse>> {
    return this.service.finalizarServicio(data);
  }

  // Funciones para obtener información de procesos
  async getProcesoFinalizacion(): Promise<ProcesoFinalizacion> {
    return this.service.getProcesoFinalizacion();
  }

  async getConfirmacionPago(): Promise<ConfirmacionPago> {
    return this.service.getConfirmacionPago();
  }

  async getOwnChatConversations(): Promise<ApiResponse<OwnLastMessage[]>> {
    return this.service.getOwnChatConversations();
  }

  async getChatConversation(
    idConversation: string
  ): Promise<ApiResponse<ChatConversation>> {
    return this.service.getChatConversation(idConversation);
  }

  async getUsuario(): Promise<ApiResponse<Usuario>> {
    return this.service.getUsuario();
  }

  // Métodos de utilidad para obtener datos específicos
  async getSkillsByCategoria(categoria: string): Promise<Skill[]> {
    const response = await this.getSkills();
    if (response.success) {
      return response.data.filter((skill) => skill.categoria === categoria);
    }
    return [];
  }

  async getSubcategoriasByCategoria(categoriaId: string): Promise<any[]> {
    const response = await this.getCategorias();
    if (response.success) {
      const categoria = response.data.find((cat) => cat.id === categoriaId);
      return categoria?.subcategorias || [];
    }
    return [];
  }

  // Métodos de utilidad para búsqueda
  async buscarPorPalabraClave(keyword: string): Promise<ServicioBusqueda[]> {
    const response = await this.buscarServicios({ keyWord: keyword });
    return response.success ? response.data : [];
  }

  async buscarPorSkill(idSkill: string): Promise<ServicioBusqueda[]> {
    const response = await this.buscarServicios({ idSkill });
    return response.success ? response.data : [];
  }

  async buscarPorCategoria(idCategoria: string): Promise<ServicioBusqueda[]> {
    const response = await this.buscarServicios({ idCategoria });
    return response.success ? response.data : [];
  }

  // Método para obtener servicio completo con reviews
  async getServicioCompletoConReviews(id: string): Promise<{
    servicio: ServicioDetalle | null;
    reviews: ReviewsServicio | null;
    loading: boolean;
    error: string | null;
  }> {
    try {
      const [servicioResponse, reviewsResponse] = await Promise.all([
        this.getServicioDetalle(id),
        this.getServicioReviews(id),
      ]);

      return {
        servicio: servicioResponse.success ? servicioResponse.data : null,
        reviews: reviewsResponse.success ? reviewsResponse.data : null,
        loading: false,
        error: !servicioResponse.success ? servicioResponse.message : null,
      };
    } catch (error) {
      console.error("Error al obtener servicio completo:", error);
      return {
        servicio: null,
        reviews: null,
        loading: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      };
    }
  }

  // Método para contactar proveedor (crear match + enviar mensaje)
  async contactarProveedor(
    idServicio: string,
    idProveedor: string,
    mensaje: string,
    costo: number,
    archivo?: File
  ): Promise<{
    success: boolean;
    message: string;
    matchId?: string;
    chatId?: string;
  }> {
    try {
      // Obtener ID del cliente actual (simulado)
      const idCliente = "current-user-id"; // En producción, esto vendría del contexto de autenticación

      // 1. Subir archivo si existe
      let resourceUrl: string | undefined;
      if (archivo) {
        const uploadResponse = await this.uploadFile(archivo);
        if (uploadResponse.success) {
          resourceUrl = uploadResponse.data.url;
        } else {
          return {
            success: false,
            message: "Error al subir el archivo: " + uploadResponse.message,
          };
        }
      }

      // 2. Crear match del servicio
      const matchResponse = await this.createMatchServicio({
        idServicio,
        idCliente,
        puntuacion: 0,
        costo,
      });

      if (!matchResponse.success) {
        return {
          success: false,
          message: "Error al crear la solicitud: " + matchResponse.message,
        };
      }

      // 3. Enviar mensaje inicial
      const chatResponse = await this.sendChatMessage({
        idReceptor: idProveedor,
        mensaje,
        resourceUrl,
      });

      if (!chatResponse.success) {
        return {
          success: false,
          message: "Error al enviar el mensaje: " + chatResponse.message,
        };
      }

      return {
        success: true,
        message: "Solicitud enviada exitosamente",
        matchId: matchResponse.data.id,
        chatId: chatResponse.data.id,
      };
    } catch (error) {
      console.error("Error al contactar proveedor:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Error desconocido",
      };
    }
  }
}

export const dataService = new DataService();
