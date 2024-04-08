"use client";

import ModalidadPagoForm from "@/components/registro-servicio/ModalidadPagoForm";
import RecursoMultimediaForm from "@/components/registro-servicio/RecursoMultimediaForm";
import AsignacionMedioPago from "@/interfaces/registro-servicio/AsignacionMedioPago";
import AsignacionRecursoMultimedia from "@/interfaces/registro-servicio/AsignacionRecursoMultimedia";
import CreateServicioBody from "@/interfaces/requestbody/servicio/CreateServicioBody";
import ModalidadPagoBody from "@/interfaces/requestbody/servicio/ModalidadPagoBody";
import ServicioRegisteredResponse from "@/interfaces/responsebody/servicio/ServicioRegisteredResponse";
import UsuarioRegisteredResponse from "@/interfaces/responsebody/usuario/UsuarioRegisteredResponse";
import { backendInstance } from "@/utils/constants.backend";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react"

type SkillOption = {
    id: string;
    descripcion: string;
};

const RegistroSevicio = () => {
    const [usuario, setUsuario] = useState<UsuarioRegisteredResponse>();
    const [titulo, setTitulo] = useState<string>("");
    const [precio, setPrecio] = useState<number>(0);
    const [descripcion, setDescripcion] = useState<string>("");
    const [skillsUsuario, setSkillsUsuario] = useState<SkillOption[]>([]);
    const [skill, setSkill] = useState<SkillOption>();
    const [listRecursosMultimedia, setListRecursosMultimedia] = useState<AsignacionRecursoMultimedia[]>([]);
    const [listMediosPago, setListMediosPago] = useState<AsignacionMedioPago[]>([]);
    const [openModalMedioPago, setOpenModalMedioPago] = useState<boolean>(false);
    const [openModalRecursoMultimedia, setOpenModalRecursoMultimedia] = useState<boolean>(false);

    useEffect(() => {
        //Obtener skills registrados del usuario
        obtenerSkillsFromUsuario();
        obtenerDatosUsuario();
    }, []);

    const obtenerDatosUsuario = async () => {
        const response = await backendInstance.get("usuario");
        setUsuario(response.data as UsuarioRegisteredResponse);
    }

    const obtenerSkillsFromUsuario = async () => {
        const response = await backendInstance.get(`usuario/skills`);
        setSkillsUsuario(response.data as SkillOption[]);
    };

    const addRecursoMultimedia = (recursoMultimedia: AsignacionRecursoMultimedia) => {
        let listRecursosMultimediaCopy = [...listRecursosMultimedia];
        listRecursosMultimediaCopy.push(recursoMultimedia);
        setListRecursosMultimedia(listRecursosMultimediaCopy);
    };

    const removeRecursoMultimedia = (index: number) => {
        let listRecursosMultimediaCopy = [...listRecursosMultimedia];
        //const index = listRecursosMultimediaCopy.findIndex(r => r.id === id);
        listRecursosMultimediaCopy.splice(index, 1);
        setListRecursosMultimedia(listRecursosMultimediaCopy);
    };

    const goToEditRecursoMultimedia = (recursoMultimedia: AsignacionRecursoMultimedia) => {

    };

    const RowMedioPago = ({ medioPago }: { medioPago: AsignacionMedioPago }) => {
        switch (medioPago.tipo) {
            case "yape":
                return <>{medioPago.celular}</>;
            case "tarjeta":
                return <>{medioPago.cci}</>;

        }
    };

    const addModalidadPago = (medioPago: AsignacionMedioPago) => {
        let listMediosPagoCopy = [...listMediosPago];
        listMediosPagoCopy.push(medioPago);
        setListMediosPago(listMediosPagoCopy);
    }

    const removeMedioPago = (index: number) => {
        let listMediosPagoCopy = [...listMediosPago];
        listMediosPagoCopy.splice(index, 1);
        setListMediosPago(listMediosPagoCopy);
    };

    const goToEditMedioPago = (medioPago: AsignacionMedioPago) => {

    }

    const registrarServicio = async () => {
        try {

            const servicio: CreateServicioBody = {
                descripcion,
                idSkill: skill!.id,
                idUsuario: usuario!.id,
                precio,
                titulo,
                modalidadesPago: listMediosPago.map(m => ({
                    cuentaBancaria: m.cci,
                    numeroCelular: m.celular,
                    tipo: m.tipo
                })),
                recursosMultimedia: listRecursosMultimedia.map(r => ({
                    medio: r.medio,
                    url: r.url
                }))
            };

            const response = await backendInstance.post("servicio", servicio);
            const servicioRegistrado: ServicioRegisteredResponse = response.data as ServicioRegisteredResponse;
            if (servicioRegistrado) {
                alert("Éxito a registrar el servicio");
            }
        } catch (error) {
            const err = error as AxiosError;
            alert(err.message);
        }
    }

    return (
        <>
            <div>
                <h2>Publica tu servicio</h2>
                <div>
                    <label>Título:
                        <input type="text"
                            placeholder="Título breve y llamativo"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>Precio (S/.):
                        <input type="number"
                            placeholder="100.00"
                            value={precio}
                            onChange={(e) => setPrecio(parseFloat(e.target.value))}
                            step={0.01}
                            title="currency"
                            min={0}
                            pattern="^\d*\.\d{2}$" />
                    </label>
                </div>
                <div>
                    <label>Descripción:
                        <textarea value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            placeholder="Detalla en qué consiste tu servicio" />
                    </label>
                </div>
                <div>
                    <button onClick={() => setOpenModalMedioPago(true)}>Añadir método de pago</button>
                    <button onClick={() => setOpenModalRecursoMultimedia(true)}>Añadir contenido</button>
                </div>
                <div>
                    <label>Habilidad a desempeñar:
                        <select value={skill?.id} onChange={(e) => setSkill(skillsUsuario.find((s) => s.id === e.target.value))}>
                            <option>--Seleccione--</option>
                            {
                                skillsUsuario.map((s) => (
                                    <option value={s.id}>{s.descripcion}</option>
                                ))
                            }
                        </select>
                    </label>
                </div>
                <div>
                    <h3>Recursos multimedia:</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Medio</th>
                                <th>Link o nombre</th>
                                <th>Opción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listRecursosMultimedia.map((r, i) => (
                                    <tr>
                                        <td>{r.medio}</td>
                                        <td>{r.url}</td>
                                        <td>
                                            <button onClick={() => goToEditRecursoMultimedia(r)}>Editar</button> |
                                            <button onClick={() => removeRecursoMultimedia(i)}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div>
                    <h3>Medios de pago:</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Medio</th>
                                <th>Celular o CCI</th>
                                <th>Opción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listMediosPago.map((m, i) => (
                                    <tr>
                                        <td>{m.tipo}</td>
                                        <td><RowMedioPago key={i} medioPago={m} /></td>
                                        <td>
                                            <button onClick={() => goToEditMedioPago(m)}>Editar</button> |
                                            <button onClick={() => removeMedioPago(i)}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <button onClick={registrarServicio}>Registrar</button>
            <ModalidadPagoForm show={openModalMedioPago} sendModalidadPagoToParent={(modalidadPago) => addModalidadPago(modalidadPago)} />
            <RecursoMultimediaForm show={openModalRecursoMultimedia} sendRecursoMultimediaToParent={(recursoMultimedia) => addRecursoMultimedia(recursoMultimedia)} />
        </>
    )
};

export default RegistroSevicio;