import { MedioRecursoMultimedia } from "@/utils/types";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FileData } from "@/interfaces/registro-servicio/FileData";
import classNames from "classnames";
import SEButton from "./skill-exchange/SEButton";
import SEParragraph from "./skill-exchange/text/SEParragraph";
import SEImage from "./skill-exchange/multimedia/SEImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport, faVideo } from "@fortawesome/free-solid-svg-icons";
import SETitle from "./skill-exchange/text/SETitle";

const acceptedVideosExtension = ["mp4", "mov", "wmv", "avi"];
const acceptedImagesExtension = ["jpg", "jpeg", "png", "bmp", "gif"];

type DragAndDropProps = {
  onSendFilesData: (filesData: FileData[]) => void;
  onError: () => void;
  required?: boolean;
  limit: number;
  acceptSelect: {
    [key: string]: string[];
  };
};

const DragAndDrop = ({
  onSendFilesData,
  onError,
  limit,
  acceptSelect,
  required = true,
}: DragAndDropProps) => {
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
    <section className="flex flex-col items-center">
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
          <SETitle size="large">Archivo (s):</SETitle>
          <div className={`flex flex-wrap justify-center mb-6`}>
            {acceptedFiles.map((file, index) => (
              <div key={index} className="flex flex-col items-center">
                <SEParragraph>
                  <strong>{file.name}</strong> - {file.size} bytes
                </SEParragraph>
                {getMedioFile(file) === "imagen" && (
                  <SEImage
                    className="w-[30%] mb-6"
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                  />
                )}
                {getMedioFile(file) === "video" && (
                  <div className="flex items-center justify-center">
                    <span className="mr-2 text-primary-600">
                      <FontAwesomeIcon icon={faVideo} />
                    </span>
                  </div>
                )}
                {file.size > maxSizeFiles && (
                  <SEParragraph variant="error">
                    El archivo no debe pesar más de 15 MB
                  </SEParragraph>
                )}
              </div>
            ))}
          </div>
          <SEButton onClick={sendFileData} label="Añadir" />
        </>
      )}
      {fileRejections.length > 0 &&
        fileRejections.length <= limit &&
        fileRejections.map((f, index) => (
          <SEParragraph key={index} variant="error">
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

DragAndDrop.displayName = "DragAndDrop";

export default DragAndDrop;
