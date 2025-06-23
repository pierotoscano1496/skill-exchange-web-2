// Enums del backend en Spring convertidos a TypeScript

export enum ServicioModalidad {
  PRESENCIAL = "presencial",
  REMOTO = "remoto",
  MIXTO = "mixto",
}

export enum ServicioTipoPrecio {
  FIJO = "fijo",
  HORA = "hora",
  RANGO = "rango",
}

export enum ServicioDia {
  LUNES = "lunes",
  MARTES = "martes",
  MIERCOLES = "miercoles",
  JUEVES = "jueves",
  VIERNES = "viernes",
  SABADO = "sabado",
  DOMINGO = "domingo",
}

export enum UsuarioTipo {
  CLIENTE = "cliente",
  PROVEEDOR = "proveedor",
}

export enum UsuarioTipoDocumento {
  DNI = "dni",
  CARNET_EXTRANJERIA = "carnet_extranjeria",
}

export enum PlanTipo {
  FREE = "free",
  PREMIUM = "premiun", // Nota: mantiene el typo "premiun" del backend
}

export enum ModalidadPagoTipo {
  YAPE = "yape",
  TARJETA = "tarjeta",
  LINEA = "linea",
  EFECTIVO = "efectivo",
}

export enum MatchServicioEstado {
  SOLICITADO = "solicitado",
  PENDIENTE_PAGO = "pendiente_pago",
  RECHAZADO = "rechazado",
  EJECUCION = "ejecucion",
  FINALIZADO = "finalizado",
}

export enum InfoBancariaTipoTarjeta {
  VISA = "visa",
  MASTERCARD = "mastercard",
  AMEX = "amex",
}
