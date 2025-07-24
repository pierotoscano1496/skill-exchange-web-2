// Configuración de ambientes
export const ENV_CONFIG = {
  MODE: "api" as "static" | "api", // Cambiar a 'api' para usar la API real
  API: {
    BASE_URL: "http://localhost:9081/api",
    ENDPOINTS: {
      LOGIN: "/auth/login",
      SKILLS: "/skill",
      CATEGORIAS: "/categoria",
      SUB_CATEGORIAS_BY_CATEGORIA: "/sub-categoria/categoria",
      SKILLS_BY_SUB_CATEGORIA: "/skill/sub-categoria",
      SERVICIOS: "/servicio",
      BUSQUEDA_SERVICIOS: "/servicio/busqueda",
      SERVICIO_DETALLE: "/servicio/details/preview",
      SERVICIO_REVIEWS: "/servicios/review",
      SERVICIOS_USUARIO: "/servicio/usuario",
      SOLICITUDES_PRESTAMISTA: "/match/details/prestamista",
      MATCH: "/match",
      CHAT: "/chat",
      UPLOAD: "/upload",
      CHAT_CONVERSATION_BY_ID: "/chat",
      USUARIO: "/usuario",
      USUARIO_OWN_SKILLS_INFO: "/usuario/own/skills/info",
      SIMPLE_CHECK: "/simple-check",
    },
  },
  // Usuario actual simulado para modo estático
  CURRENT_USER: {
    id: "user-1",
    nombre: "Usuario Actual",
  },
};

export function isStaticMode(): boolean {
  return ENV_CONFIG.MODE === "static";
}

export function getCurrentUserId(): string {
  // En un caso real, esto vendría de un contexto de autenticación
  return ENV_CONFIG.CURRENT_USER.id;
}
