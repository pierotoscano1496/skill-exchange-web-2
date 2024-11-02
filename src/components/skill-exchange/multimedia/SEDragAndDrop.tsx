import { FileData } from "@/interfaces/registro-servicio/FileData";
import { MedioRecursoMultimedia } from "@/utils/types";
import { faFileExport, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import SEParragraph from "../text/SEParragraph";
import SEContainer from "../containers/SEContainer";
import SEMediumTitle from "../text/SEMediumTitle";
import SELabel from "../text/SELabel";
import SEImage from "./SEImage";
import SEButton from "../SEButton";

const acceptedVideosExtension = ["mp4", "mov", "wmv", "avi"];
const acceptedImagesExtension = ["jpg", "jpeg", "png", "bmp", "gif"];

interface DragAndDropProps {
  label?: string;
  onSendFilesData: (filesData: FileData[]) => void;
  onError: () => void;
  required?: boolean;
  limit: number;
  acceptSelect: {
    [key: string]: string[];
  };
}

const SEDragAndDrop: React.FC<DragAndDropProps> = ({
  label,
  onSendFilesData,
  onError,
  limit,
  acceptSelect,
  required = true,
}) => {
  const [newFilesData, setNewFilesData] = useState<FileData[]>([]);
  const maxSizeFiles = 15 * 1024 * 1024;

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      onDrop: (acceptedFiles) => {
        if (acceptedFiles.length > 0 && acceptedFiles.length <= maxSizeFiles) {
          setNewFilesData(
            acceptedFiles.map(
              (f) =>
                ({
                  file: f,
                  medio: getMedioFile(f),
                }) as FileData
            )
          );
        }
      },
      accept: acceptSelect,
      maxFiles: limit,
    });

  useEffect(() => {
    return () => {
      setNewFilesData([]);
      acceptedFiles.length = 0;
      acceptedFiles.splice(0, acceptedFiles.length);
    };
  }, []);

  const getMedioFile = (file: File): MedioRecursoMultimedia | undefined => {
    const tipoArchivo = file.name.split(".").slice(-1)[0];
    if (acceptedVideosExtension.includes(tipoArchivo.toLowerCase())) {
      return "video";
    } else if (acceptedImagesExtension.includes(tipoArchivo.toLowerCase())) {
      return "imagen";
    }
  };

  const sendFileData = () => {
    if (
      ((required && newFilesData.length > 0) ||
        (!required && newFilesData.length >= 0)) &&
      fileRejections.length === 0
    ) {
      // Validar que todos pesen menos que el tamaño máximo permitido
      const sizeAreOK = newFilesData
        .map((fileData) => fileData.file.size <= maxSizeFiles)
        .reduce((prevComparison, comparison) => prevComparison && comparison);

      if (sizeAreOK) {
        onSendFilesData(newFilesData);
      }
    } else {
      onError();
    }
  };

  return (
    <section className="flex flex-col content-center">
      <div
        {...getRootProps({
          className: classNames(
            "px-8 py-16 rounded-lg border-dashed border-primary-500"
          ),
        })}
      >
        <input {...getInputProps()} />
        <FontAwesomeIcon icon={faFileExport} />
        <SEParragraph>
          Arrastre un archivo o haga click para elegir uno
        </SEParragraph>
      </div>
      <SEContainer className={classNames("flex flex-col")}>
        {acceptedFiles.length > 0 && <SEMediumTitle label="Archivo (s):" />}
        {acceptedFiles.map((file) => (
          <>
            <SEParragraph>
              <strong>{file.name}</strong> - {file.size} bytes
            </SEParragraph>
            {getMedioFile(file) === "imagen" && (
              <SEImage
                src={URL.createObjectURL(file)}
                className="w-2/6"
                alt="Preview"
              />
            )}
            {getMedioFile(file) === "video" && (
              <FontAwesomeIcon icon={faVideo} />
            )}
            {file.size > maxSizeFiles && (
              <SEParragraph variant="error">
                El archivo no debe pesar más de 15 MB
              </SEParragraph>
            )}
          </>
        ))}
      </SEContainer>
      <SEContainer className={"container flex flex-col items-center"}>
        {acceptedFiles.length > 0 && <SEMediumTitle label="Archivo (s):" />}
        {fileRejections.length > 0 &&
          fileRejections.length <= limit &&
          fileRejections.map((f) => (
            <SEParragraph variant="error">
              Archivo {f.file.name} no admitido
            </SEParragraph>
          ))}
        {fileRejections.length > limit && (
          <SEParragraph variant="error">
            No puede subir más de {limit} archivo{limit > 1 && "s"}
          </SEParragraph>
        )}
        <SEButton
          onClick={sendFileData}
          disabled={acceptedFiles.length === 0}
          label="Añadir"
        />
      </SEContainer>
    </section>
  );
};

export default SEDragAndDrop;
