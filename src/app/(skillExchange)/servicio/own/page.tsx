"use client";

import { obtenerServiciosByPrestamista } from "@/actions/servicio.actions";
import { obtenerUsuarioLogged } from "@/actions/usuario.actions";
import ServicioItemOwn from "@/components/busqueda-servicio/ServicioItemOwn";
import ServicioResponse from "@/interfaces/responsebody/servicio/ServicioResponse";
import UsuarioRegisteredResponse from "@/interfaces/responsebody/usuario/UsuarioRegisteredResponse";
import { useEffect, useState } from "react";

export default () => {
    const [servicios, setServicios] = useState<ServicioResponse[]>([]);
    const [usuarioLogged, setUsuarioLogged] = useState<UsuarioRegisteredResponse>();

    useEffect(() => {
        const setup = async () => {
            const userLogged = await obtenerUsuarioLogged();
            setUsuarioLogged(userLogged);
            try {
                setServicios(await obtenerServiciosByPrestamista(userLogged.id));
            } catch {
                setServicios([]);
            }
        }

        setup();

        return (() => {
            setServicios([]);
            setUsuarioLogged(undefined);
        });
    }, []);

    return (
        <>
            <div className="principal">
                <h2>Mis servicios</h2>
                {usuarioLogged?.tipo === "proveedor" ?
                    <>
                        {servicios.length > 0 ?
                            <>
                                <div className="form-row">
                                    <div className="form-control">
                                        <label htmlFor="servicio">Servicio</label>
                                        <select name="servicio" id="">
                                            <option value="">--Seleccione--</option>
                                            {servicios.map(s => (
                                                <option key={s.id} value={s.id}>{s.titulo}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-control">
                                        <button className="btn-primary">Buscar</button>
                                    </div>
                                </div>
                                <div className="container">
                                    {servicios.map(s => (
                                        <ServicioItemOwn key={s.id} servicio={s} />
                                    ))}
                                </div>
                            </>
                            :
                            <>
                                <p className="text-black">Aún no tiene servicios publicados.</p>
                                <a className="link-button btn-primary" href="/registro/servicio">Empezar</a>
                            </>
                        }
                    </>

                    :
                    <>
                        <p className="text-danger">Debe ingresar como proveedor para publicar un servicio</p>
                        <a className="link-button btn-primary" href="/servicio">Volver</a>
                    </>
                }
            </div>
        </>
    )
}