"use client";

import {
  actualizarMatchEstado,
  obtenerDetailsMatchsPrestamistaAndOptionalEstado,
} from "@/actions/match.actions";
import { obtenerServiciosByPrestamista } from "@/actions/servicio.actions";
import MatchServicioDetailsResponse from "@/interfaces/responsebody/matching/MatchServicioDetailsResponse";
import ServicioResponse from "@/interfaces/responsebody/servicio/ServicioResponse";
import { Suspense, useEffect, useState } from "react";
import UsuarioResponse from "@/interfaces/responsebody/usuario/UsuarioResponse";
import ModalVerPerfilUsuario from "@/components/solicitudes/ModalVerPerfilUsuario";
import SolicitudItem from "@/components/solicitudes/SolicitudItem";
import ModalAlert from "@/components/ModalAlert";
import ModalConfirm from "@/components/ModalConfirm";
import { obtenerUsuarioLogged } from "@/actions/usuario.actions";
import LoadingSolicitudes from "@/components/loading/LoadingSolicitudes";
import wrapPromise from "@/utils/wrapPromise";

/* interface ServicioOption {
    id: string;
    titulo: string;
}

let status = "pending";
let result: MatchServicioDetailsResponse[] | unknown;
const matchsData = loadInformation();

function loadInformation() {
    let loadingMatchs = async () => {
        await new Promise(resolver => setTimeout(resolver, 60000));
        try {
            const userLogged = await obtenerUsuarioLogged();
            result = await obtenerDetailsMatchsPrestamistaAndOptionalEstado(userLogged.id, "solicitado");
            status = "OK";
        } catch (error) {
            result = error;
            status = "failed";
        }
    }

    return () => {
        if (status === "pending") {
            throw loadingMatchs();
        } else if (status === "failed") {
            throw result;
        } else if (status === "OK") {
            return result as MatchServicioDetailsResponse[];
        }
    }
} */

