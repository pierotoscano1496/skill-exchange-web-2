"use client";

import { useEffect, useState } from "react";
import ModalImagePreview from "../ModalImagePreview";
import SEImage from "../skill-exchange/multimedia/SEImage";
import SEParragraph from "../skill-exchange/text/SEParragraph";

type Props = {
  source: string;
  numCelular: string;
};

export default ({ source, numCelular }: Props) => {
  const [openYapeQR, setOpenYapeQR] = useState<boolean>(false);

  return (
    <>
      <SEParragraph onClick={() => setOpenYapeQR(true)}>Ver QR</SEParragraph>
      {openYapeQR && (
        <ModalImagePreview
          source={source}
          title="Yape"
          descripcion={`Número de celular: ${numCelular}`}
          onClose={() => setOpenYapeQR(false)}
        />
      )}
    </>
  );
};
