export type TipoDocumento = "dni" | "carnet_extranjeria";

export type TipoRegistroUsuario = "cliente" | "proveedor";

export type MedioRecursoMultimedia = "video" | "imagen" | "web-externa" | "facebook" | "instagram" | "tiktok" | "youtube" | "twitter" | "linkedin";

export type TipoModalidadPago = "yape" | "tarjeta";

export type TipoModalidadPagoOption = {
    nombre: string;
    valor: TipoModalidadPago;
}

export type TipoMatchServicioEstado = "solicitado" | "pendiente-pago" | "rechazado" | "ejecucion" | "finalizado";