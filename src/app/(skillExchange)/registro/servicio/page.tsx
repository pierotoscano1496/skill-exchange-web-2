"use client";

import { obtenerSkillsFromUsuario, obtenerUsuarioLogged } from "@/actions/usuario.actions";
import { FileData } from "@/interfaces/registro-servicio/FileData";
import CreateServicioBody from "@/interfaces/requestbody/servicio/CreateServicioBody";
import UsuarioRegisteredResponse from "@/interfaces/responsebody/usuario/UsuarioRegisteredResponse";
import Image from "next/image";
import Close from "@/app/vectors/times-solid-svgrepo-com.svg";
import { useEffect, useState } from "react"
import ModalAddRecursoMultimedia from "@/components/registro-servicio/ModalAddRecursoMultimedia";
import ModalAlert from "@/components/ModalAlert";
import LinkData from "@/interfaces/registro-servicio/LinkData";
import { MedioRecursoMultimedia } from "@/utils/types";
import ModalAddModalidadPago from "@/components/registro-servicio/ModalAddModalidadPago";
import YapeData from "@/interfaces/registro-servicio/YapeData";
import { asignarModalidadesPagoToServicio, asignarRecursosMultimediaToServicio, registrarServicio, uploadMetadataModalidadPagoToService, uploadMultimediaFilesToServicio } from "@/actions/servicio.actions";
import AsignacionRecursoMultimediaToServicioRequest from "@/interfaces/requestbody/servicio/AsignacionRecursoMultimediaToServicioRequest";
import AsignacionModalidadPagoToServicioRequest from "@/interfaces/requestbody/servicio/AsignacionModalidadPagoToServicioRequest";
import ServicioRecursosMultimediaAsignadosResponse from "@/interfaces/responsebody/servicio/ServicioRecursosMultimediaAsignadosResponse";
import ServicioModalidadesPagoAsignadosResponse from "@/interfaces/responsebody/servicio/ServicioModalidadesPagoAsignadosResponse";
import ServicioRegisteredResponse from "@/interfaces/responsebody/servicio/ServicioRegisteredResponse";
import { useRouter } from "next/navigation";

type SkillOption = {
    id: string;
    descripcion: string;
};

