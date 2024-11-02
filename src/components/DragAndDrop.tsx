import { MedioRecursoMultimedia } from "@/utils/types";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import dragAndDropStyles from "@/app/styles/multimedia/dragAndDrop.module.scss";
import { FileData } from "@/interfaces/registro-servicio/FileData";
import classNames from "classnames";
import SEButton from "./skill-exchange/SEButton";
import SEParragraph from "./skill-exchange/text/SEParragraph";
import SEImage from "./skill-exchange/multimedia/SEImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport, faVideo } from "@fortawesome/free-solid-svg-icons";
import SEMediumTitle from "./skill-exchange/text/SEMediumTitle";

const acceptedVideosExtension = ["mp4", "mov", "wmv", "avi"];
const acceptedImagesExtension = ["jpg", "jpeg", "png", "bmp", "gif"];

type Props = {
  onSendFilesData: (filesData: FileData[]) => void;
  onError: () => void;
  required?: boolean;
  limit: number;
  acceptSelect: {
    [key: string]: string[];
  };
};

export default ({
  onSendFilesData,
  onError,
  limit,
  acceptSelect,
  required = true,
}: Props) => {
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
    <section className="container flex flex-col items-center">
      <div
        {...getRootProps({
          className: classNames(
            "px-8 py-16 rounded-lg border-dashed bg-hero-light bg-opacity-50 flex items-center mx-5 my-10 cursor-pointer"
          ),
        })}
      >
        <input {...getInputProps()} />
        <span className="mr-2 text-primary-600">
          <FontAwesomeIcon icon={faFileExport} />
        </span>
        <SEParragraph>
          Arrastre un archivo o haga click para elegir uno
        </SEParragraph>
      </div>
      {acceptedFiles.length > 0 && (
        <>
          <SEMediumTitle label="Archivo (s):" />
          <div className={`container flex flex-wrap items-center`}>
            {acceptedFiles.map((file) => (
              <div className="container flex-col items-center">
                <SEParragraph>
                  <strong>{file.name}</strong> - {file.size} bytes
                </SEParragraph>
                {getMedioFile(file) === "imagen" && (
                  <SEImage
                    className="w-[30%]"
                    src={URL.createObjectURL(file)}
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
              </div>
            ))}
            <SEButton onClick={sendFileData} label="Añadir" />
          </div>
        </>
      )}
      {fileRejections.length > 0 &&
        fileRejections.length <= limit &&
        fileRejections.map((f) => (
          <SEParragraph variant="error">
            Archivo {f.file.name} no admitido
          </SEParragraph>
        ))}
      {fileRejections.length > limit && (
        <SEParragraph variant="error">
          Debe escoger {limit} archivo (s) máximo
        </SEParragraph>
      )}
    </section>
  );
};
