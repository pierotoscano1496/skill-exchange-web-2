import { MedioRecursoMultimedia } from "@/utils/types";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const DragAndDrop = ({ sendFileHandler, sendMedio }: {
    sendFileHandler: (file: File) => void,
    sendMedio: (medio: MedioRecursoMultimedia) => void
}) => {
    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps
    } = useDropzone({
        onDrop: (acceptedFiles) => {
            const archivo: File = acceptedFiles[0];
            sendFileHandler(archivo);

            const tipoArchivo = archivo.name.split(".").slice(-1)[0];
            if (tipoArchivo.toLowerCase() in ["mp4", "mov", "wmv", "avi"]) {
                sendMedio("video");
            } else if (tipoArchivo.toLowerCase() in ["jpg", "jpeg", "png", "bmp", "gif"]) {
                sendMedio("imagen")
            }
        },
        maxFiles: 1
    });

    const acceptedFileItems = acceptedFiles.map(file => (
        <li key={file.name}>
            {file.name} - {file.size} bytes
        </li>
    ));

    const fileRejectionItems = fileRejections.map(({ file, errors }) => {
        return (
            <li key={file.name}>
                {file.name} - {file.size} bytes
                <ul>
                    {errors.map(e => <li key={e.code}>{e.message}</li>)}
                </ul>

            </li>
        )
    });

    return (
        <section className="container">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Arrastre un archivo o haga click para elegir uno</p>
            </div>
            <aside>
                <h4>Archivos:</h4>
                <ul>{acceptedFileItems}</ul>
                <h4>Rejected files</h4>
                <ul>{fileRejectionItems}</ul>
            </aside>
        </section>
    );
};

export default DragAndDrop;