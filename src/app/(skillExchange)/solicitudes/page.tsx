"use client";

import { actualizarMatchEstado, obtenerDetailsMatchsPrestamistaAndOptionalEstado } from "@/actions/match.actions";
import { obtenerServiciosByPrestamista } from "@/actions/servicio.actions";
import Usuario from "@/interfaces/Usuario";
import MatchServicioDetailsResponse from "@/interfaces/responsebody/matching/MatchServicioDetailsResponse";
import MatchServicioResponse from "@/interfaces/responsebody/matching/MatchServicioResponse";
import ServicioResponse from "@/interfaces/responsebody/servicio/ServicioResponse";
import { converDateTimeToStandarString } from "@/utils/auxiliares";
import { useEffect, useState } from "react";
import cardServicioStyles from "@/styles/cards/cardservicio.module.scss";
import UsuarioResponse from "@/interfaces/responsebody/usuario/UsuarioResponse";
import ModalVerPerfilUsuario from "@/components/solicitudes/ModalVerPerfilUsuario";
import SolicitudItem from "@/components/solicitudes/SolicitudItem";
import ModalAlert from "@/components/ModalAlert";
import ModalConfirm from "@/components/ModalConfirm";

type Params = {
    prestamista: Usuario
}

export default ({ prestamista }: Params) => {
    const [matchsServicioSelected, setMatchsServicioSelected] = useState<MatchServicioDetailsResponse[]>([]);
    const [serviciosFromPrestamista, setServiciosFromPrestamista] = useState<ServicioResponse[]>([]);
    const [servicio, setServicio] = useState<ServicioResponse>();
    const [clienteModalData, setClienteModalData] = useState<UsuarioResponse>();
    const [openModalCliente, setOpenModalCliente] = useState<boolean>(false);
    const [openModalSolicitudAprobada, setOpenModalSolicitudAprobada] = useState<boolean>(false);
    const [clienteAceptado, setClienteAceptado] = useState<UsuarioResponse>();
    const [matchForRechazo, setMatchForRechazo] = useState<MatchServicioDetailsResponse>();
    const [openModalSolicitudRechazada, setOpenModalSolicitudRechazada] = useState<boolean>(false);
    const [openModalConfirmSolicitudRechazo, setOpenModalConfirmSolicitudRechazo] = useState<boolean>(false);

    let matchsServicioDetails: MatchServicioDetailsResponse[] = [];

    useEffect(() => {
        loadInformation();
    }, []);

    const loadInformation = async () => {
        matchsServicioDetails = await obtenerDetailsMatchsPrestamistaAndOptionalEstado(prestamista.id, "solicitado");
        const servicios = await obtenerServiciosByPrestamista(prestamista.id);
        setMatchsServicioSelected(matchsServicioDetails);
        setServiciosFromPrestamista(servicios);
    }

    const openModalViewProfile = (cliente: UsuarioResponse) => {
        setClienteModalData(cliente);
        setOpenModalCliente(true);
    }

    const handleCloseModal = () => {
        setOpenModalCliente(false);
    }

    const handleSolicitudAprobada = (cliente: UsuarioResponse) => {
        setOpenModalSolicitudAprobada(true);
        setClienteAceptado(cliente);
    }

    const handleConfirmSolicitudForRechazo = (match: MatchServicioDetailsResponse) => {
        setOpenModalConfirmSolicitudRechazo(true);
        setMatchForRechazo(match);
    }

    const closeSolicitudAprobada = () => {
        setOpenModalSolicitudAprobada(false);
        setClienteAceptado(undefined);
    }

    const cancelarRechazoSolicitud = () => {
        setOpenModalConfirmSolicitudRechazo(false);
        setMatchForRechazo(undefined);
    }

    const rechazarSolicitud = async () => {
        setOpenModalConfirmSolicitudRechazo(false);

        // Rechazar solicitud
        const matchRezadado = await actualizarMatchEstado(matchForRechazo!.id, "rechazado");
        if (matchRezadado) {
            setMatchForRechazo(undefined);
            setOpenModalSolicitudRechazada(true);
        }
    }

    const closeSolicitudRechazada = () => {
        setOpenModalSolicitudRechazada(false);
    }

    return (
        <>
            <div className="principal">
                <div className="form">
                    <form>
                        <div className="form-control">
                            <label htmlFor="servicio">Servicio:</label>
                            <select name="servicio" value={servicio?.id}
                                onChange={(e) => setMatchsServicioSelected([...matchsServicioDetails].filter(m => m.servicio.id === e.target.id))}>
                                <option>--Seleccione--</option>
                                {serviciosFromPrestamista.map(s =>
                                    <option key={s.id} value={s.id}>{s.titulo}</option>
                                )}
                            </select>
                        </div>
                    </form>
                </div>
                <div>
                    {matchsServicioSelected.length > 0 ? matchsServicioSelected.map(m =>
                        <SolicitudItem key={m.id}
                            match={m}
                            sendModalState={openModalViewProfile}
                            sendSolicitudAprobada={handleSolicitudAprobada}
                            sendSolicitudForRechazo={handleConfirmSolicitudForRechazo} />
                    ) :
                        <>
                            <p>No hay solicitudes por ahora</p>
                            <a className="link-button btn-primary" href="/contratos">Ver mis contratos</a>
                        </>
                    }
                </div>
            </div>

            <ModalVerPerfilUsuario isOpen={openModalCliente && !!clienteAceptado} cliente={clienteModalData!} onClose={handleCloseModal} />

            <ModalAlert isOpen={(openModalSolicitudAprobada && !!clienteAceptado)}
                onClose={closeSolicitudAprobada}>
                <p>!Excelente! Tienes un trato con ${clienteAceptado?.nombres}</p>
                <p>Contáctate para que pueda realizar el pago.</p>
            </ModalAlert>

            <ModalConfirm isOpen={openModalConfirmSolicitudRechazo}
                onConfirm={rechazarSolicitud}
                onCancel={cancelarRechazoSolicitud}
                onClose={cancelarRechazoSolicitud}>
                <p>{`¿Está seguro de rechazar la solicitud de ${matchForRechazo?.cliente.nombres}?`}</p>
            </ModalConfirm>

            <ModalAlert isOpen={(openModalSolicitudRechazada)}
                onClose={closeSolicitudRechazada}>
                <p>Solicitud rechazada</p>
            </ModalAlert>
        </>
    )
}