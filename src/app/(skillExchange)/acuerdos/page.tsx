"use client";

import { obtenerDetailsMatchsByCliente } from "@/actions/match.actions";
import { obtenerUsuarioLogged } from "@/actions/usuario.actions";
import ModalAlert from "@/components/ModalAlert";
import ModalEnviarConstancia from "@/components/acuerdos/ModalEnviarConstancia";
import SolicitudAcuerdoItem from "@/components/acuerdos/SolicitudAcuerdoItem";
import SELink from "@/components/skill-exchange/SELink";
import SELinkButton from "@/components/skill-exchange/SELinkButton";
import SEContainer from "@/components/skill-exchange/containers/SEContainer";
import SEForm, { SEFormControl } from "@/components/skill-exchange/form/SEForm";
import SESelect from "@/components/skill-exchange/form/SESelect";
import SEModal from "@/components/skill-exchange/messaging/SEModal";
import SELabel from "@/components/skill-exchange/text/SELabel";
import SEParragraph from "@/components/skill-exchange/text/SEParragraph";
import ModalVerPerfilUsuario from "@/components/solicitudes/ModalVerPerfilUsuario";
import MatchDictionary from "@/dictionary/matchDictionary";
import EstadoMatchOption from "@/interfaces/busqueda-servicio/EstadoMatchOption";
import MatchServicioProveedorDetailsResponse from "@/interfaces/responsebody/matching/MatchServicioProveedorDetailsResponse";
import UsuarioRegisteredResponse from "@/interfaces/responsebody/usuario/UsuarioRegisteredResponse";
import UsuarioResponse from "@/interfaces/responsebody/usuario/UsuarioResponse";
import { useEffect, useState } from "react";

interface ServicioOption {
  id: string;
  titulo: string;
}

interface MensajeSentStatus {
  idMatch: string;
  sent: boolean;
}

export default ({}) => {
  const [servicioClienteOptionSelected, setServicioClienteOptionSelected] =
    useState<ServicioOption>();
  const [proveedorPerfil, setProveedorPerfil] = useState<UsuarioResponse>();
  const [matchForEnviarConstancia, setMatchForEnviarConstancia] =
    useState<MatchServicioProveedorDetailsResponse>();
  const [cliente, setCliente] = useState<UsuarioRegisteredResponse>();
  const [mensajeEnviado, setMensajeEnviado] = useState<MensajeSentStatus>();
  const [matchsServicios, setMatchsServicios] = useState<
    MatchServicioProveedorDetailsResponse[]
  >([]);
  const [estadoSelected, setEstadoSelected] = useState<EstadoMatchOption>();

  useEffect(() => {
    loadInformation();
  }, []);

  const loadInformation = async () => {
    const usuarioLogged = await obtenerUsuarioLogged();
    setCliente(usuarioLogged);

    try {
      const matchsServicioDetails = await obtenerDetailsMatchsByCliente(
        usuarioLogged.id
      );
      setMatchsServicios(matchsServicioDetails);
    } catch {
      setMatchsServicios([]);
    }
  };

  const handleConstanciaEnviada = (constanciaEnviada: boolean) => {
    if (constanciaEnviada) {
      setMensajeEnviado({
        idMatch: matchForEnviarConstancia!.id,
        sent: constanciaEnviada,
      });
    }
  };

  const matchsServiciosFiltered = matchsServicios.filter((match) => {
    if (servicioClienteOptionSelected || estadoSelected) {
      return (
        match.servicio.id === servicioClienteOptionSelected?.id ||
        match.estado === estadoSelected?.estado
      );
    } else {
      return match;
    }
  });

  const estadoOptions: EstadoMatchOption[] = matchsServicios.map((match) => ({
    estado: match.estado,
    nombre: MatchDictionary.getEstadoDescripcion(match.estado)!,
  }));

  const serviciosClienteOptions = matchsServicios
    .map((m) => ({
      id: m.servicio.id,
      titulo: m.servicio.titulo,
    }))
    .filter(
      (option, index, options) =>
        index === options.findIndex((o) => o.id === option.id)
    );

  return (
    <>
      <SEForm inline={true}>
        <SEFormControl>
          <SELabel text="Servicio:" />
          <SESelect
            includeInitOption={false}
            options={serviciosClienteOptions.map((s) => ({
              label: s.titulo,
              value: s.id,
            }))}
            onChange={(e) =>
              setServicioClienteOptionSelected(
                serviciosClienteOptions.find((m) => m.id === e.target.id)
              )
            }
          />
        </SEFormControl>
        <SEFormControl>
          <SELabel text="Estado:" />
          <SESelect
            includeInitOption={false}
            options={estadoOptions.map((e, i) => ({
              label: e.nombre,
              value: e.estado,
            }))}
            onChange={(e) =>
              setEstadoSelected(
                estadoOptions.find((s) => s.estado === e.target.value)
              )
            }
          />
        </SEFormControl>
      </SEForm>
      <SEContainer>
        {matchsServiciosFiltered.length > 0 ? (
          matchsServiciosFiltered.map((m) => (
            <SolicitudAcuerdoItem
              key={m.id}
              onOpenModalEnviarConstancia={(match) =>
                setMatchForEnviarConstancia(match)
              }
              onOpenViewProfile={(proveedor) => setProveedorPerfil(proveedor)}
              match={m}
            />
          ))
        ) : (
          <>
            <SEParragraph>No hay acuerdos por ahora</SEParragraph>
            <SELinkButton link="/servicio" label="Buscar servicios" />
          </>
        )}
      </SEContainer>

      {proveedorPerfil && (
        <ModalVerPerfilUsuario
          cliente={proveedorPerfil!}
          onClose={() => setProveedorPerfil(undefined)}
        />
      )}

      {/**
       * Enviar constancia
       */}
      {matchForEnviarConstancia && (
        <ModalEnviarConstancia
          key={matchForEnviarConstancia.id}
          onClose={() => setMatchForEnviarConstancia(undefined)}
          proveedor={matchForEnviarConstancia.proveedor}
          onMessageSent={handleConstanciaEnviada}
          cliente={cliente!}
        />
      )}
      {mensajeEnviado && (
        <ModalAlert
          key={mensajeEnviado.idMatch}
          onClose={() => {
            setMatchForEnviarConstancia(undefined);
            setMensajeEnviado(undefined);
          }}
        >
          <SEParragraph>Constancia enviada con éxito</SEParragraph>
        </ModalAlert>
      )}
    </>
  );
};
