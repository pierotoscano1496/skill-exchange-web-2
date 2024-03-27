import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const DragAndDrop = ({ sendFileHandler }: {
    sendFileHandler: (file: File) => void
}) => {
    /* const [archivo, setArchivo] = useState<File>();

    const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement & {
            files: FileList
        };

        setArchivo(target.files[0]);
    } */

    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps
    } = useDropzone({
        onDrop: (acceptedFiles) => {
            sendFileHandler(acceptedFiles[0]);
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
                {/* <em>(2 files are the maximum number of files you can drop here)</em> */}
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