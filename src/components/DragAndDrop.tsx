import { MedioRecursoMultimedia } from "@/utils/types";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import dragAndDropStyles from "@/app/styles/multimedia/dragAndDrop.module.scss";
import { FileData } from "@/interfaces/registro-servicio/FileData";

const acceptedVideosExtension = ["mp4", "mov", "wmv", "avi"];
const acceptedImagesExtension = ["jpg", "jpeg", "png", "bmp", "gif"];

type Props = {
    onSendFilesData: (filesData: FileData[]) => void;
    onError: () => void;
    required?: boolean;
    limit: number;
    acceptSelect: {
        [key: string]: string[];
    }
}

export default ({ onSendFilesData, onError, limit, acceptSelect, required = true }: Props) => {
    const [newFilesData, setNewFilesData] = useState<FileData[]>([]);
    const maxSizeFiles = 15 * 1024 * 1024;

    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps
    } = useDropzone({
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length > 0 && acceptedFiles.length <= maxSizeFiles) {
                setNewFilesData(acceptedFiles.map(f => ({
                    file: f,
                    medio: getMedioFile(f)
                }) as FileData));
            }
        },
        accept: acceptSelect,
        maxFiles: limit
    });

    useEffect(() => {
        return (() => {
            setNewFilesData([])
            acceptedFiles.length = 0;
            acceptedFiles.splice(0, acceptedFiles.length);
        })
    }, []);

    const getMedioFile = (file: File): MedioRecursoMultimedia | undefined => {
        const tipoArchivo = file.name.split(".").slice(-1)[0];
        if (acceptedVideosExtension.includes(tipoArchivo.toLowerCase())) {
            return "video";
        } else if (acceptedImagesExtension.includes(tipoArchivo.toLowerCase())) {
            return "imagen";
        }
    }

    const sendFileData = () => {
        if (((required && newFilesData.length > 0) || (!required && newFilesData.length >= 0))
            && fileRejections.length === 0) {

            // Validar que todos pesen menos que el tamaño máximo permitido
            const sizeAreOK = newFilesData
                .map(fileData => fileData.file.size <= maxSizeFiles)
                .reduce((prevComparison, comparison) => prevComparison && comparison);

            if (sizeAreOK) {
                onSendFilesData(newFilesData);
            }
        } else {
            onError();
        }
    }

    return (
        <section className="container column content-center center">
            <div {...getRootProps({ className: `${dragAndDropStyles.dropzone} ${dragAndDropStyles["background-primary-transparent-50"]} container column content-center center` })}>
                <input {...getInputProps()} />
                <i className={`fa-solid fa-file-export`}></i>
                <p>Arrastre un archivo o haga click para elegir uno</p>
            </div>
            <div className={`container column center ${dragAndDropStyles.preview}`}>
                {acceptedFiles.length > 0 && <h4>Archivo (s):</h4>}
                <div className="container column center">
                    {acceptedFiles.map(file => (
                        <>
                            <p><strong>{file.name}</strong> - {file.size} bytes</p>
                            {getMedioFile(file) === "imagen" &&
                                <img className={dragAndDropStyles["image-preview"]} src={URL.createObjectURL(file)} alt="Preview" />}
                            {getMedioFile(file) === "video" &&
                                <i className="fa-solid fa-video"></i>}
                            {file.size > maxSizeFiles && <p className="text-danger">El archivo no debe pesar más de 15 MB</p>}
                        </>
                    ))}
                </div>
                {fileRejections.length > 0 && fileRejections.length <= limit &&
                    fileRejections.map(f => (
                        <p className="text-danger">Archivo {f.file.name} no admitido</p>
                    ))}
                {fileRejections.length > limit &&
                    <p className="text-danger">Debe escoger {limit} archivo (s) máximo</p>
                }
                <button  className="btn-primary" onClick={sendFileData} disabled={acceptedFiles.length === 0}>Añadir</button>
            </div>
        </section >
    );
}