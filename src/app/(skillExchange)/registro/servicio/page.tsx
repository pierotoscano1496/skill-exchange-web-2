"use client";

import {
  obtenerSkillsFromUsuario,
  obtenerUsuarioLogged,
} from "@/actions/usuario.actions";
import { FileData } from "@/interfaces/registro-servicio/FileData";
import CreateServicioBody from "@/interfaces/requestbody/servicio/CreateServicioBody";
import UsuarioRegisteredResponse from "@/interfaces/responsebody/usuario/UsuarioRegisteredResponse";
import React, { useEffect, useState } from "react";
import ModalAddRecursoMultimedia from "@/components/registro-servicio/ModalAddRecursoMultimedia";
import LinkData from "@/interfaces/registro-servicio/LinkData";
import { MedioRecursoMultimedia } from "@/utils/types";
import ModalAddModalidadPago from "@/components/registro-servicio/ModalAddModalidadPago";
import YapeData from "@/interfaces/registro-servicio/YapeData";
import {
  asignarModalidadesPagoToServicio,
  asignarRecursosMultimediaToServicio,
  registrarServicio,
  uploadMetadataModalidadPagoToService,
  uploadMultimediaFilesToServicio,
} from "@/actions/servicio.actions";
import AsignacionRecursoMultimediaToServicioRequest from "@/interfaces/requestbody/servicio/AsignacionRecursoMultimediaToServicioRequest";
import AsignacionModalidadPagoToServicioRequest from "@/interfaces/requestbody/servicio/AsignacionModalidadPagoToServicioRequest";
import ServicioRecursosMultimediaAsignadosResponse from "@/interfaces/responsebody/servicio/ServicioRecursosMultimediaAsignadosResponse";
import ServicioModalidadesPagoAsignadosResponse from "@/interfaces/responsebody/servicio/ServicioModalidadesPagoAsignadosResponse";
import ServicioRegisteredResponse from "@/interfaces/responsebody/servicio/ServicioRegisteredResponse";
import { useRouter } from "next/navigation";
import SEMediumTitle from "@/components/skill-exchange/text/SEMediumTitle";
import SEForm from "@/components/skill-exchange/form/SEForm";
import SEInput from "@/components/skill-exchange/form/SEInput";
import SEParragraph from "@/components/skill-exchange/text/SEParragraph";
import SETextarea from "@/components/skill-exchange/form/SETextarea";
import SESelect from "@/components/skill-exchange/form/SESelect";
import SEButton from "@/components/skill-exchange/SEButton";
import SEContainer from "@/components/skill-exchange/containers/SEContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faImage,
  faLink,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTiktok,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import SEImage from "@/components/skill-exchange/multimedia/SEImage";
