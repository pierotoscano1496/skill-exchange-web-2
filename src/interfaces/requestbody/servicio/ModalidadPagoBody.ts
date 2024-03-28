import { TipoModalidadPago } from "@/utils/types";

export default interface ModalidadPagoBody {
    tipo: TipoModalidadPago;
    cuentaBancaria: string;
    numeroCelular: string;
}