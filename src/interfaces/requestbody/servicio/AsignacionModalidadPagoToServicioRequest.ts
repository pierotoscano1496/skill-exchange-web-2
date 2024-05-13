import { TipoModalidadPago } from "@/utils/types";

export default interface AsignacionModalidadPagoToServicioRequest {
    tipo: TipoModalidadPago;
    cuentaBancaria?: string;
    numeroCelular?: string;
    url?: string;
}