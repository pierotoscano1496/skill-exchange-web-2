"use client";

import { obtenerDetailsMatchsByCliente } from "@/actions/match.actions";
import { obtenerUsuarioLogged } from "@/actions/usuario.actions";
import ModalAlert from "@/components/ModalAlert";
import ModalEnviarConstancia from "@/components/acuerdos/ModalEnviarConstancia";
import SolicitudAcuerdoItem from "@/components/acuerdos/SolicitudAcuerdoItem";
import ModalVerPerfilUsuario from "@/components/solicitudes/ModalVerPerfilUsuario";
import Usuario from "@/interfaces/Usuario";
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

export default ({ }) => {
    const [serviciosClienteOptions, setServiciosClienteOptions] = useState<ServicioOption[]>([]);
    const [servicioClienteOptionSelected, setServicioClienteOptionSelected] = useState<ServicioOption>();
    const [proveedorPerfil, setProveedorPerfil] = useState<UsuarioResponse>();
    const [matchForEnviarConstancia, setMatchForEnviarConstancia] = useState<MatchServicioProveedorDetailsResponse>();
    const [cliente, setCliente] = useState<UsuarioRegisteredResponse>();
    const [mensajeEnviado, setMensajeEnviado] = useState<MensajeSentStatus>();
    const [matchsServicios, setMatchsServicios] = useState<MatchServicioProveedorDetailsResponse[]>([]);
    const [estadoSelected, setEstadoSelected] = useState<EstadoMatchOption>();

    const estadosForSearch: EstadoMatchOption[] = [{
        estado: "pendiente-pago",
        nombre: "Pendiente de pago"
    }, {
        estado: "ejecucion",
        nombre: "Atendiendo"
    }, {
        estado: "finalizado",
        nombre: "Finalizado"
    }];

    useEffect(() => {
        loadInformation();
    }, []);

    const loadInformation = async () => {
        const usuarioLogged = await obtenerUsuarioLogged();
        setCliente(usuarioLogged);
        const matchsServicioDetails = await obtenerDetailsMatchsByCliente(usuarioLogged.id);
        //const servicios = await obtenerServiciosByPrestamista(cliente.id);
        setMatchsServicios(matchsServicioDetails);

        // Mapear los servicios de los matchs del cliente (incluye rechazados)
        const serviciosOptions = matchsServicioDetails.map(m => ({
            id: m.servicio.id,
            titulo: m.servicio.titulo
        } as ServicioOption))
            .filter((option, index, options) => (
                index === options.findIndex(o => o.id === option.id)
            ));

        setServiciosClienteOptions(serviciosOptions);
    }

    const handleConstanciaEnviada = (constanciaEnviada: boolean) => {
        if (constanciaEnviada) {
            setMensajeEnviado({
                idMatch: matchForEnviarConstancia!.id,
                sent: constanciaEnviada
            })
        }
    }

    const matchsServiciosFiltered = matchsServicios.filter(match =>
        match.servicio.id === servicioClienteOptionSelected?.id &&
        match.estado === estadoSelected?.estado
    );

    return (
        <>
            <div className="principal">
                <div className="form">
                    <div className="form-control">
                        <label htmlFor="servicio">Servicio:</label>
                        <select name="servicio"
                            onChange={(e) => setServicioClienteOptionSelected(serviciosClienteOptions.find(m => m.id === e.target.id))}>
                            <option>--Seleccione--</option>
                            {serviciosClienteOptions.map(s =>
                                <option key={s.id} value={s.id}>{s.titulo}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-control">
                        <label htmlFor="estado">Estado:</label>
                        <select name="estado"
                            onChange={(e) => setEstadoSelected(estadosForSearch.find(s => s.estado === e.target.value))}>
                            <option>--Seleccione--</option>
                            {estadosForSearch.map((e, i) =>
                                <option key={i} value={e.estado}>{e.nombre}</option>
                            )}
                        </select>
                    </div>
                </div>
                <div>
                    {matchsServiciosFiltered.length > 0 ? matchsServiciosFiltered.map(m =>
                        <SolicitudAcuerdoItem
                            key={m.id}
                            onOpenModalEnviarConstancia={(match) => setMatchForEnviarConstancia(match)}
                            onOpenViewProfile={(proveedor) => setProveedorPerfil(proveedor)}
                            match={m}
                        />
                    ) :
                        <>
                            <p>No hay solicitudes por ahora</p>
                            <a className="link-button btn-primary" href="/contratos">Ver mis contratos</a>
                        </>
                    }
                </div>
            </div>

            {proveedorPerfil &&
                <ModalVerPerfilUsuario
                    cliente={proveedorPerfil!}
                    onClose={() => setProveedorPerfil(undefined)} />
            }

            {/**
             * Enviar constancia
             */}
            {matchForEnviarConstancia &&
                <ModalEnviarConstancia key={matchForEnviarConstancia.id}
                    onClose={() => setMatchForEnviarConstancia(undefined)}
                    proveedor={matchForEnviarConstancia.proveedor}
                    onMessageSent={handleConstanciaEnviada}
                    cliente={cliente!}
                />
            }
            {mensajeEnviado &&
                <ModalAlert key={mensajeEnviado.idMatch}
                    onClose={() => {
                        setMatchForEnviarConstancia(undefined);
                        setMensajeEnviado(undefined);
                    }}>
                    <p>Constancia enviada con éxito</p>
                </ModalAlert>
            }
        </>
    )
}