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
import SEContainer from "@/components/skill-exchange/containers/SEContainer";
import SELabel from "@/components/skill-exchange/text/SELabel";
import SESelect from "@/components/skill-exchange/form/SESelect";
import SELinkButton from "@/components/skill-exchange/SELinkButton";
import SEParragraph from "@/components/skill-exchange/text/SEParragraph";

const SolcitudesPage = () => {
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
  const [matchsServicioDetails, setMatchsServicioDetails] = useState<
    MatchServicioDetailsResponse[]
  >([]);
  const [servicios, setServicios] = useState<ServicioResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInformation = async () => {
      try {
        const userLogged = await obtenerUsuarioLogged();
        const matchs = await obtenerDetailsMatchsPrestamistaAndOptionalEstado(
          userLogged.id,
          "solicitado"
        );
        setMatchsServicioDetails(matchs);

        // Extraer servicios únicos
        const serviciosUnicos = matchs
          .map((m) => m.servicio)
          .filter(
            (servicioItem, index, arrayServicios) =>
              index ===
              arrayServicios.findIndex((s) => s.id === servicioItem.id)
          );
        setServicios(serviciosUnicos);
      } catch (error) {
        console.error("Error loading information:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInformation();
  }, []);

  const matchsServicioSelected = matchsServicioDetails.filter(
    (match) => match.servicio.id === servicio?.id
  );

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

  return (
    <>
      <SEContainer size="medium">
        <SESelect
          label="Servicio"
          options={servicios.map((s, i) => ({
            label: s.titulo,
            value: s.id,
          }))}
          onChange={(e) =>
            setServicio(servicios.find((s) => s.id === e.target.value))
          }
        />
      </SEContainer>
      {isLoading ? (
        <LoadingSolicitudes />
      ) : matchsServicioSelected.length > 0 ? (
        matchsServicioSelected.map((m) => (
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
          <SEParragraph variant="error">
            No hay solicitudes por ahora
          </SEParragraph>
          <SELinkButton label="Ver mis contratos" link="/contratos" />
        </>
      )}

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

SolcitudesPage.displayName = "SolcitudesPage";

export default SolcitudesPage;
