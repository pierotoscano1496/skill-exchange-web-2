"use client";

import { actualizarMatchEstado } from "@/actions/match.actions";
import cardStyles from "@/app/styles/cards/cardservicio.module.scss";
import MatchServicioDetailsResponse from "@/interfaces/responsebody/matching/MatchServicioDetailsResponse";
import MatchServicioResponse from "@/interfaces/responsebody/matching/MatchServicioResponse";
import UsuarioResponse from "@/interfaces/responsebody/usuario/UsuarioResponse";
import { converDateTimeToStandarString } from "@/utils/auxiliares";

type Params = {
  match: MatchServicioDetailsResponse;
  sendModalState: (cliente: UsuarioResponse) => void;
  sendSolicitudAprobada: (cliente: UsuarioResponse) => void;
  sendSolicitudForRechazo: (match: MatchServicioDetailsResponse) => void;
};

const SolicitudItem = ({
  match,
  sendModalState,
  sendSolicitudAprobada,
  sendSolicitudForRechazo,
}: Params) => {
  const openModalViewProfile = (cliente: UsuarioResponse) => {
    sendModalState(cliente);
  };

  const aprobarSolicitud = async () => {
    const matchAceptado = await actualizarMatchEstado(match.id, {
      estado: "pendiente-pago",
    });
    if (matchAceptado) {
      sendSolicitudAprobada(match.cliente);
    }
  };

  const confirmRechazarSolicitud = () => {
    sendSolicitudForRechazo(match);
  };

  return (
    <div className={`${cardStyles.cardServicio} container column`}>
      <h3 className={cardStyles.title}>{match.servicio.titulo}</h3>
      <div className="container">
        <div className="item flex-grow-3">
          <p>
            Solicitado por{" "}
            <button
              className="btn-link"
              onClick={() => openModalViewProfile(match.cliente)}
            >{`${match.cliente.nombres} ${match.cliente.apellidos}`}</button>
          </p>
          <br />
          {/* <p>Fecha y hora: {converDateTimeToStandarString(match.fecha)}</p> */}
        </div>
        <div className="item flex-grow-1 btn-group">
          <button className="btn-primary" onClick={aprobarSolicitud}>
            Aprobar
          </button>
          <button className="btn-danger" onClick={confirmRechazarSolicitud}>
            Rechazar
          </button>
        </div>
      </div>
    </div>
  );
};

SolicitudItem.displayName = "SolicitudItem";
export default SolicitudItem;
