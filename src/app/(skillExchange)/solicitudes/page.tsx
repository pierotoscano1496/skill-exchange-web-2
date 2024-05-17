"use client";

import { actualizarMatchEstado, obtenerDetailsMatchsPrestamistaAndOptionalEstado } from "@/actions/match.actions";
import { obtenerServiciosByPrestamista } from "@/actions/servicio.actions";
import MatchServicioDetailsResponse from "@/interfaces/responsebody/matching/MatchServicioDetailsResponse";
import ServicioResponse from "@/interfaces/responsebody/servicio/ServicioResponse";
import { useEffect, useState } from "react";
import UsuarioResponse from "@/interfaces/responsebody/usuario/UsuarioResponse";
import ModalVerPerfilUsuario from "@/components/solicitudes/ModalVerPerfilUsuario";
import SolicitudItem from "@/components/solicitudes/SolicitudItem";
import ModalAlert from "@/components/ModalAlert";
import ModalConfirm from "@/components/ModalConfirm";
import { obtenerUsuarioLogged } from "@/actions/usuario.actions";

interface ServicioOption {
    id: string;
    titulo: string;
}

export default () => {
    const [matchsServicioSelected, setMatchsServicioSelected] = useState<MatchServicioDetailsResponse[]>([]);
    const [serviciosOption, setServiciosOption] = useState<ServicioOption[]>([]);
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
        const userLogged = await obtenerUsuarioLogged();
        try {
            const matchs = await obtenerDetailsMatchsPrestamistaAndOptionalEstado(userLogged.id, "solicitado");
            setMatchsServicioSelected(matchs);
            setServiciosOption(matchs.map(m => ({
                titulo: m.servicio.titulo,
                id: m.servicio.id
            })));
        } finally {
            console.log("Info loaded");
        }
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

    const closeSolicitudAprobada = () => {
        setOpenModalSolicitudAprobada(false);
        setClienteAceptado(undefined);
    }

    const handleConfirmSolicitudForRechazo = (match: MatchServicioDetailsResponse) => {
        // Abrir modal de confirmación de rechazar solicitud
        setOpenModalConfirmSolicitudRechazo(true);
        setMatchForRechazo(match);
    }

    const cancelarRechazoSolicitud = () => {
        setOpenModalConfirmSolicitudRechazo(false);
        setMatchForRechazo(undefined);
    }

    const rechazarSolicitud = async () => {
        // Rechazar solicitud
        const matchRechazado = await actualizarMatchEstado(matchForRechazo!.id, {
            estado: "rechazado"
        });
        if (matchRechazado) {
            setOpenModalConfirmSolicitudRechazo(false); // Cerrar modal de confirmar rechazo
            setMatchForRechazo(undefined);

            // Abrir modal de solicitud rechazada correctamente
            setOpenModalSolicitudRechazada(true);
        }
    }

    const closeSolicitudRechazada = () => {
        setOpenModalSolicitudRechazada(false);
    }

    return (
        <>
            <div className="principal">
                <div className="form-row">
                    <div className="form-control">
                        <label htmlFor="servicio">Servicio:</label>
                        <select name="servicio" value={servicio?.id}
                            onChange={(e) => setMatchsServicioSelected([...matchsServicioDetails]
                                .filter(m => m.servicio.id === e.target.id))}>
                            <option>--Seleccione--</option>
                            {serviciosOption.map(s =>
                                <option key={s.id} value={s.id}>{s.titulo}</option>
                            )}
                        </select>
                    </div>
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

            {(openModalCliente && !!clienteModalData) &&
                <ModalVerPerfilUsuario cliente={clienteModalData!} onClose={handleCloseModal} />
            }
            {(openModalSolicitudAprobada && !!clienteAceptado) &&
                <ModalAlert
                    onClose={closeSolicitudAprobada}>
                    <p>!Excelente! Tienes un trato con {clienteAceptado?.nombres}</p>
                    <p>Contáctate para que pueda realizar el pago.</p>
                </ModalAlert>
            }
            {(openModalConfirmSolicitudRechazo && !!matchForRechazo) &&
                <ModalConfirm
                    onConfirm={rechazarSolicitud}
                    onCancel={cancelarRechazoSolicitud}
                    onClose={cancelarRechazoSolicitud}>
                    <p>{`¿Está seguro de rechazar la solicitud de ${matchForRechazo?.cliente.nombres}?`}</p>
                </ModalConfirm>
            }
            {openModalSolicitudRechazada &&
                <ModalAlert
                    onClose={closeSolicitudRechazada}>
                    <p>Solicitud rechazada</p>
                </ModalAlert>
            }
        </>
    )
}