export default () => {
    const [usuario, setUsuario] = useState<UsuarioRegisteredResponse>();
    const [titulo, setTitulo] = useState<string>("");
    const [precio, setPrecio] = useState<number>(0);
    const [descripcion, setDescripcion] = useState<string>("");
    const [skillsUsuario, setSkillsUsuario] = useState<SkillOption[]>([]);
    const [skill, setSkill] = useState<SkillOption>();

    // Archivos multimedia y plataformas
    const [archivosData, setArchivosData] = useState<FileData[]>([]);
    const [errorDragAndDrop, setErrorDragAndDrop] = useState<boolean>(false);
    const [linksData, setLinksData] = useState<LinkData[]>([]);
    const [errorPlataformas, setErrorPlataformas] = useState<boolean>(false);

    // Medios de pago
    const [medioPagoYape, setMedioPagoYape] = useState<YapeData>();
    const [medioPagoCCI, setMedioPagoCCI] = useState<string>("");

    // Opciones
    const [openModalMedioPago, setOpenModalMedioPago] = useState<boolean>(false);
    const [openModalRecursoMultimedia, setOpenModalRecursoMultimedia] = useState<boolean>(false);
    const [attempSubmit, setAttempSubmit] = useState<boolean>(false);
    const [openModalSuccess, setOpenModalSuccess] = useState<boolean>(false);
    const [openModalErrorSubmit, setOpenModalErrorSubmit] = useState<boolean>(false);
    const router = useRouter();

    const getIconFromMedioPlataforma = (medio: MedioRecursoMultimedia) => {
        let icon;
        switch (medio) {
            case "facebook":
                icon = <i className="fa-brands fa-facebook"></i>;
                break;
            case "instagram":
                icon = <i className="fa-brands fa-instagram"></i>;
                break;
            case "tiktok":
                icon = <i className="fa-brands fa-tiktok"></i>;
                break;
            case "youtube":
                icon = <i className="fa-brands fa-youtube"></i>;
                break;
            case "linkedin":
                icon = <i className="fa-brands fa-linkedin"></i>;
                break;
            default:
                icon = <i className="fa-solid fa-link"></i>;
                break;
        }
        return icon;
    }

    useEffect(() => {
        const setup = async () => {
            const usuarioLogged = await obtenerUsuarioLogged();
            setUsuario(usuarioLogged);

            const skillsFromUsuario = await obtenerSkillsFromUsuario(usuarioLogged.id);
            setSkillsUsuario(skillsFromUsuario.map(s => ({
                id: s.id,
                descripcion: s.descripcion
            } as SkillOption)));
        }

        setup();

        return (() => {
            setUsuario(undefined);

            setTitulo("");
            setPrecio(0);
            setDescripcion("");
            setSkillsUsuario([]);
            setSkill(undefined);

            // Archivos multimedia y plataformas
            setArchivosData([]);
            setErrorDragAndDrop(false);
            setLinksData([]);
            setErrorPlataformas(false);

            // Medios de pago
            setMedioPagoYape(undefined);
            setMedioPagoCCI("");

            // Opciones
            setOpenModalMedioPago(false);
            setOpenModalRecursoMultimedia(false);
            setAttempSubmit(false);
            setOpenModalSuccess(false);
            setOpenModalErrorSubmit(false);
        })
    }, []);

    const removeArchivoMultimedia = (index: number) => {
        if (archivosData.length > 0) {
            const filesDataCopy = [...archivosData];
            filesDataCopy.splice(index, 1);
            setArchivosData(filesDataCopy);
        }
    }

    const removeLinkData = (index: number) => {
        if (linksData.length > 0) {
            const linksDataCopy = [...linksData];
            linksDataCopy.splice(index, 1);
            setLinksData(linksDataCopy);
        }
    }

    const registrarServicioWithResourcesAndMediosPago = async () => {
        // Validar entradas
        const sericeInfoRequired = usuario && titulo && precio && descripcion && skill; // campos de datos del servicio
        const validateMultimediaResources = archivosData.length <= 3 && linksData.length <= 5; // recursos multimedia (totalmente opcionales, pero no superar las cantidades)
        const mediosPagoRequired = medioPagoYape || medioPagoCCI; // medios de pago (requerido al menos 1 de ellos)

        if (sericeInfoRequired && validateMultimediaResources && mediosPagoRequired) { // Listo para registrar
            let servicioRegistered: ServicioRegisteredResponse | null = null;
            let recursosMultimediaAsignados: ServicioRecursosMultimediaAsignadosResponse | null = null;
            let modalidadesPagoAsignados: ServicioModalidadesPagoAsignadosResponse | null = null;

            try {
                // 1er paso: Registrar servicio y obtener su ID:
                const servicio: CreateServicioBody = {
                    descripcion,
                    idSkill: skill!.id,
                    idUsuario: usuario!.id,
                    precio,
                    titulo
                };

                servicioRegistered = await registrarServicio(servicio);

                // 2do paso: Subir recursos multimedia:
                let recursosMultimedia: AsignacionRecursoMultimediaToServicioRequest[] = [];
                if (archivosData.length > 0) {
                    // Guardar archivos en BlobStorage y obtener sus URL
                    const formData = new FormData();
                    archivosData.forEach(fileData => {
                        formData.append("files", fileData.file);
                    });
                    const uploadedMultimediaFiles = await uploadMultimediaFilesToServicio(servicioRegistered.id, formData);

                    // Agregar URLs y medios de archivos subidos
                    uploadedMultimediaFiles.forEach(blobFile => {
                        recursosMultimedia.push({
                            medio: blobFile.medio,
                            url: blobFile.url
                        })
                    });
                }

                // Agregar links de medios plataformeros
                if (linksData.length > 0) {
                    linksData.forEach(linkData => {
                        recursosMultimedia.push({
                            medio: linkData.medio,
                            url: linkData.link
                        })
                    });
                }
                // Asignar recuros multimedia al servicio:
                if (recursosMultimedia.length > 0) {
                    recursosMultimediaAsignados = await asignarRecursosMultimediaToServicio(servicioRegistered.id, recursosMultimedia);
                }

                // 3er paso: Guardar medios de pago
                let modalidadesPago: AsignacionModalidadPagoToServicioRequest[] = [];

                // Yape
                if (medioPagoYape) {
                    let modalidadYape = {
                        tipo: "yape",
                        numeroCelular: medioPagoYape.numCelular,
                    } as AsignacionModalidadPagoToServicioRequest;

                    // Subir QR de Yape:
                    if (medioPagoYape.qrImage) {
                        const formQRYape = new FormData();
                        formQRYape.append("file", medioPagoYape.qrImage);
                        const urlQRUploaded = await uploadMetadataModalidadPagoToService(servicioRegistered.id, formQRYape);
                        modalidadYape.url = urlQRUploaded;
                    }

                    modalidadesPago.push(modalidadYape);
                }

                // CCI
                if (medioPagoCCI) {
                    modalidadesPago.push({
                        tipo: "tarjeta",
                        cuentaBancaria: medioPagoCCI
                    });
                }

                // Asignar los medios de pago al servicio
                if (modalidadesPago.length > 0) {
                    modalidadesPagoAsignados = await asignarModalidadesPagoToServicio(servicioRegistered.id, modalidadesPago);
                }

                // Validar que todo se haya registrado
                if (servicioRegistered && modalidadesPagoAsignados || recursosMultimediaAsignados) {
                    setOpenModalSuccess(true);
                }
            } catch {
                setOpenModalErrorSubmit(true);
            }
        } else {
            setAttempSubmit(true);
        }
    }

    const goToMisServicios = () => {
        setOpenModalSuccess(false);
        router.push("/servicio/own");
    }

    return (
        <>
            <div className="container column center">
                <h2>Publica tu servicio</h2>
                <div className="form main">
                    <div className="form-control">
                        <label htmlFor="titulo">Título:</label>
                        <input type="text"
                            name="titulo"
                            placeholder="Título breve y llamativo"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)} />
                    </div>
                    {(attempSubmit && !titulo) && <p className="text-danger">Indique el título</p>}
                    <div className="form-control">
                        <label htmlFor="precio">Precio (S/.):</label>
                        <input type="number"
                            name="precio"
                            placeholder="100.00"
                            value={precio}
                            onChange={(e) => setPrecio(parseFloat(e.target.value))}
                            step={0.01}
                            title="currency"
                            min={0}
                            pattern="^\d*\.\d{2}$" />
                    </div>
                    {(attempSubmit && !precio) && <p className="text-danger">Especifique el precio de su servicio</p>}
                    <div className="form-control">
                        <label htmlFor="descripcion">Descripción:</label>
                        <textarea value={descripcion}
                            name="descripcion"
                            onChange={(e) => setDescripcion(e.target.value)}
                            placeholder="Detalla en qué consiste tu servicio" />
                    </div>
                    {(attempSubmit && !descripcion) && <p className="text-danger">Añada una descripción</p>}
                    <div className="form-control">
                        <label htmlFor="skill">Habilidad a desempeñar:</label>
                        <select name="skill"
                            value={skill?.id}
                            onChange={(e) => setSkill(skillsUsuario.find((s) => s.id === e.target.value))}>
                            <option value="">--Seleccione--</option>
                            {skillsUsuario.map((s) => (
                                <option key={s.id} value={s.id}>{s.descripcion}</option>
                            ))}
                        </select>
                    </div>
                    {(attempSubmit && !skill) && <p className="text-danger">Indique la habilidad a desempeñar</p>}
                    <div className="btn-group">
                        <button className="btn-secondary" onClick={() => setOpenModalMedioPago(true)}>Añadir método de pago</button>
                        <button className="btn-secondary" onClick={() => setOpenModalRecursoMultimedia(true)}>Añadir contenido</button>
                    </div>
                </div>

                <h4 className="text-primary">Lista de archivos</h4>
                <div className="cards-content">
                    {archivosData.map((a, i) => (
                        <div className="item-card">
                            <span>{a.file.name.substring(0, 15)}...</span>
                            <button onClick={() => removeArchivoMultimedia(i)} className="btn-close">
                                <Image src={Close} alt="close" />
                            </button>
                        </div>
                    ))}
                </div>
                {archivosData.length === 3 && <p className="text-warning">Solo se admiten hasta 3 archivos</p>}

                <h4 className="text-primary">Enlaces a otras plataformas:</h4>
                <div className="container column width-50">
                    {linksData.map((linkData, index) => (
                        <div className="container">
                            <span>{linkData.link} {getIconFromMedioPlataforma(linkData.medio)}</span>
                            <button onClick={() => removeLinkData(index)} className="btn-close">
                                <Image src={Close} alt="close" />
                            </button>
                        </div>
                    ))}
                </div>
                {linksData.length === 5 && <p className="text-warning">Solo se admiten hasta 5 enlaces</p>}

                <h4 className="text-primary">Medios de pago:</h4>
                <div className="container column content-space-between width-50">
                    {medioPagoYape &&
                        < >
                            <h4 className="text-info">Yape</h4>
                            <p><strong>Número:</strong> {medioPagoYape.numCelular}</p>
                            {medioPagoYape.qrImage &&
                                <>
                                    <p><strong>QR:</strong></p>
                                    <img className="form-img-previsualizer" src={URL.createObjectURL(medioPagoYape.qrImage)} alt="Preview" />
                                </>}
                        </>}
                    {medioPagoCCI &&
                        <>
                            <h4 className="text-secondary">Código de cuenta interbancaria:</h4>
                            <p><strong>CCI:</strong> {medioPagoCCI}</p>
                        </>
                    }
                    {(attempSubmit && !medioPagoYape && !medioPagoCCI) && <p className="text-warning">Debe especificar al menos 1 medio de pago</p>}
                </div>
            </div>
            <div className="btn-group">
                <button className="btn-primary" onClick={registrarServicioWithResourcesAndMediosPago}>Registrar</button>
            </div>

            {openModalMedioPago &&
                <ModalAddModalidadPago
                    onSendDataFromYape={(yapeData) => {
                        setMedioPagoYape(yapeData);
                        setOpenModalMedioPago(false);
                    }}
                    onSendDataFromCCI={(cci) => {
                        setMedioPagoCCI(cci);
                        setOpenModalMedioPago(false);
                    }}
                    onClose={() => setOpenModalMedioPago(false)} />}

            {openModalRecursoMultimedia &&
                <ModalAddRecursoMultimedia
                    onSendFilesDataFromDragAndDrop={(filesData) => {
                        setArchivosData(filesData);
                        setOpenModalRecursoMultimedia(false);
                    }}
                    onErrorFromDragAndDrop={() => setErrorDragAndDrop(true)}
                    onSendLinkDataFromPlataformas={(linkData) => {
                        if (linksData.length < 5) {
                            setLinksData([...linksData, linkData]);
                        }
                        setOpenModalRecursoMultimedia(false);
                    }}
                    onErrorFromPlataformas={() => setErrorPlataformas(true)}
                    onClose={() => setOpenModalRecursoMultimedia(false)} />}
            {errorDragAndDrop &&
                <ModalAlert key={1} onClose={() => setErrorDragAndDrop(false)}>
                    <p className="text-warning">Revise que los archivos sean los correctos antes de adjuntarlos</p>
                </ModalAlert>}
            {errorPlataformas &&
                <ModalAlert key={2} onClose={() => setErrorPlataformas(false)}>
                    <p className="text-warning">Adjunte un link correcto antes de enviar</p>
                </ModalAlert>}
            {openModalSuccess &&
                <ModalAlert key={3} onClose={goToMisServicios}>
                    <p className="text-primary">Éxito al registrar tu servicio. Los clientes estarán esperando por ti</p>
                </ModalAlert>}
            {openModalErrorSubmit &&
                <ModalAlert key={4} onClose={() => setOpenModalErrorSubmit(false)}>
                    <p className="text-danger">Ocurrió un error durante el registro de tu servicio. Inténtalo más tarde</p>
                </ModalAlert>}
        </>
    )
};