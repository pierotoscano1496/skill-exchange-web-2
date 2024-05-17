import cardStyles from "@/app/styles/cards/cardservicio.module.scss";
import { converDateTimeToStandarString, converLocalDateTimeToStandarString } from "@/utils/auxiliares";
import UsuarioResponse from "@/interfaces/responsebody/usuario/UsuarioResponse";
import MatchServicioDetailsResponse from "@/interfaces/responsebody/matching/MatchServicioDetailsResponse";

type Params = {
    match: MatchServicioDetailsResponse;
    onOpenViewProfile: (cliente: UsuarioResponse) => void;
    onOpenModalConfirmarConstancia: (match: MatchServicioDetailsResponse) => void;
    onOpenModalConfirmarFinalizacion: (match: MatchServicioDetailsResponse) => void;
}

export default ({ match, onOpenViewProfile, onOpenModalConfirmarConstancia, onOpenModalConfirmarFinalizacion }: Params) => {
    return (
        <div className={`${cardStyles.cardServicio} container column`}>
            <h3 className={cardStyles.title}>{match.servicio.titulo}</h3>
            <div className="container">
                <div className="item flex-grow-3">
                    <p>Cliente (a): <button className="btn-link" onClick={() => onOpenViewProfile(match.cliente)}>{`${match.cliente.nombres} ${match.cliente.apellidos}`}</button></p>
                    <br />
                    <p>Solicitado el: {converLocalDateTimeToStandarString(match.fecha)}</p>
                    {match.estado === "pendiente-pago" && <p className="text-secondary">Pago pendiente</p>}
                    {match.estado === "ejecucion" &&
                        <>
                            <p className="text-info">En ejecución</p>
                            <p>Iniciado el {converLocalDateTimeToStandarString(match.fechaInicio)}</p>
                        </>
                    }
                    {match.estado === "finalizado" &&
                        <>
                            <p className="text-warning">Finalizado</p>
                            <p>Fecha de cierre: {converLocalDateTimeToStandarString(match.fechaCierre)}</p>
                        </>
                    }
                </div>
                <div className="item flex-grow-1">
                    {match.estado === "pendiente-pago" &&
                        <button className="btn-secondary" onClick={() => onOpenModalConfirmarConstancia(match)}>Confirmar recepción de pago</button>}
                    {match.estado === "ejecucion" && <button className="btn-info" onClick={() => onOpenModalConfirmarFinalizacion(match)}>Finalizar servicio</button>}
                </div>
            </div>
        </div>
    )
}