export default () => {
  //const [matchsServicioSelected, setMatchsServicioSelected] = useState<MatchServicioDetailsResponse[]>([]);
  //const [matchsServicioDetails, setMatchsServicioDetails] = useState<MatchServicioDetailsResponse[]>();
  //const [servicios, setServicios] = useState<ServicioResponse[]>([]);
  const getMatchServicioDetails = () => {
    return obtenerUsuarioLogged().then((userLogged) => {
      return obtenerDetailsMatchsPrestamistaAndOptionalEstado(
        userLogged.id,
        "solicitado"
      );
    });
  };

  const [servicio, setServicio] = useState<ServicioResponse>();
  const [clienteModalData, setClienteModalData] = useState<UsuarioResponse>();
  const [openModalCliente, setOpenModalCliente] = useState<boolean>(false);
  const [openModalSolicitudAprobada, setOpenModalSolicitudAprobada] =
    useState<boolean>(false);
  const [clienteAceptado, setClienteAceptado] = useState<UsuarioResponse>();
  const [matchForRechazo, setMatchForRechazo] =
    useState<MatchServicioDetailsResponse>();
  const [openModalSolicitudRechazada, setOpenModalSolicitudRechazada] =
    useState<boolean>(false);
  const [
    openModalConfirmSolicitudRechazo,
    setOpenModalConfirmSolicitudRechazo,
  ] = useState<boolean>(false);
  const matchsResource = wrapPromise(getMatchServicioDetails());
  let matchsServicioDetails = matchsResource.read();
  let matchsServicioSelected: MatchServicioDetailsResponse[] = (
    matchsServicioDetails as MatchServicioDetailsResponse[]
  ).filter((match) => match.servicio.id === servicio?.id);
  let servicios: ServicioResponse[];
  let status = "pending";

  /* const matchsServicioDetails = matchsData(); */
  /* if (matchsServicioDetails) {
        setServicios(matchsServicioDetails.map(m => m.servicio)
            .filter((servicioItem, index, arrayServicios) => index === arrayServicios.findIndex(s => s.id === servicioItem.id)));
    } */

  //let matchsServicioDetails: MatchServicioDetailsResponse[] = [];

  /* useEffect(() => {
        loadInformation();
    }, []); */

  /* const loadInformation = async () => {
        await new Promise(resolver => setTimeout(resolver, 6000));
        const userLogged = await obtenerUsuarioLogged();
        try {
            matchsServicioDetails = await obtenerDetailsMatchsPrestamistaAndOptionalEstado(userLogged.id, "solicitado");
            matchsServicioSelected = matchsServicioDetails?.filter(match => match.servicio.id === servicio?.id);
            servicios = matchsServicioDetails.map(m => m.servicio)
                .filter((servicioItem, index, arrayServicios) => (
                    index === arrayServicios.findIndex(s => s.id === servicioItem.id)
                ));
            status = "OK"
        } catch {
            status = "error";
        }
    } */

  const openModalViewProfile = (cliente: UsuarioResponse) => {
    setClienteModalData(cliente);
    setOpenModalCliente(true);
  };

  const handleCloseModal = () => {
    setOpenModalCliente(false);
  };

  const handleSolicitudAprobada = (cliente: UsuarioResponse) => {
    setOpenModalSolicitudAprobada(true);
    setClienteAceptado(cliente);
  };

  const closeSolicitudAprobada = () => {
    setOpenModalSolicitudAprobada(false);
    setClienteAceptado(undefined);
  };

  const handleConfirmSolicitudForRechazo = (
    match: MatchServicioDetailsResponse
  ) => {
    // Abrir modal de confirmación de rechazar solicitud
    setOpenModalConfirmSolicitudRechazo(true);
    setMatchForRechazo(match);
  };

  const cancelarRechazoSolicitud = () => {
    setOpenModalConfirmSolicitudRechazo(false);
    setMatchForRechazo(undefined);
  };

  const rechazarSolicitud = async () => {
    // Rechazar solicitud
    const matchRechazado = await actualizarMatchEstado(matchForRechazo!.id, {
      estado: "rechazado",
    });
    if (matchRechazado) {
      setOpenModalConfirmSolicitudRechazo(false); // Cerrar modal de confirmar rechazo
      setMatchForRechazo(undefined);

      // Abrir modal de solicitud rechazada correctamente
      setOpenModalSolicitudRechazada(true);
    }
  };

  const closeSolicitudRechazada = () => {
    setOpenModalSolicitudRechazada(false);
  };

  //const matchsServicioSelected = matchsServicioDetails?.filter(match => match.servicio.id === servicio?.id);

  return (
    <>
      <div className="principal">
        <div className="form-row">
          <div className="form-control">
            <label htmlFor="servicio">Servicio:</label>
            <select
              name="servicio"
              value={servicio?.id}
              onChange={(e) =>
                setServicio(servicios.find((s) => s.id === e.target.value))
              }
            >
              <option>--Seleccione--</option>
              {servicios!.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.titulo}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          {matchsServicioSelected!.length > 0 ? (
            matchsServicioSelected!.map((m) => (
              <SolicitudItem
                key={m.id}
                match={m}
                sendModalState={openModalViewProfile}
                sendSolicitudAprobada={handleSolicitudAprobada}
                sendSolicitudForRechazo={handleConfirmSolicitudForRechazo}
              />
            ))
          ) : (
            <>
              <p>No hay solicitudes por ahora</p>
              <a className="link-button btn-primary" href="/contratos">
                Ver mis contratos
              </a>
            </>
          )}
        </div>
      </div>

      {openModalCliente && !!clienteModalData && (
        <ModalVerPerfilUsuario
          cliente={clienteModalData!}
          onClose={handleCloseModal}
        />
      )}
      {openModalSolicitudAprobada && !!clienteAceptado && (
        <ModalAlert onClose={closeSolicitudAprobada}>
          <p>!Excelente! Tienes un trato con {clienteAceptado?.nombres}</p>
          <p>Contáctate para que pueda realizar el pago.</p>
        </ModalAlert>
      )}
      {openModalConfirmSolicitudRechazo && !!matchForRechazo && (
        <ModalConfirm
          onConfirm={rechazarSolicitud}
          onCancel={cancelarRechazoSolicitud}
          onClose={cancelarRechazoSolicitud}
        >
          <p>{`¿Está seguro de rechazar la solicitud de ${matchForRechazo?.cliente.nombres}?`}</p>
        </ModalConfirm>
      )}
      {openModalSolicitudRechazada && (
        <ModalAlert onClose={closeSolicitudRechazada}>
          <p>Solicitud rechazada</p>
        </ModalAlert>
      )}
    </>
  );
};
