import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const DragAndDrop = ({ }) => {
    const [archivo, setArchivo] = useState<File>();

    const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement & {
            files: FileList
        };

        setArchivo(target.files[0]);
    }

    return (
        <div className="drag-drop">
            <input type="file" onChange={handleOnChange} />
        </div>

    );
}