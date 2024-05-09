"use client";

import { actualizarMatchEstado, obtenerDetailsMatchsPrestamistaEnServicio } from "@/actions/match.actions";
import { obtenerUsuarioLogged } from "@/actions/usuario.actions";
import ModalAlert from "@/components/ModalAlert";
import ModalConfirm from "@/components/ModalConfirm";
import MatchContratoItem from "@/components/contratos/MatchContratoItem";
import ModalVerPerfilUsuario from "@/components/solicitudes/ModalVerPerfilUsuario";
import MatchServicioDetailsResponse from "@/interfaces/responsebody/matching/MatchServicioDetailsResponse";
import UsuarioRegisteredResponse from "@/interfaces/responsebody/usuario/UsuarioRegisteredResponse";
import UsuarioResponse from "@/interfaces/responsebody/usuario/UsuarioResponse";
import { TipoMatchServicioEstado } from "@/utils/types";
import { useEffect, useState } from "react";

interface ServicioOption {
    id: string;
    titulo: string;
}

interface EstadoMatchOption {
    estado: TipoMatchServicioEstado;
    nombre: string;
}

export default ({ }) => {
    const [matchsServicios, setMatchsServicios] = useState<MatchServicioDetailsResponse[]>([]);
    const [serviciosClienteOptionsForSearch, setServiciosClienteOptionsForSearch] = useState<ServicioOption[]>([]);
    const [clientePerfil, setClientePerfil] = useState<UsuarioResponse>();
    const [matchForConfirmarConstancia, setMatchForConfirmarConstancia] = useState<MatchServicioDetailsResponse>();
    const [matchForFinalizar, setMatchForFinalizar] = useState<MatchServicioDetailsResponse>();
    const [servicioOptionSelected, setServicioOptionSelected] = useState<ServicioOption>();
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

    let matchsServicioDetails: MatchServicioDetailsResponse[] = [];
    let prestamista: UsuarioRegisteredResponse | null = null;

    useEffect(() => {
        loadInformation();
    }, []);

    const loadInformation = async () => {
        prestamista = await obtenerUsuarioLogged();
        matchsServicioDetails = await obtenerDetailsMatchsPrestamistaEnServicio(prestamista.id);
        //const servicios = await obtenerServiciosByPrestamista(cliente.id);
        setMatchsServicios(matchsServicioDetails);

        // Mapear los servicios de los matchs del proveedor
        const serviciosClienteOptions = matchsServicioDetails.map(m => ({
            id: m.servicio.id,
            titulo: m.servicio.titulo
        } as ServicioOption))
            .filter((option, index, options) => (
                index === options.findIndex(o => o.id === option.id)
            ));

        setServiciosClienteOptionsForSearch(serviciosClienteOptions);
    }

    const openModalConfirmarConstancia = (match: MatchServicioDetailsResponse) => {
        setMatchForConfirmarConstancia(match);
    }

    const openModalConfirmarFinalizacion = (match: MatchServicioDetailsResponse) => {
        setMatchForFinalizar(match);
    }

    const confirmarContancia = async () => {
        if (matchForConfirmarConstancia) {
            const matchConfirmado = await actualizarMatchEstado(matchForConfirmarConstancia.id, "ejecucion");
            if (matchConfirmado) {
                setMatchForConfirmarConstancia({ ...matchForConfirmarConstancia, estado: matchConfirmado.estado })
            }
        }
    }

    const confirmarFinalizacion = async () => {
        if (matchForFinalizar) {
            const matchFinalizado = await actualizarMatchEstado(matchForFinalizar.id, "finalizado");
            if (matchFinalizado) {
                setMatchForFinalizar({ ...matchForFinalizar, estado: matchFinalizado.estado });
            }
        }
    }

    const matchsServiciosFiltered = matchsServicios.filter(match =>
        match.servicio.id === servicioOptionSelected?.id &&
        match.estado === estadoSelected?.estado
    );

    return (
        <>
            <div className="principal">
                <div className="form container">
                    <div className="form-control">
                        <label htmlFor="servicio">Servicio:</label>
                        <select name="servicio"
                            onChange={(e) => setServicioOptionSelected(serviciosClienteOptionsForSearch.find(s => s.id === e.target.value))}>
                            <option>--Seleccione--</option>
                            {serviciosClienteOptionsForSearch.map(s =>
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
                        <MatchContratoItem
                            key={m.id}
                            onOpenModalConfirmarConstancia={openModalConfirmarConstancia}
                            onOpenModalConfirmarFinalizacion={openModalConfirmarFinalizacion}
                            onOpenViewProfile={() => setClientePerfil(m.cliente)}
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

            {/**
             * Confirmación para cambiar el estado de un match a "ejecucion"
             */}
            {matchForConfirmarConstancia &&
                <ModalConfirm key={matchForConfirmarConstancia.id}
                    onCancel={() => setMatchForConfirmarConstancia(undefined)}
                    onClose={() => setMatchForConfirmarConstancia(undefined)}
                    onConfirm={confirmarContancia}>
                    <p>Compruebe que haya recibido la constancia de pago de parte del cliente para comenzar a brindar el servicio.</p>
                    <p>Una vez comprobado, haga click en "Aceptar".</p>
                </ModalConfirm>
            }
            {matchForConfirmarConstancia?.estado === "ejecucion" &&
                <ModalAlert key={matchForConfirmarConstancia.id}
                    onClose={() => setMatchForConfirmarConstancia(undefined)}>
                    <p>!Felicidades! Tienes un trato con {matchForConfirmarConstancia.cliente.nombres}. Te estará esperando</p>
                </ModalAlert>
            }

            {/**
             * Finalizar match
             */}
            {matchForFinalizar &&
                <ModalConfirm
                    onCancel={() => setMatchForFinalizar(undefined)}
                    onClose={() => setMatchForFinalizar(undefined)}
                    onConfirm={confirmarFinalizacion}>
                    <p>¿Está seguro de finalizar el servicio?</p>
                    <p>Esta acción no se puede revertir.</p>
                </ModalConfirm>
            }
            {matchForFinalizar?.estado === "finalizado" &&
                <ModalAlert key={matchForFinalizar.id}
                    onClose={() => setMatchForFinalizar(undefined)}>
                    <p>Muchas gracias por colaborar con {matchForFinalizar.cliente.nombres}</p>
                    <p>Esperemos que se contacte contigo nuevamente en otra oportunidad.</p>
                </ModalAlert>}

            {/**
             * Ver perfil de usuario
             */}
            {clientePerfil &&
                <ModalVerPerfilUsuario cliente={clientePerfil} onClose={() => setClientePerfil(undefined)} />
            }
        </>
    )
}