import SEModal from "@/components/skill-exchange/messaging/SEModal";
import { SEFormControl } from "@/components/skill-exchange/form/SEForm";
import SECard from "@/components/skill-exchange/SECard";
import classNames from "classnames";
import { getFilesSizeMb } from "@/utils/auxiliares";

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
  const [openModalRecursoMultimedia, setOpenModalRecursoMultimedia] =
    useState<boolean>(false);
  const [attempSubmit, setAttempSubmit] = useState<boolean>(false);
  const [openModalSuccess, setOpenModalSuccess] = useState<boolean>(false);
  const [openModalErrorSubmit, setOpenModalErrorSubmit] =
    useState<boolean>(false);
  const router = useRouter();

  interface IconMedioProps {
    medio: MedioRecursoMultimedia;
    className?: string;
  }

  const IconMedio: React.FC<IconMedioProps> = ({ medio, className }) => {
    let icon;
    switch (medio) {
      case "facebook":
        icon = (
          <FontAwesomeIcon
            icon={faFacebook}
            className={classNames(className)}
          />
        );
        break;
      case "instagram":
        icon = (
          <FontAwesomeIcon
            icon={faInstagram}
            className={classNames(className)}
          />
        );
        break;
      case "tiktok":
        icon = (
          <FontAwesomeIcon icon={faTiktok} className={classNames(className)} />
        );
        break;
      case "youtube":
        icon = (
          <FontAwesomeIcon icon={faYoutube} className={classNames(className)} />
        );
        break;
      case "linkedin":
        icon = (
          <FontAwesomeIcon
            icon={faLinkedin}
            className={classNames(className)}
          />
        );
        break;
      case "video":
        icon = (
          <FontAwesomeIcon icon={faVideo} className={classNames(className)} />
        );
        break;
      case "imagen":
        icon = (
          <FontAwesomeIcon icon={faImage} className={classNames(className)} />
        );
        break;
      case "web-externa":
        icon = (
          <FontAwesomeIcon icon={faLink} className={classNames(className)} />
        );
        break;
      case "twitter":
        icon = (
          <FontAwesomeIcon icon={faTwitter} className={classNames(className)} />
        );
        break;
      default:
        icon = (
          <FontAwesomeIcon icon={faLink} className={classNames(className)} />
        );
        break;
    }
    return <>{icon}</>;
  };

  useEffect(() => {
    const setup = async () => {
      const usuarioLogged = await obtenerUsuarioLogged();
      setUsuario(usuarioLogged);

      const skillsFromUsuario = await obtenerSkillsFromUsuario(
        usuarioLogged.id
      );
      setSkillsUsuario(
        skillsFromUsuario.map(
          (s) =>
            ({
              id: s.id,
              descripcion: s.descripcion,
            }) as SkillOption
        )
      );
    };

    setup();

    return () => {
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
    };
  }, []);

  const removeArchivoMultimedia = (index: number) => {
    if (archivosData.length > 0) {
      const filesDataCopy = [...archivosData];
      filesDataCopy.splice(index, 1);
      setArchivosData(filesDataCopy);
    }
  };

  const removeLinkData = (index: number) => {
    if (linksData.length > 0) {
      const linksDataCopy = [...linksData];
      linksDataCopy.splice(index, 1);
      setLinksData(linksDataCopy);
    }
  };

  const registrarServicioWithResourcesAndMediosPago = async () => {
    // Validar entradas
    const sericeInfoRequired =
      usuario && titulo && precio && descripcion && skill; // campos de datos del servicio
    const validateMultimediaResources =
      archivosData.length <= 3 && linksData.length <= 5; // recursos multimedia (totalmente opcionales, pero no superar las cantidades)
    const mediosPagoRequired = medioPagoYape || medioPagoCCI; // medios de pago (requerido al menos 1 de ellos)

    if (
      sericeInfoRequired &&
      validateMultimediaResources &&
      mediosPagoRequired
    ) {
      // Listo para registrar
      let servicioRegistered: ServicioRegisteredResponse | null = null;
      let recursosMultimediaAsignados: ServicioRecursosMultimediaAsignadosResponse | null =
        null;
      let modalidadesPagoAsignados: ServicioModalidadesPagoAsignadosResponse | null =
        null;

      try {
        // 1er paso: Registrar servicio y obtener su ID:
        const servicio: CreateServicioBody = {
          descripcion,
          idSkill: skill!.id,
          idUsuario: usuario!.id,
          precio,
          titulo,
        };

        servicioRegistered = await registrarServicio(servicio);

        // 2do paso: Subir recursos multimedia:
        let recursosMultimedia: AsignacionRecursoMultimediaToServicioRequest[] =
          [];
        if (archivosData.length > 0) {
          // Guardar archivos en BlobStorage y obtener sus URL
          const formData = new FormData();
          archivosData.forEach((fileData) => {
            formData.append("files", fileData.file);
          });
          const uploadedMultimediaFiles = await uploadMultimediaFilesToServicio(
            servicioRegistered.id,
            formData
          );

          // Agregar URLs y medios de archivos subidos
          uploadedMultimediaFiles.forEach((blobFile) => {
            recursosMultimedia.push({
              medio: blobFile.medio,
              url: blobFile.url,
            });
          });
        }

        // Agregar links de medios plataformeros
        if (linksData.length > 0) {
          linksData.forEach((linkData) => {
            recursosMultimedia.push({
              medio: linkData.medio,
              url: linkData.link,
            });
          });
        }
        // Asignar recuros multimedia al servicio:
        if (recursosMultimedia.length > 0) {
          recursosMultimediaAsignados =
            await asignarRecursosMultimediaToServicio(
              servicioRegistered.id,
              recursosMultimedia
            );
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
            const urlQRUploaded = await uploadMetadataModalidadPagoToService(
              servicioRegistered.id,
              formQRYape
            );
            modalidadYape.url = urlQRUploaded;
          }

          modalidadesPago.push(modalidadYape);
        }

        // CCI
        if (medioPagoCCI) {
          modalidadesPago.push({
            tipo: "tarjeta",
            cuentaBancaria: medioPagoCCI,
          });
        }

        // Asignar los medios de pago al servicio
        if (modalidadesPago.length > 0) {
          modalidadesPagoAsignados = await asignarModalidadesPagoToServicio(
            servicioRegistered.id,
            modalidadesPago
          );
        }

        // Validar que todo se haya registrado
        if (
          (servicioRegistered && modalidadesPagoAsignados) ||
          recursosMultimediaAsignados
        ) {
          setOpenModalSuccess(true);
        }
      } catch {
        setOpenModalErrorSubmit(true);
      }
    } else {
      setAttempSubmit(true);
    }
  };

  const goToMisServicios = () => {
    setOpenModalSuccess(false);
    router.push("/servicio/own");
  };

  return (
    <>
      <div className="container column center">
        <SEMediumTitle label="Publica tu servicio" />
        <SEForm>
          <SEFormControl>
            <SEInput
              label="Título"
              name="titulo"
              placeholder="Título breve y llamativo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
            {attempSubmit && !titulo && (
              <SEParragraph variant="error">Indique el título</SEParragraph>
            )}
          </SEFormControl>
          <SEFormControl>
            <SEInput
              label="Precio (S/.)"
              name="precio"
              placeholder="100.00"
              type="number"
              value={precio}
              onChange={(e) => setPrecio(parseFloat(e.target.value))}
              numericProps={{
                min: 0,
                step: 0.01,
              }}
              extraInformationProps={{ title: "currency" }}
              formatTextProps={{ pattern: "^d*.d{2}$" }}
            />
            {attempSubmit && !precio && (
              <SEParragraph variant="error">
                Especifique el precio de su servicio
              </SEParragraph>
            )}
          </SEFormControl>
          <SEFormControl>
            <SETextarea
              label="Descripción"
              value={descripcion}
              name="descripcion"
              placeholder="Detalla en qué consiste tu servicio"
              onChange={(e) => setDescripcion(e.target.value)}
            />
            {attempSubmit && !descripcion && (
              <SEParragraph variant="error">Añada una descripción</SEParragraph>
            )}
          </SEFormControl>
          <SEFormControl>
            <SESelect
              options={skillsUsuario.map((s) => ({
                label: s.descripcion,
                value: s.id,
              }))}
              value={skill?.id}
              onChange={(e) =>
                setSkill(skillsUsuario.find((s) => s.id === e.target.value))
              }
            />
            {attempSubmit && !skill && (
              <SEParragraph variant="error">
                Indique la habilidad a desempeñar
              </SEParragraph>
            )}
          </SEFormControl>
          <SEContainer className="justify-between">
            <SEButton
              onClick={() => setOpenModalMedioPago(true)}
              label="Añadir método de pago"
              mode="outline"
              variant="primary"
            />
            <SEButton
              onClick={() => setOpenModalRecursoMultimedia(true)}
              label="Añadir contenido"
              mode="outline"
              variant="primary"
            />
          </SEContainer>
        </SEForm>

        {archivosData.length > 0 && (
          <>
            <SEMediumTitle className="mt-6" label="Lista de archivos" />
            <SEContainer>
              {archivosData.map((a, i) => (
                <SECard>
                  <IconMedio medio={a.medio} className="mr-auto" />
                  <span className="">
                    {a.file.name.length <= 10
                      ? a.file.name
                      : `${a.file.name.substring(0, 10)}...`}
                  </span>
                  <SEButton
                    shape="circle"
                    variant="error"
                    className="ml-auto"
                    icon={<FontAwesomeIcon icon={faClose} />}
                    onClick={() => removeArchivoMultimedia(i)}
                  />
                </SECard>
              ))}
            </SEContainer>
            {getFilesSizeMb(archivosData) > 10 && (
              <SEParragraph variant="error">
                Los archivos no pueden superar los 10 MB
              </SEParragraph>
            )}
          </>
        )}

        {linksData.length > 0 && (
          <>
            <SEMediumTitle label="Enlaces a otras plataformas" />
            <SEContainer>
              {linksData.map((linkData, index) => (
                <SECard>
                  <IconMedio medio={linkData.medio} className="mr-auto" />
                  {linkData.link.length <= 10
                    ? linkData.link
                    : `${linkData.link.substring(0, 10)}...`}
                  <SEButton
                    shape="circle"
                    variant="error"
                    className="ml-auto"
                    icon={<FontAwesomeIcon icon={faClose} />}
                    onClick={() => removeLinkData(index)}
                  />
                </SECard>
              ))}
            </SEContainer>
            {linksData.length === 5 && (
              <SEParragraph variant="error">
                Solo se admiten hasta 5 enlaces
              </SEParragraph>
            )}
          </>
        )}

        <SEMediumTitle label="Medios de pago" />
        <SEContainer>
          {medioPagoYape && (
            <SEContainer>
              <SEMediumTitle label="Yape" />
              <SEParragraph>{`Número: ${medioPagoYape.numCelular}`}</SEParragraph>
              {medioPagoYape.qrImage && (
                <>
                  <SEParragraph>QR:</SEParragraph>
                  <SEImage
                    src={URL.createObjectURL(medioPagoYape.qrImage)}
                    alt="Preview"
                  />
                </>
              )}
            </SEContainer>
          )}
          {medioPagoCCI && (
            <SEContainer>
              <SEMediumTitle label="Código de cuenta interbancaria" />
              <SEParragraph>{`CCI: ${medioPagoCCI}`}</SEParragraph>
            </SEContainer>
          )}
          {attempSubmit && !medioPagoYape && !medioPagoCCI && (
            <SEParragraph variant="error">
              Debe especificar al menos 1 medio de pago
            </SEParragraph>
          )}
        </SEContainer>
      </div>
      <div>
        <SEButton
          label="Registrar"
          onClick={registrarServicioWithResourcesAndMediosPago}
        />
      </div>

      {openModalMedioPago && (
        <ModalAddModalidadPago
          onSendDataFromYape={(yapeData) => {
            setMedioPagoYape(yapeData);
            setOpenModalMedioPago(false);
          }}
          onSendDataFromCCI={(cci) => {
            setMedioPagoCCI(cci);
            setOpenModalMedioPago(false);
          }}
          onClose={() => setOpenModalMedioPago(false)}
        />
      )}

      {openModalRecursoMultimedia && (
        <ModalAddRecursoMultimedia
          onSendFilesDataFromDragAndDrop={(filesData) => {
            if (getFilesSizeMb(filesData) <= 10) {
              setArchivosData(filesData);
            }
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
          onClose={() => setOpenModalRecursoMultimedia(false)}
        />
      )}
      {errorDragAndDrop && (
        <SEModal key={1} onClose={() => setErrorDragAndDrop(false)}>
          <SEParragraph variant="error">
            Revise que los archivos sean los correctos antes de adjuntarlos
          </SEParragraph>
        </SEModal>
      )}
      {errorPlataformas && (
        <SEModal key={2} onClose={() => setErrorPlataformas(false)}>
          <SEParragraph variant="error">
            Adjunte un link correcto antes de enviar
          </SEParragraph>
        </SEModal>
      )}
      {openModalSuccess && (
        <SEModal key={3} onClose={goToMisServicios}>
          <SEParragraph>
            Éxito al registrar tu servicio. Los clientes estarán esperando por
            ti
          </SEParragraph>
        </SEModal>
      )}
      {openModalErrorSubmit && (
        <SEModal key={4} onClose={() => setOpenModalErrorSubmit(false)}>
          <SEParragraph variant="error">
            Ocurrió un error durante el registro de tu servicio. Inténtalo más
            tarde
          </SEParragraph>
        </SEModal>
      )}
    </>
  );
};
