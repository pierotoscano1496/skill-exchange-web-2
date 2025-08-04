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
} from "../types/api-responses";
import type {
  ServicioRequestBody,
  ServicioResponse,
} from "../api/servicio-api";
import {
  STATIC_SKILLS,
  STATIC_CATEGORIAS,
  createStaticServicioResponse,
  createStaticUploadResponse,
  buscarServiciosEstaticos,
  getServicioDetalleEstatico,
  getServicioReviewsEstatico,
  getServiciosUsuarioEstaticos,
  getSolicitudesPrestamisaEstaticas,
  getSolicitudesEnviadasEstaticas,
  STATIC_CHAT_OWN_LAST_MESSAGE,
  getChatConversationStatic,
} from "../data/static-data";
import type {
  AceptarSolicitudRequest,
  RechazarSolicitudRequest,
  ConfirmarPagoRequest,
  FinalizarServicioRequest,
  ActualizarSolicitudResponse,
  ProcesoFinalizacion,
  ConfirmacionPago,
} from "../types/solicitud-updates";

class StaticService {
  // Simular delay de red para hacer más realista
  private async delay(ms = 500): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async postSimpleCheck(nombre: string): Promise<ApiResponse<string>> {
    await this.delay();
    return {
      success: true,
      message: "Éxito del check",
      data: "Hola " + nombre,
    };
  }

  async getSkills(): Promise<ApiResponse<Skill[]>> {
    await this.delay();
    return {
      success: true,
      message: "Skills obtenidos exitosamente",
      data: STATIC_SKILLS,
    };
  }

  async getSkillsInfo(): Promise<ApiResponse<SkillInfo[]>> {
    await this.delay();
    // En un entorno estático, simplemente devolvemos los skills con la info adicional.
    return {
      success: true,
      message: "Skills info obtenidos exitosamente",
      data: STATIC_SKILLS.map((skill) => ({
        ...skill,
        nombreSubCategoria: "Subcategoría de " + skill.idSubCategoria,
        nombreCategoria: "Categoría de " + skill.idSubCategoria,
      })),
    };
  }

  async getCategorias(): Promise<ApiResponse<Categoria[]>> {
    await this.delay();
    return {
      success: true,
      message: "Categorías obtenidas exitosamente",
      data: STATIC_CATEGORIAS,
    };
  }

  async getSubCategoriasByCategoria(
    idCategoria: string
  ): Promise<ApiResponse<any[]>> {
    await this.delay();
    const categoria = STATIC_CATEGORIAS.find((cat) => cat.id === idCategoria);
    if (categoria) {
      return {
        success: true,
        message: "Subcategorías obtenidas exitosamente",
        data: categoria.subCategorias,
      };
    }
    return {
      success: false,
      message: "Categoría no encontrada",
      data: [],
    };
  }

  async getSkillsBySubCategoria(
    idSubcategoria: string
  ): Promise<ApiResponse<Skill[]>> {
    await this.delay();
    // En un entorno estático, necesitamos encontrar la subcategoría y luego los skills.
    // Esto es una simulación, ya que la estructura actual no vincula skills a subcategorías directamente.
    const allSkills = STATIC_SKILLS;
    const filteredSkills = allSkills.filter(
      (skill) => skill.idSubCategoria === idSubcategoria
    ); // Asumiendo que categoria es idSubcategoria para la simulación

    return {
      success: true,
      message: "Skills obtenidos exitosamente",
      data: filteredSkills,
    };
  }

  async createServicio(
    data: ServicioRequestBody
  ): Promise<ApiResponse<ServicioResponse>> {
    await this.delay(1000); // Simular proceso más lento para creación

    // Simular posible error (5% de probabilidad)
    if (Math.random() < 0.05) {
      return {
        success: false,
        message: "Error simulado: No se pudo crear el servicio",
        data: {} as ServicioResponse,
      };
    }

    return createStaticServicioResponse(data.data.titulo);
  }

  async uploadFile(file: File): Promise<ApiResponse<UploadResponse>> {
    await this.delay(800); // Simular upload

    // Simular posible error (3% de probabilidad)
    if (Math.random() < 0.03) {
      return {
        success: false,
        message: "Error simulado: No se pudo subir el archivo",
        data: {} as UploadResponse,
      };
    }

    return createStaticUploadResponse(file.name);
  }

