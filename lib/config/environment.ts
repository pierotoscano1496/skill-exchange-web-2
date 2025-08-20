// Configuración de ambientes
export const ENV_CONFIG = {
  MODE: "api" as "static" | "api", // Cambiar a 'api' para usar la API real
  API: {
    BASE_URL: "http://localhost:9081/api",
    ENDPOINTS: {
      LOGIN: "/auth/login",
      LOGOUT: "/auth/logout",
      SKILLS: "/skill",
      CATEGORIAS: "/categoria",
      SUB_CATEGORIAS_BY_CATEGORIA: "/sub-categoria/categoria",
      SKILLS_BY_SUB_CATEGORIA: "/skill/sub-categoria",
      SERVICIOS: "/servicio",
      BUSQUEDA_SERVICIOS: "/servicio/busqueda",
      SERVICIO_DETALLE: "/servicio/details/preview",
      SERVICIO_REVIEWS: "/servicios/review",
      SERVICIOS_PROVEEDOR: "/servicio/proveedor",
      SOLICITUDES_PROVEEDOR: "/match/details/proveedor",
      MATCH: "/match",
      CHAT: "/chat",
      UPLOAD: "/upload",
      CHAT_CONVERSATION_BY_ID: "/chat",
      USUARIO_AUTH: "/usuario/auth",
      CHECK_USER_EXISTS: "/usuario/exists",
      USUARIO_OWN_SKILLS_INFO: "/usuario/own/skills/info",
      AVERAGE_SCORE_MATCHS_PROVEEDOR: "match/average-score/proveedor/$1",
      CHECK_SKILL_IN_SERVICIOS_PROVEEDOR:
        "/usuario/own/skill/$1/exists-in-servicios",
      DELETE_SKILL_FROM_PROFILE: "/usuario/own/skill/$1",
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
