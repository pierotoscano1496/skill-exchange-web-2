import { TipoModalidadPago } from "@/utils/types";

export default interface AsignacionMedioPago {
    id?: string;
    tipo: TipoModalidadPago;
    cci: string;
    celular: string;
}