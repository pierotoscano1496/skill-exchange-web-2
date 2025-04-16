"use client";

import {
  actualizarMatchEstado,
  obtenerDetailsMatchsPrestamistaEnServicio,
} from "@/actions/match.actions";
import { obtenerUsuarioLogged } from "@/actions/usuario.actions";
import ModalAlert from "@/components/ModalAlert";
import ModalConfirm from "@/components/ModalConfirm";
import MatchContratoItem from "@/components/contratos/MatchContratoItem";
import SELinkButton from "@/components/skill-exchange/SELinkButton";
import SEContainer from "@/components/skill-exchange/containers/SEContainer";
import SEForm, { SEFormControl } from "@/components/skill-exchange/form/SEForm";
import SESelect from "@/components/skill-exchange/form/SESelect";
import SELabel from "@/components/skill-exchange/text/SELabel";
import SEParragraph from "@/components/skill-exchange/text/SEParragraph";
import ModalVerPerfilUsuario from "@/components/solicitudes/ModalVerPerfilUsuario";
import EstadoMatchOption from "@/interfaces/busqueda-servicio/EstadoMatchOption";
import MatchServicioDetailsResponse from "@/interfaces/responsebody/matching/MatchServicioDetailsResponse";
import UsuarioRegisteredResponse from "@/interfaces/responsebody/usuario/UsuarioRegisteredResponse";
import UsuarioResponse from "@/interfaces/responsebody/usuario/UsuarioResponse";
import React, { useEffect, useState } from "react";

interface ServicioOption {
  id: string;
  titulo: string;
}

