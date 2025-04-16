"use client";

import MatchServicioProveedorDetailsResponse from "@/interfaces/responsebody/matching/MatchServicioProveedorDetailsResponse";
import cardStyles from "@/app/styles/cards/cardservicio.module.scss";
import { converLocalDateTimeToStandarString } from "@/utils/auxiliares";
import UsuarioResponse from "@/interfaces/responsebody/usuario/UsuarioResponse";
import { TipoMatchServicioEstado } from "@/utils/types";
import SEContainer from "../skill-exchange/containers/SEContainer";

type Params = {
  match: MatchServicioProveedorDetailsResponse;
  onOpenViewProfile: (proveedor: UsuarioResponse) => void;
  onOpenModalEnviarConstancia: (
    match: MatchServicioProveedorDetailsResponse
  ) => void;
};

const SolicitudAcuerdoItem = ({
  match,
  onOpenViewProfile,
  onOpenModalEnviarConstancia,
}: Params) => {
  return (
    <div className={`${cardStyles.cardServicio} container column`}>
      <h3 className={cardStyles.title}>{match.servicio.titulo}</h3>
      <SEContainer>
        <div className="item flex-grow-3">
          <p>
            Proveedor (a):{" "}
            <button
              className="btn-link"
              onClick={() => onOpenViewProfile(match.proveedor)}
            >{`${match.proveedor.nombres} ${match.proveedor.apellidos}`}</button>
          </p>
          <br />
          <p>
            Solicitado el: {converLocalDateTimeToStandarString(match.fecha)}
          </p>
          {match.estado === "solicitado" && (
            <p className="text-primary">En espera de respuesta</p>
          )}
          {match.estado === "pendiente-pago" && (
            <p className="text-secondary">Pendiente de pago</p>
          )}
          {match.estado === "ejecucion" && (
            <>
              <p className="text-info">Atendiendo</p>
              <p>
                Desde: {converLocalDateTimeToStandarString(match.fechaInicio)}
              </p>
            </>
          )}
          {match.estado === "finalizado" && (
            <>
              <p className="text-warning">Finalizado</p>
              <p>
                Fecha de cierre:{" "}
                {converLocalDateTimeToStandarString(match.fechaCierre)}
              </p>
            </>
          )}
          {match.estado === "rechazado" && (
            <p className="text-danger">Rechazado</p>
          )}
        </div>
        <div className="item flex-grow-1">
          {match.estado === "pendiente-pago" && (
            <button
              className="btn-secondary"
              onClick={() => onOpenModalEnviarConstancia(match)}
            >
              Enviar constancia
            </button>
          )}
          {/* {match.estado === "ejecucion" && <button className="btn-info" onClick={() =>}>Enviar mensaje</button>} */}
          {match.estado === "finalizado" && (
            <a
              className="link-button btn-primary"
              href={`/servicio/details/${match.servicio.id}`}
            >
              Comentar y puntuar
            </a>
          )}
          {match.estado === "rechazado" && (
            <p className="text-warning">{`Lo sentimos, trata de contacte nuevamente con ${match.proveedor.nombres} para agendar una nueva solicitud`}</p>
          )}
        </div>
      </SEContainer>
    </div>
  );
};

SolicitudAcuerdoItem.displayName = "SolicitudAcuerdoItem";

export default SolicitudAcuerdoItem;
