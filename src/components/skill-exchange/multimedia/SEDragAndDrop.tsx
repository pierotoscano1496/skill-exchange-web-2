import { MedioRecursoMultimedia } from "@/utils/types";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FileData } from "@/interfaces/registro-servicio/FileData";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport, faVideo } from "@fortawesome/free-solid-svg-icons";
import SEParragraph from "../text/SEParragraph";
import SETitle from "../text/SETitle";
import SEImage from "./SEImage";
import SEButton from "../SEButton";
import { fileSizeToMb, getFilesSizeMb } from "@/utils/auxiliares";
import SEContainer from "../containers/SEContainer";

const acceptedVideosExtension = ["mp4", "mov", "wmv", "avi"];
const acceptedImagesExtension = ["jpg", "jpeg", "png", "bmp", "gif"];

type DragAndDropProps = {
  onSendFilesData: (filesData: FileData[]) => void;
  onError: () => void;
  required?: boolean;
  limit?: number;
  acceptSelect: {
    [key: string]: string[];
  };
  sizeLimit?: number;
  showSize?: boolean;
};

export default ({
  onSendFilesData,
  onError,
  limit,
  acceptSelect,
  required = true,
  sizeLimit = 5,
  showSize = false,
}: DragAndDropProps) => {
  const [newFilesData, setNewFilesData] = useState<FileData[]>([]);
  const maxSizeFiles = sizeLimit;

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      onDrop: (acceptedFiles) => {
        const acceptedFilesData = acceptedFiles.map((f) => f as File);
        if (
          acceptedFiles.length > 0 &&
          getFilesSizeMb(acceptedFilesData) <= maxSizeFiles &&
          (!limit || acceptedFiles.length <= limit)(
            !limit || acceptedFiles.length <= limit
          )
        ) {
          setNewFilesData(
            acceptedFiles.map(
              (f) => ({ file: f, medio: getMedioFile(f) }) as FileData
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
      const sizeAreOK = getFilesSizeMb(
        newFilesData.map((fileData) => fileData.file)
      );

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
          <SETitle size="large" label="Archivo (s)" />
          <div className={`flex flex-wrap justify-center mb-6`}>
            {acceptedFiles.map((file, index) => (
              <SEContainer key={index} direction="column">
                <SEParragraph>
                  <strong>{file.name}</strong> -{" "}
                  {Math.round(fileSizeToMb(file.size) * 100) / 100} MB
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
              </SEContainer>
            ))}
          </div>
          {showSize && (
            <SEContainer>
              <SEParragraph>
                <strong>Tamaño total: </strong>:{" "}
                {Math.round(getFilesSizeMb(acceptedFiles) * 100) / 100} MB
              </SEParragraph>
            </SEContainer>
          )}
          <SEButton
            onClick={sendFileData}
            label="Añadir"
            disabled={
              getFilesSizeMb(acceptedFiles) > maxSizeFiles ||
              fileRejections.length > 0 ||
              acceptedFiles.length > limit!
            }
          />
        </>
      )}
      {getFilesSizeMb(acceptedFiles) > maxSizeFiles && (
        <SEParragraph variant="error">
          Los archivos no deben superar los {sizeLimit} MB
        </SEParragraph>
      )}
      {fileRejections.length > 0 &&
        fileRejections.map((f) => (
          <SEParragraph variant="error">
            Archivo {f.file.name} no admitido
          </SEParragraph>
        ))}
      {limit &&
        (fileRejections.length > limit || acceptedFiles.length > limit) && (
          <SEParragraph variant="error">
            Debe escoger {limit} archivo (s) máximo
          </SEParragraph>
        )}
    </section>
  );
};
