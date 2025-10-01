import { ENV_CONFIG } from "../config/environment";
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
  AsignacionSkillToUsuarioRequest,
  SkillAsignadoResponse,
  CreateFirstMatchServicioBody,
  UpdateServicioRequestBody,
} from "../types/api-responses";
import type {
  AceptarSolicitudRequest,
  RechazarSolicitudRequest,
  ConfirmarPagoRequest,
  FinalizarServicioRequest,
  ActualizarSolicitudResponse,
  ProcesoFinalizacion,
  ConfirmacionPago,
  ConfirmacionPagoRecepcionRequest,
  ConfirmacionPagoRecepcionResponse,
} from "../types/solicitud-updates";
import type {
  ServicioRequestBody,
  ServicioResponse,
} from "../api/servicio-api";
import { cookies } from "next/headers";
import { AUTH_COOKIE } from "../constants/auth";
import { RegisterUserRequest } from "../types/user-registration";
import { MatchServicioEstado, UsuarioTipoDocumento } from "../constants/enums";
import { id } from "date-fns/locale";

class ApiService {
  private baseUrl = ENV_CONFIG.API.BASE_URL;

  public async fetchApi<T>(
    endpoint: string,
    options?: RequestInit,
    isPrivate: boolean = false
  ): Promise<ApiResponse<T>> {
    try {
      const headers: Record<string, string> = {};

      if (options && !(options.body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
      }

      if (isPrivate) {
        let token = (await cookies()).get(AUTH_COOKIE)?.value;
        if (token) {
          headers.Authorization = token.startsWith("Bearer ")
            ? token
            : `Bearer ${token}`;
        }
      }

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          ...headers,
          ...options?.headers,
        },
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("API Error Response Body:", errorBody);
        throw new Error(`${response.status}`);
      }

      const responseText = await response.text();
      if (responseText === "") {
        // If the body is empty, return success with null data, as there's nothing to parse.
        return {
          success: true,
          message: "Operación exitosa",
          data: null as any,
        };
      }

      // If we have a body, try to parse it.
      const data = JSON.parse(responseText) as T;
      return {
        success: true,
        message: "Operación exitosa",
        data,
      };
    } catch (error) {
      console.error("API Error:", error);
      if (error instanceof Error) {
        const statusCode = parseInt(error.message, 10);
        if (isNaN(statusCode)) {
          return {
            success: false,
            message: `Fallo en la solicitud a la API: ${error.message}`,
            data: null as any,
            statusCode: undefined,
          };
        }
        return {
          success: false,
          message: `HTTP error! status: ${statusCode}`,
          data: null as any,
          statusCode,
        };
      }

      return {
        success: false,
        message: "Ocurrió un error inesperado",
        data: null as any,
        statusCode: 500,
      };
    }
  }

  async postSimpleCheck(nombre: string): Promise<ApiResponse<string>> {
    return this.fetchApi<string>(ENV_CONFIG.API.ENDPOINTS.SIMPLE_CHECK, {
      method: "POST",
      body: JSON.stringify({ nombre }),
    });
  }

  async getSkills(): Promise<ApiResponse<Skill[]>> {
    return this.fetchApi<Skill[]>(ENV_CONFIG.API.ENDPOINTS.SKILLS);
  }

  async getSkillsInfo(): Promise<ApiResponse<SkillInfo[]>> {
    return this.fetchApi<SkillInfo[]>(
      `${ENV_CONFIG.API.ENDPOINTS.SKILLS}/info`
    );
  }

  async getCategorias(): Promise<ApiResponse<Categoria[]>> {
    return this.fetchApi<Categoria[]>(ENV_CONFIG.API.ENDPOINTS.CATEGORIAS);
  }

  async getSubCategoriasByCategoria(
    idCategoria: string
  ): Promise<ApiResponse<any[]>> {
    return this.fetchApi<any[]>(
      `${ENV_CONFIG.API.ENDPOINTS.SUB_CATEGORIAS_BY_CATEGORIA}/${idCategoria}`
    );
  }

  async getSkillsBySubCategoria(
    idSubcategoria: string
  ): Promise<ApiResponse<Skill[]>> {
    return this.fetchApi<Skill[]>(
      `${ENV_CONFIG.API.ENDPOINTS.SKILLS_BY_SUB_CATEGORIA}/${idSubcategoria}`
    );
  }

  async createServicio(
    requestBody: ServicioRequestBody
  ): Promise<ApiResponse<ServicioResponse>> {
    const formData = new FormData();
    formData.append(
      "data",
      new Blob([JSON.stringify(requestBody.data)], { type: "application/json" })
    );

    requestBody.multimedia.forEach((file) => {
      if (file instanceof File) {
        formData.append("multimedia", file, file.name);
      }
    });

    if (
      requestBody.yapeMultimedia &&
      requestBody.yapeMultimedia instanceof File
    ) {
      formData.append(
        "yapeMultimedia",
        requestBody.yapeMultimedia,
        requestBody.yapeMultimedia.name
      );
    }

    return this.fetchApi<ServicioResponse>(
      ENV_CONFIG.API.ENDPOINTS.SERVICIOS,
      {
        method: "POST",
        body: formData,
      },
      true
    );
  }

  async uploadFile(file: File): Promise<ApiResponse<UploadResponse>> {
    const formData = new FormData();
    formData.append("file", file);

    return this.fetchApi<UploadResponse>(
      ENV_CONFIG.API.ENDPOINTS.UPLOAD,
      {
        method: "POST",
        body: formData,
      },
      true
    );
  }

  async buscarServicios(
    filtros: BusquedaServiciosRequest
  ): Promise<ApiResponse<ServicioBusqueda[]>> {
    /* const params = new URLSearchParams();
    if (filtros.keyWord) params.append("keyWord", filtros.keyWord);
    if (filtros.idSkill) params.append("idSkill", filtros.idSkill);
    if (filtros.idSubcategoria)
      params.append("idSubcategoria", filtros.idSubcategoria);
    if (filtros.idCategoria) params.append("idCategoria", filtros.idCategoria);

    const endpoint = `${
      ENV_CONFIG.API.ENDPOINTS.BUSQUEDA_SERVICIOS
    }?${params.toString()}`; */
    return this.fetchApi<ServicioBusqueda[]>(
      ENV_CONFIG.API.ENDPOINTS.BUSQUEDA_SERVICIOS,
      {
        method: "POST",
        body: JSON.stringify(filtros),
      }
    );
  }

  async getServicioDetalle(id: string): Promise<ApiResponse<ServicioDetalle>> {
    return this.fetchApi<ServicioDetalle>(
      `${ENV_CONFIG.API.ENDPOINTS.SERVICIO_DETALLE}/${id}`
    );
  }

  async getServicioReviews(id: string): Promise<ApiResponse<ReviewsServicio>> {
    return this.fetchApi<ReviewsServicio>(
      `${ENV_CONFIG.API.ENDPOINTS.SERVICIO_REVIEWS}/${id}`
    );
  }

  async checkAvailableMatchForServicio(idServicio: string) {
    let endpoint = ENV_CONFIG.API.ENDPOINTS.CHECK_AVAILABLE_MATCH_FOR_SERVICIO;
    endpoint = endpoint.replace("$1", idServicio);

    return this.fetchApi<boolean>(endpoint, {}, true);
  }

  async getServiciosByProveedor(): Promise<ApiResponse<ServicioBusqueda[]>> {
    return this.fetchApi<ServicioBusqueda[]>(
      `${ENV_CONFIG.API.ENDPOINTS.SERVICIOS_PROVEEDOR}`,
      {},
      true
    );
  }

  async getServiciosCliente(): Promise<ApiResponse<SolicitudRecibida[]>> {
    return this.fetchApi<SolicitudRecibida[]>(
      ENV_CONFIG.API.ENDPOINTS.SOLICITUDES_CLIENTE,
      {},
      true
    );
  }

  async getSolicitudesPrestamista(
    estado: MatchServicioEstado
  ): Promise<ApiResponse<SolicitudRecibida[]>> {
    return this.fetchApi<SolicitudRecibida[]>(
      ENV_CONFIG.API.ENDPOINTS.SOLICITUDES_PROVEEDOR,
      {},
      true
    );
  }

  async getSolicitudesEnviadas(
    idCliente: string
  ): Promise<ApiResponse<SolicitudEnviada[]>> {
    return this.fetchApi<SolicitudEnviada[]>(
      `/match/details/cliente/${idCliente}`,
      {},
      true
    );
  }

  async createMatchServicio(
    data: MatchServicioRequest
  ): Promise<ApiResponse<MatchServicioResponse>> {
    return this.fetchApi<MatchServicioResponse>(
      ENV_CONFIG.API.ENDPOINTS.MATCH,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
      true
    );
  }

  async registrarMatch(
    data: CreateFirstMatchServicioBody
  ): Promise<ApiResponse<MatchServicioResponse>> {
    return this.fetchApi<MatchServicioResponse>(
      ENV_CONFIG.API.ENDPOINTS.USUARIO_OWN_MATCH,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
      true
    );
  }

  async sendChatMessage(
    data: ChatMessageRequest
  ): Promise<ApiResponse<ChatResponse>> {
    return this.fetchApi<ChatResponse>(
      ENV_CONFIG.API.ENDPOINTS.CHAT,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
      true
    );
  }

  // ===== FUNCIÓN GENÉRICA PARA ACTUALIZAR ESTADO DE SOLICITUDES =====

  private async actualizarEstadoSolicitud(
    idSolicitud: string,
    nuevoEstado: string
  ): Promise<ApiResponse<MatchServicioResponse>> {
    return this.fetchApi<MatchServicioResponse>(
      `/match/estado/${idSolicitud}`,
      {
        method: "PATCH",
        body: JSON.stringify({ estado: nuevoEstado }),
      },
      true
    );
  }

  // ===== FUNCIONES ESPECÍFICAS PARA CADA ACCIÓN =====

  async aceptarSolicitud(
    data: AceptarSolicitudRequest
  ): Promise<ApiResponse<MatchServicioResponse>> {
    return this.fetchApi<MatchServicioResponse>(
      ENV_CONFIG.API.ENDPOINTS.ACCEPT_SOLICITUD.replace("$1", data.idSolicitud),
      {
        method: "PATCH",
        body: JSON.stringify({ fechaInicio: data.fechaInicio }),
      },
      true
    );
  }

  async rechazarSolicitud(
    data: RechazarSolicitudRequest
  ): Promise<ApiResponse<ActualizarSolicitudResponse>> {
    try {
      const response = await this.actualizarEstadoSolicitud(
        data.idSolicitud,
        "rechazado"
      );

      if (response.success) {
        const actualizacionResponse: ActualizarSolicitudResponse = {
          success: true,
          message:
            "Solicitud rechazada exitosamente. El cliente ha sido notificado del motivo.",
          solicitudActualizada: {
            id: response.data.id,
            estadoAnterior: "solicitado",
            estadoNuevo: "rechazado",
            fechaActualizacion: new Date().toISOString(),
          },
        };

        return {
          success: true,
          message: actualizacionResponse.message,
          data: actualizacionResponse,
        };
      }

      return {
        success: false,
        message: response.message,
        data: {} as ActualizarSolicitudResponse,
      };
    } catch (error) {
      console.error("Error al rechazar solicitud:", error);
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Error al rechazar solicitud",
        data: {} as ActualizarSolicitudResponse,
      };
    }
  }

  async confirmarPagoRecepcion(
    data: ConfirmacionPagoRecepcionRequest
  ): Promise<
    (
      | ApiResponse<MatchServicioResponse>
      | ApiResponse<ConfirmacionPagoRecepcionResponse>
    )[]
  > {
    /**
     * 1. Registrar confirmación
     */

    const confirmarPagoRequest =
      this.fetchApi<ConfirmacionPagoRecepcionResponse>(
        ENV_CONFIG.API.ENDPOINTS.CONFIRMACION_PAGO_RECEPCION,
        {
          method: "POST",
          body: JSON.stringify(data),
        },
        true
      );

    /**
     * 2. Actualizar estado de match
     */
    const actualizarEstadoMatchRequest = this.actualizarEstadoSolicitud(
      data.idMatchServicio,
      "ejecucion"
    );

    const [confirmarPagoResp, actualizarEstadoMatchResp] = await Promise.all([
      confirmarPagoRequest,
      actualizarEstadoMatchRequest,
    ]);

    return [confirmarPagoResp, actualizarEstadoMatchResp];
  }

  async confirmarPago(
    data: ConfirmarPagoRequest
  ): Promise<ApiResponse<ActualizarSolicitudResponse>> {
    try {
      const response = await this.actualizarEstadoSolicitud(
        data.idSolicitud,
        "ejecucion"
      );

      if (response.success) {
        const actualizacionResponse: ActualizarSolicitudResponse = {
          success: true,
          message:
            "Pago confirmado exitosamente. El servicio ahora está en ejecución.",
          solicitudActualizada: {
            id: response.data.id,
            estadoAnterior: "pendiente_pago",
            estadoNuevo: "ejecucion",
            fechaActualizacion: new Date().toISOString(),
          },
        };

        return {
          success: true,
          message: actualizacionResponse.message,
          data: actualizacionResponse,
        };
      }

      return {
        success: false,
        message: response.message,
        data: {} as ActualizarSolicitudResponse,
      };
    } catch (error) {
      console.error("Error al confirmar pago:", error);
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Error al confirmar pago",
        data: {} as ActualizarSolicitudResponse,
      };
    }
  }

  async finalizarServicio(
    data: FinalizarServicioRequest
  ): Promise<ApiResponse<ActualizarSolicitudResponse>> {
    try {
      const response = await this.actualizarEstadoSolicitud(
        data.idSolicitud,
        "finalizado"
      );

      if (response.success) {
        const actualizacionResponse: ActualizarSolicitudResponse = {
          success: true,
          message:
            "Servicio finalizado exitosamente. El cliente será notificado para calificar el servicio.",
          solicitudActualizada: {
            id: response.data.id,
            estadoAnterior: "ejecucion",
            estadoNuevo: "finalizado",
            fechaActualizacion: new Date().toISOString(),
          },
        };

        return {
          success: true,
          message: actualizacionResponse.message,
          data: actualizacionResponse,
        };
      }

      return {
        success: false,
        message: response.message,
        data: {} as ActualizarSolicitudResponse,
      };
    } catch (error) {
      console.error("Error al finalizar servicio:", error);
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Error al finalizar servicio",
        data: {} as ActualizarSolicitudResponse,
      };
    }
  }

  async getProcesoFinalizacion(): Promise<ProcesoFinalizacion> {
    return {
      pasos: [
        "Confirmar que el trabajo se ha completado satisfactoriamente",
        "Documentar el resumen del trabajo realizado",
        "Registrar el tiempo empleado y materiales utilizados",
        "Proporcionar recomendaciones al cliente (opcional)",
        "Solicitar calificación del cliente",
        "Cerrar oficialmente el servicio",
      ],
      tiempoEstimado: "5-10 minutos",
      requisitos: [
        "El trabajo debe estar 100% completado",
        "Todos los entregables deben estar listos",
        "El cliente debe estar satisfecho con el resultado",
      ],
      consecuencias: [
        "El servicio se marcará como finalizado",
        "Se liberará el pago (si aplica)",
        "El cliente podrá calificar tu servicio",
        "No podrás modificar el estado después",
        "Se generará un registro permanente del servicio",
      ],
    };
  }

  async getConfirmacionPago(): Promise<ConfirmacionPago> {
    return {
      mensaje:
        "Antes de confirmar el pago, asegúrate de haber verificado que efectivamente recibiste el pago del cliente.",
      verificaciones: [
        "¿Has recibido el pago completo acordado?",
        "¿El método de pago coincide con lo acordado?",
        "¿Tienes comprobante del pago recibido?",
        "¿El monto recibido es correcto?",
      ],
      advertencias: [
        "Solo confirma el pago si realmente lo has recibido",
        "Una vez confirmado, el servicio pasará a estado 'En Ejecución'",
        "Deberás cumplir con el servicio acordado",
        "El cliente esperará que inicies el trabajo inmediatamente",
      ],
    };
  }

  async getOwnChatConversations(): Promise<ApiResponse<OwnLastMessage[]>> {
    return this.fetchApi<OwnLastMessage[]>(
      `${ENV_CONFIG.API.ENDPOINTS.CHAT}/own-last-message`,
      {},
      true
    );
  }

  async createChatConversation({
    idReceptor,
    mensaje,
    resourceUrl = "",
  }: {
    idReceptor: string;
    mensaje: string;
    resourceUrl?: string;
  }): Promise<ApiResponse<any>> {
    return this.fetchApi<any>(
      `${ENV_CONFIG.API.ENDPOINTS.CHAT}`,
      {
        method: "POST",
        body: JSON.stringify({ idReceptor, mensaje, resourceUrl }),
        headers: { "Content-Type": "application/json" },
      },
      true
    );
  }

  async getChatConversation(
    idConversation: string
  ): Promise<ApiResponse<ChatConversation>> {
    return this.fetchApi<ChatConversation>(
      `${ENV_CONFIG.API.ENDPOINTS.CHAT_CONVERSATION_BY_ID}/${idConversation}`,
      {},
      true
    );
  }

  async getAverageScoreMatchsProveedor(
    idProveedor: string
  ): Promise<ApiResponse<number>> {
    const endpoint =
      ENV_CONFIG.API.ENDPOINTS.AVERAGE_SCORE_MATCHS_PROVEEDOR.replace(
        "$1",
        idProveedor
      );
    return this.fetchApi<number>(endpoint, {}, true);
  }

  async checkIfSkillIsPresentInServiciosFromProveedor(
    idSkill: string
  ): Promise<ApiResponse<boolean>> {
    return this.fetchApi<boolean>(
      ENV_CONFIG.API.ENDPOINTS.CHECK_SKILL_IN_SERVICIOS_PROVEEDOR.replace(
        "$1",
        idSkill
      ),
      {},
      true
    );
  }

  async deleteSkillFromProfile(idSkill: string): Promise<ApiResponse<boolean>> {
    return this.fetchApi<boolean>(
      ENV_CONFIG.API.ENDPOINTS.DELETE_SKILL_FROM_PROFILE.replace("$1", idSkill),
      {
        method: "DELETE",
      },
      true
    );
  }

  async getUsuario(): Promise<ApiResponse<Usuario>> {
    return this.fetchApi<Usuario>(
      ENV_CONFIG.API.ENDPOINTS.USUARIO_AUTH,
      {},
      true
    );
  }

  async getOwnSkillsAsignados(): Promise<ApiResponse<SkillAsignadoResponse[]>> {
    return this.fetchApi<SkillAsignadoResponse[]>(
      ENV_CONFIG.API.ENDPOINTS.USUARIO_OWN_SKILLS,
      {},
      true
    );
  }

  async addSkillToProfile(
    skillUsuario: AsignacionSkillToUsuarioRequest
  ): Promise<ApiResponse<SkillAsignadoResponse>> {
    return this.fetchApi<SkillAsignadoResponse>(
      ENV_CONFIG.API.ENDPOINTS.ADD_SKILL_TO_PROFILE,
      {
        method: "PATCH",
        body: JSON.stringify(skillUsuario),
        headers: { "Content-Type": "application/json" },
      },
      true
    );
  }

  async checkUserExists(
    tipo?: UsuarioTipoDocumento,
    documento?: string,
    correo?: string
  ): Promise<ApiResponse<boolean>> {
    let paramsBuilder: string[] = [];
    if (tipo) paramsBuilder.push(`tipoDocumento=${encodeURIComponent(tipo)}`);
    if (documento)
      paramsBuilder.push(`documento=${encodeURIComponent(documento)}`);
    if (correo) paramsBuilder.push(`correo=${encodeURIComponent(correo)}`);

    return this.fetchApi<boolean>(
      `${ENV_CONFIG.API.ENDPOINTS.CHECK_USER_EXISTS}?${paramsBuilder.join("&")}`
    );
  }

  async registerUser(data: RegisterUserRequest): Promise<ApiResponse<Usuario>> {
    return this.fetchApi<Usuario>(ENV_CONFIG.API.ENDPOINTS.USUARIO_AUTH, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getOwnSkillsInfo(): Promise<ApiResponse<SkillInfo[]>> {
    return this.fetchApi<SkillInfo[]>(
      ENV_CONFIG.API.ENDPOINTS.USUARIO_OWN_SKILLS_INFO,
      {},
      true
    );
  }

  async updateService(
    idServicio: string,
    formData: FormData
  ): Promise<ApiResponse<ServicioDetalle>> {
    return this.fetchApi<ServicioDetalle>(
      `${ENV_CONFIG.API.ENDPOINTS.SERVICIOS}/${idServicio}`,
      {
        method: "PATCH",
        body: formData,
      },
      true
    );
  }
}

export const apiService = new ApiService();
