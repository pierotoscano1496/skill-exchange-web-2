import { ModeViewsType } from "@/enums/ModeViews";
import { ShapeType } from "@/enums/Shapes";
import { ThemesType } from "@/enums/Themes";

export type TipoDocumento = "dni" | "carnet_extranjeria";

export type TipoRegistroUsuario = "cliente" | "proveedor";

export type SocialMedia =
  | "facebook"
  | "instagram"
  | "tiktok"
  | "youtube"
  | "twitter"
  | "linkedin";

export type MedioRecursoMultimedia =
  | "video"
  | "imagen"
  | "web-externa"
  | SocialMedia;

export type TipoModalidadPago = "yape" | "tarjeta";

export type TipoModalidadPagoOption = {
  nombre: string;
  valor: TipoModalidadPago;
};

export type SelectOptions = {
  value: string;
  label: string;
};

export type TipoMatchServicioEstado =
  | "solicitado"
  | "pendiente-pago"
  | "rechazado"
  | "ejecucion"
  | "finalizado";

export type FileExtension =
  | "jpg"
  | "jpeg"
  | "png"
  | "doc"
  | "docx"
  | "pdf"
  | "doc"
  | "docx"
  | "ppt"
  | "pptx"
  | "xls"
  | "xlsx";

export type Variant = {
  background?: string;
  hoverBackground100?: string;
  hoverBackground600?: string;
  hoverBackground400?: string;
  text?: string;
  textOutile?: string;
  text100?: string;
  text500?: string;
  border?: string;
  focus?: string;
  hoverText?: string;
  disable?: string;
};

export type VariantClasses = {
  [key in ThemesType]?: Variant;
};

export type ShapeStyles = {
  padding?: string;
  margin?: string;
  dimensions?: string;
  text?: string;
  another?: string;
  flex?: string;
};

export type ShapeClasses = {
  [key in ShapeType]?: ShapeStyles;
};

export type VariantMode = {
  background?: string;
  hoverBackground?: string;
  text?: string;
  hoverText?: string;
  textOutile?: string;
  border?: string;
  focus?: string;
  disable?: string;
};

export type ModeClasses = {
  [key in ModeViewsType]?: VariantMode;
};
