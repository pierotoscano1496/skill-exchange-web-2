import { TipoModalidadPago } from "@/utils/types";

export default interface MedioPagoResponse {
    id: string;
    tipo: TipoModalidadPago;
    cuentaBancaria: string;
    numeroCelular: string;

}