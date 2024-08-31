import { ThemesType } from "@/enums/Themes";

export type TipoDocumento = "dni" | "carnet_extranjeria";

export type TipoRegistroUsuario = "cliente" | "proveedor";

export type MedioRecursoMultimedia = "video" | "imagen" | "web-externa" | "facebook" | "instagram" | "tiktok" | "youtube" | "twitter" | "linkedin";

export type TipoModalidadPago = "yape" | "tarjeta";

export type TipoModalidadPagoOption = {
    nombre: string;
    valor: TipoModalidadPago;
};

export type SelectOptions = {
    value: string;
    label: string;
};

export type TipoMatchServicioEstado = "solicitado" | "pendiente-pago" | "rechazado" | "ejecucion" | "finalizado";

export type FileExtension = "jpg" | "jpeg" | "png" | "doc" | "docx" | "pdf" | "doc" | "docx" | "ppt" | "pptx" | "xls" | "xlsx";

export type Variant = {
    background?: string;
    hoverBackground?: string;
    text?: string;
    focus?: string;
    disable?: string;
}

export type VariantClasses = {
    [key in ThemesType]?: Variant
};