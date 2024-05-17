import { TipoMatchServicioEstado } from "../utils/types"

interface MatchEstadohDescription {
    estado: TipoMatchServicioEstado;
    descripcion: string
}

const matchsEstadoDescription: MatchEstadohDescription[] = [
    {
        estado: "ejecucion",
        descripcion: "En ejecución"
    },
    {
        estado: "finalizado",
        descripcion: "Finalizado"
    },
    {
        estado: "pendiente-pago",
        descripcion: "Pendiente de pago"
    },
    {
        estado: "rechazado",
        descripcion: "Rechazado"
    },
    {
        estado: "solicitado",
        descripcion: "Solicitado"
    }
];

const MatchDictionary = {
    getEstadoDescripcion: (estado: TipoMatchServicioEstado) =>
        (matchsEstadoDescription.find(m => m.estado === estado)?.descripcion)

}

export default MatchDictionary;