  async buscarServicios(
    filtros: BusquedaServiciosRequest
  ): Promise<ApiResponse<ServicioBusqueda[]>> {
    await this.delay(600); // Simular búsqueda

    const resultados = buscarServiciosEstaticos(filtros);

    return {
      success: true,
      message: `Se encontraron ${resultados.length} servicios`,
      data: resultados,
    };
  }

  async getServicioDetalle(id: string): Promise<ApiResponse<ServicioDetalle>> {
    await this.delay(400);

    const servicio = getServicioDetalleEstatico(id);

    if (!servicio) {
      return {
        success: false,
        message: "Servicio no encontrado",
        data: {} as ServicioDetalle,
      };
    }

    return {
      success: true,
      message: "Servicio encontrado",
      data: servicio,
    };
  }

  async getServicioReviews(id: string): Promise<ApiResponse<ReviewsServicio>> {
    await this.delay(300);

    const reviews = getServicioReviewsEstatico(id);

    return {
      success: true,
      message: `Se encontraron ${reviews.comentarios.length} comentarios`,
      data: reviews,
    };
  }

  async getServiciosUsuario(
    idUsuario: string
  ): Promise<ApiResponse<ServicioBusqueda[]>> {
    await this.delay(500);

    const servicios = getServiciosUsuarioEstaticos(idUsuario);

    return {
      success: true,
      message: `Se encontraron ${servicios.length} servicios del usuario`,
      data: servicios,
    };
  }

  async getSolicitudesPrestamista(
    idPrestamista: string
  ): Promise<ApiResponse<SolicitudRecibida[]>> {
    await this.delay(600);

    const solicitudes = getSolicitudesPrestamisaEstaticas(idPrestamista);

    return {
      success: true,
      message: `Se encontraron ${solicitudes.length} solicitudes`,
      data: solicitudes,
    };
  }

  async getSolicitudesEnviadas(
    idCliente: string
  ): Promise<ApiResponse<SolicitudEnviada[]>> {
    await this.delay(600);

    const solicitudesEnviadas = getSolicitudesEnviadasEstaticas(idCliente);

    return {
      success: true,
      message: `Se encontraron ${solicitudesEnviadas.length} solicitudes enviadas`,
      data: solicitudesEnviadas,
    };
  }

  async createMatchServicio(
    data: MatchServicioRequest
  ): Promise<ApiResponse<MatchServicioResponse>> {
    await this.delay(800);

    // Simular posible error (3% de probabilidad)
    if (Math.random() < 0.03) {
      return {
        success: false,
        message: "Error simulado: No se pudo crear el match",
        data: {} as MatchServicioResponse,
      };
    }

    const mockResponse: MatchServicioResponse = {
      id: `match-${Date.now()}`,
      idServicio: data.idServicio,
      idCliente: data.idCliente,
      fecha: new Date().toISOString().split("T")[0],
      fechaInicio: new Date().toISOString().split("T")[0],
      fechaCierre: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      estado: "solicitado",
      puntuacion: data.puntuacion,
      costo: data.costo,
    };

    return {
      success: true,
      message: "Match creado exitosamente",
      data: mockResponse,
    };
  }

  async sendChatMessage(
    data: ChatMessageRequest
  ): Promise<ApiResponse<ChatResponse>> {
    await this.delay(600);

    // Simular posible error (2% de probabilidad)
    if (Math.random() < 0.02) {
      return {
        success: false,
        message: "Error simulado: No se pudo enviar el mensaje",
        data: {} as ChatResponse,
      };
    }

    const mockResponse: ChatResponse = {
      id: `chat-${Date.now()}`,
      contacts: [
        {
          idContact: data.idReceptor,
          fullName: "Proveedor del Servicio",
          email: "proveedor@example.com",
        },
      ],
      messages: [
        {
          sentBy: "current-user-id",
          fecha: new Date().toISOString(),
          mensaje: data.mensaje,
          resourceUrl: data.resourceUrl,
        },
      ],
    };

    return {
      success: true,
      message: "Mensaje enviado exitosamente",
      data: mockResponse,
    };
  }

  // ===== NUEVAS FUNCIONES PARA ACTUALIZACIÓN DE SOLICITUDES =====