const ContratosPage: React.FC = () => {
  const [matchsServicios, setMatchsServicios] = useState<
    MatchServicioDetailsResponse[]
  >([]);
  const [
    serviciosClienteOptionsForSearch,
    setServiciosClienteOptionsForSearch,
  ] = useState<ServicioOption[]>([]);
  const [clientePerfil, setClientePerfil] = useState<UsuarioResponse>();
  const [matchForConfirmarConstancia, setMatchForConfirmarConstancia] =
    useState<MatchServicioDetailsResponse>();
  const [matchForFinalizar, setMatchForFinalizar] =
    useState<MatchServicioDetailsResponse>();
  const [servicioOptionSelected, setServicioOptionSelected] =
    useState<ServicioOption>();
  const [estadoSelected, setEstadoSelected] = useState<EstadoMatchOption>();

  const estadosForSearch: EstadoMatchOption[] = [
    {
      estado: "pendiente-pago",
      nombre: "Pendiente de pago",
    },
    {
      estado: "ejecucion",
      nombre: "Atendiendo",
    },
    {
      estado: "finalizado",
      nombre: "Finalizado",
    },
  ];

  let matchsServicioDetails: MatchServicioDetailsResponse[] = [];
  let prestamista: UsuarioRegisteredResponse | null = null;

  useEffect(() => {
    const loadInformation = async () => {
      prestamista = await obtenerUsuarioLogged();

      try {
        matchsServicioDetails = await obtenerDetailsMatchsPrestamistaEnServicio(
          prestamista.id
        );

        //const servicios = await obtenerServiciosByPrestamista(cliente.id);
        setMatchsServicios(matchsServicioDetails);

        // Mapear los servicios de los matchs del proveedor
        setServiciosClienteOptionsForSearch(
          matchsServicioDetails
            .map((m) => ({
              id: m.servicio.id,
              titulo: m.servicio.titulo,
            }))
            .filter(
              (option, index, options) =>
                index === options.findIndex((o) => o.id === option.id)
            )
        );
      } catch (error) {
        console.log("No se cargaron los matchs");
      }
    };

    loadInformation();
  }, []);

  const openModalConfirmarConstancia = (
    match: MatchServicioDetailsResponse
  ) => {
    setMatchForConfirmarConstancia(match);
  };

  const openModalConfirmarFinalizacion = (
    match: MatchServicioDetailsResponse
  ) => {
    setMatchForFinalizar(match);
  };

  const confirmarContancia = async () => {
    if (matchForConfirmarConstancia) {
      const matchConfirmado = await actualizarMatchEstado(
        matchForConfirmarConstancia.id,
        {
          estado: "ejecucion",
        }
      );
      if (matchConfirmado) {
        setMatchForConfirmarConstancia({
          ...matchForConfirmarConstancia,
          estado: matchConfirmado.estado,
        });
      }
    }
  };

  const confirmarFinalizacion = async () => {
    if (matchForFinalizar) {
      const matchFinalizado = await actualizarMatchEstado(
        matchForFinalizar.id,
        {
          estado: "finalizado",
        }
      );
      if (matchFinalizado) {
        setMatchForFinalizar({
          ...matchForFinalizar,
          estado: matchFinalizado.estado,
        });
      }
    }
  };

  const matchsServiciosFiltered = matchsServicios.filter((match) =>
    servicioOptionSelected || estadoSelected
      ? match.servicio.id === servicioOptionSelected?.id ||
        match.estado === estadoSelected?.estado
      : match
  );

  return (
    <>
      <SEContainer size="medium">
        <SEForm>
          <SEFormControl>
            <SELabel text="Servicio:" />
            <SESelect
              includeInitOption={false}
              options={serviciosClienteOptionsForSearch.map((s) => ({
                label: s.titulo,
                value: s.id,
              }))}
              onChange={(e) =>
                setServicioOptionSelected(
                  serviciosClienteOptionsForSearch.find(
                    (s) => s.id === e.target.value
                  )
                )
              }
            />
          </SEFormControl>
          <SEFormControl>
            <SELabel text="Estado:" />
            <SESelect
              includeInitOption={false}
              options={estadosForSearch.map((e) => ({
                label: e.nombre,
                value: e.estado,
              }))}
              onChange={(e) =>
                setEstadoSelected(
                  estadosForSearch.find((s) => s.estado === e.target.value)
                )
              }
            />
          </SEFormControl>
        </SEForm>
        {matchsServiciosFiltered.length > 0 ? (
          matchsServiciosFiltered.map((m) => (
            <MatchContratoItem
              key={m.id}
              match={m}
              onOpenModalConfirmarConstancia={openModalConfirmarConstancia}
              onOpenModalConfirmarFinalizacion={openModalConfirmarFinalizacion}
              onOpenViewProfile={() => setClientePerfil(m.cliente)}
            />
          ))
        ) : (
          <>
            <SEParragraph variant="error">
              No hay contratos por ahora
            </SEParragraph>
            <SELinkButton label="Ver mis servicios" link="/servicio/own" />
          </>
        )}
      </SEContainer>

      {/**
       * Confirmación para cambiar el estado de un match a "ejecucion"
       */}
      {matchForConfirmarConstancia && (
        <ModalConfirm
          key={matchForConfirmarConstancia.id}
          onCancel={() => setMatchForConfirmarConstancia(undefined)}
          onClose={() => setMatchForConfirmarConstancia(undefined)}
          onConfirm={confirmarContancia}
        >
          <SEParragraph>
            Compruebe que haya recibido la constancia de pago de parte del
            cliente para comenzar a brindar el servicio.
          </SEParragraph>
          <SEParragraph>
            Una vez comprobado, haga click en &quot;Aceptar&quot;.
          </SEParragraph>
        </ModalConfirm>
      )}
      {matchForConfirmarConstancia?.estado === "ejecucion" && (
        <ModalAlert
          key={matchForConfirmarConstancia.id}
          onClose={() => setMatchForConfirmarConstancia(undefined)}
        >
          <SEParragraph>
            !Felicidades! Tienes un trato con{" "}
            {matchForConfirmarConstancia.cliente.nombres}. Te estará esperando
          </SEParragraph>
        </ModalAlert>
      )}

      {/**
       * Finalizar match
       */}
      {matchForFinalizar && (
        <ModalConfirm
          onCancel={() => setMatchForFinalizar(undefined)}
          onClose={() => setMatchForFinalizar(undefined)}
          onConfirm={confirmarFinalizacion}
        >
          <SEParragraph>¿Está seguro de finalizar el servicio?</SEParragraph>
          <SEParragraph>Esta acción no se puede revertir.</SEParragraph>
        </ModalConfirm>
      )}
      {matchForFinalizar?.estado === "finalizado" && (
        <ModalAlert
          key={matchForFinalizar.id}
          onClose={() => setMatchForFinalizar(undefined)}
        >
          <SEParragraph>
            Muchas gracias por colaborar con {matchForFinalizar.cliente.nombres}
          </SEParragraph>
          <SEParragraph>
            Esperemos que se contacte contigo nuevamente en otra oportunidad.
          </SEParragraph>
        </ModalAlert>
      )}

      {/**
       * Ver perfil de usuario
       */}
      {clientePerfil && (
        <ModalVerPerfilUsuario
          cliente={clientePerfil}
          onClose={() => setClientePerfil(undefined)}
        />
      )}
    </>
  );
};

ContratosPage.displayName = "ContratosPage";

export default ContratosPage;
