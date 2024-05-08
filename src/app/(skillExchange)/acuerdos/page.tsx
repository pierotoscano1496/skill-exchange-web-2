"use client";

import { obtenerDetailsMatchsByCliente, obtenerDetailsMatchsPrestamistaAndOptionalEstado } from "@/actions/match.actions";
import { obtenerServiciosByPrestamista } from "@/actions/servicio.actions";
import { obtenerUsuarioLogged } from "@/actions/usuario.actions";
import ModalEnviarConstancia from "@/components/acuerdos/ModalEnviarConstancia";
import SolicitudAcuerdoItem from "@/components/acuerdos/SolicitudAcuerdoItem";
import ModalVerPerfilUsuario from "@/components/solicitudes/ModalVerPerfilUsuario";
import SolicitudItem from "@/components/solicitudes/SolicitudItem";
import Usuario from "@/interfaces/Usuario";
import MatchServicioProveedorDetailsResponse from "@/interfaces/responsebody/matching/MatchServicioProveedorDetailsResponse";
import UsuarioResponse from "@/interfaces/responsebody/usuario/UsuarioResponse";
import { useEffect, useState } from "react";

type Params = {
    cliente: Usuario;
}

interface ServicioOption {
    id: string;
    titulo: string;
}

export default ({ }) => {
    const [matchsServicioSelected, setMatchsServicioSelected] = useState<MatchServicioProveedorDetailsResponse[]>([]);
    const [serviciosClienteOptions, setServiciosClienteOptions] = useState<ServicioOption[]>([]);
    const [proveedorPerfil, setProveedorPerfil] = useState<UsuarioResponse>();
    const [matchForEnviarConstancia, setMatchForEnviarConstancia] = useState<MatchServicioProveedorDetailsResponse>();

    let matchsServicioDetails: MatchServicioProveedorDetailsResponse[] = [];
    let cliente = null;

    useEffect(() => {
        loadInformation();
    }, []);

    const loadInformation = async () => {
        cliente = await obtenerUsuarioLogged();
        matchsServicioDetails = await obtenerDetailsMatchsByCliente(cliente.id);
        //const servicios = await obtenerServiciosByPrestamista(cliente.id);
        setMatchsServicioSelected(matchsServicioDetails);

        // Mapear los servicios de los matchs del cliente (incluye rechazados)
        const setServiciosCliente = new Set(matchsServicioDetails.map(m => {
            return {
                id: m.servicio.id,
                titulo: m.servicio.titulo
            } as ServicioOption
        }).map(s => JSON.stringify(s)));

        setServiciosClienteOptions(Array.from(setServiciosCliente).map(s => JSON.parse(s) as ServicioOption));
    }

    const openViewProfile = (proveedor: UsuarioResponse) => {
        setProveedorPerfil(proveedor);
    }

    const openModalEnviarConstancia = (match: MatchServicioProveedorDetailsResponse) => {
        setMatchForEnviarConstancia(match);
    }

    const handleCloseModalVerPerfil = () => {
        setProveedorPerfil(undefined);
    }

    const handleCloseModalEnviarConstancia = () => {
        setMatchForEnviarConstancia(undefined);
    }


    return (
        <>
            <div className="principal">
                <div className="form">
                    <div className="form-control">
                        <label htmlFor="servicio">Servicio:</label>
                        <select name="servicio"
                            onChange={(e) => setMatchsServicioSelected([...matchsServicioDetails].filter(m => m.servicio.id === e.target.id))}>
                            <option>--Seleccione--</option>
                            {serviciosClienteOptions.map(s =>
                                <option key={s.id} value={s.id}>{s.titulo}</option>
                            )}
                        </select>
                    </div>
                </div>
                <div>
                    {matchsServicioSelected.length > 0 ? matchsServicioSelected.map(m =>
                        <SolicitudAcuerdoItem
                            key={m.id}
                            onOpenModalEnviarConstancia={openModalEnviarConstancia}
                            onOpenViewProfile={openViewProfile}
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

            <ModalVerPerfilUsuario isOpen={!!proveedorPerfil} cliente={proveedorPerfil!} onClose={handleCloseModalVerPerfil} />
            <ModalEnviarConstancia isOpen={!!matchForEnviarConstancia} onClose={handleCloseModalEnviarConstancia} proveedor={matchForEnviarConstancia!.proveedor} />
        </>
    )
}