  async aceptarSolicitud(
    data: AceptarSolicitudRequest
  ): Promise<ApiResponse<ActualizarSolicitudResponse>> {
    await this.delay(800);

    // Simular posible error (2% de probabilidad)
    if (Math.random() < 0.02) {
      return {
        success: false,
        message: "Error simulado: No se pudo aceptar la solicitud",
        data: {} as ActualizarSolicitudResponse,
      };
    }

    const response: ActualizarSolicitudResponse = {
      success: true,
      message: "Solicitud aceptada exitosamente",
      solicitudActualizada: {
        id: data.idSolicitud,
        estadoAnterior: "solicitado",
        estadoNuevo: "pendiente_pago",
        fechaActualizacion: new Date().toISOString(),
      },
    };

    return {
      success: true,
      message:
        "Solicitud aceptada exitosamente. El cliente ha sido notificado y debe proceder con el pago.",
      data: response,
    };
  }

  async rechazarSolicitud(
    data: RechazarSolicitudRequest
  ): Promise<ApiResponse<ActualizarSolicitudResponse>> {
    await this.delay(600);

    const response: ActualizarSolicitudResponse = {
      success: true,
      message: "Solicitud rechazada",
      solicitudActualizada: {
        id: data.idSolicitud,
        estadoAnterior: "solicitado",
        estadoNuevo: "rechazado",
        fechaActualizacion: new Date().toISOString(),
      },
    };

    return {
      success: true,
      message:
        "Solicitud rechazada exitosamente. El cliente ha sido notificado del motivo.",
      data: response,
    };
  }

  async confirmarPago(
    data: ConfirmarPagoRequest
  ): Promise<ApiResponse<ActualizarSolicitudResponse>> {
    await this.delay(1000);

    // Simular posible error (1% de probabilidad)
    if (Math.random() < 0.01) {
      return {
        success: false,
        message: "Error simulado: No se pudo confirmar el pago",
        data: {} as ActualizarSolicitudResponse,
      };
    }

    const response: ActualizarSolicitudResponse = {
      success: true,
      message: "Pago confirmado",
      solicitudActualizada: {
        id: data.idSolicitud,
        estadoAnterior: "pendiente_pago",
        estadoNuevo: "ejecucion",
        fechaActualizacion: new Date().toISOString(),
      },
    };

    return {
      success: true,
      message:
        "Pago confirmado exitosamente. El servicio ahora está en ejecución.",
      data: response,
    };
  }

  async finalizarServicio(
    data: FinalizarServicioRequest
  ): Promise<ApiResponse<ActualizarSolicitudResponse>> {
    await this.delay(1200);

    const response: ActualizarSolicitudResponse = {
      success: true,
      message: "Servicio finalizado",
      solicitudActualizada: {
        id: data.idSolicitud,
        estadoAnterior: "ejecucion",
        estadoNuevo: "finalizado",
        fechaActualizacion: new Date().toISOString(),
      },
    };

    return {
      success: true,
      message:
        "Servicio finalizado exitosamente. El cliente será notificado para calificar el servicio.",
      data: response,
    };
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
    await this.delay(500);
    return {
      success: true,
      message: "Conversaciones de chat obtenidas exitosamente",
      data: STATIC_CHAT_OWN_LAST_MESSAGE,
    };
  }

  async getChatConversation(
    idConversation: string
  ): Promise<ApiResponse<ChatConversation>> {
    await this.delay(500);
    const conversation = getChatConversationStatic(idConversation);
    if (conversation) {
      return {
        success: true,
        message: "Conversación de chat obtenida exitosamente",
        data: conversation,
      };
    } else {
      return {
        success: false,
        message: "Conversación no encontrada",
        data: {} as ChatConversation,
      };
    }
  }

  async getUsuario(): Promise<ApiResponse<Usuario>> {
    await this.delay(500);
    return {
      success: true,
      message: "Usuario obtenido exitosamente",
      data: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        dni: "12345678",
        carnetExtranjeria: "",
        tipoDocumento: "dni",
        correo: "usuario@example.com",
        nombres: "Juan",
        apellidos: "Perez",
        tipo: "cliente",
        fechaNacimiento: "1990-01-01",
        perfilLinkedin: "",
        perfilFacebook: "",
        perfilInstagram: "",
        perfilTiktok: "",
        introduccion: "",
        skills: [],
      },
    };
  }
}

export const staticService = new StaticService();
