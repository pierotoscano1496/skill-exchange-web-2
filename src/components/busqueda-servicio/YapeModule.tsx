"use client";

import { useEffect, useState } from "react";
import ModalImagePreview from "../ModalImagePreview";

type Props = {
    source: string;
    numCelular: string;
}

export default ({ source, numCelular }: Props) => {
    const [openYapeQR, setOpenYapeQR] = useState<boolean>(false);

    return (<>
        <img className="brand yape" onClick={() => setOpenYapeQR(true)} />
        {openYapeQR &&
            <ModalImagePreview source={source} decripcion={`Número de celular: ${numCelular}`} onClose={() => setOpenYapeQR(false)} />
        }
    </>)
}