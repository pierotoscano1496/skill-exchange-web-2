"use client";

import { useEffect, useState } from "react";
import ModalImagePreview from "../ModalImagePreview";
import SEImage from "../skill-exchange/multimedia/SEImage";
import SEParragraph from "../skill-exchange/text/SEParragraph";
import { obtenerImagenMetodoPago } from "@/actions/servicio.actions";

type Props = {
  idServicio: string;
  source: string;
  numCelular: string;
};

export default ({ idServicio, source, numCelular }: Props) => {
  const [openYapeQR, setOpenYapeQR] = useState<boolean>(false);
  const [urlYapeQr, setUrlYapeQr] = useState<string>("");

  const openModal = async () => {
    const qr = await obtenerImagenMetodoPago(idServicio, "YAPE");
    if (qr) {
      setUrlYapeQr(qr);
      setOpenYapeQR(true);
    }
  };

  return (
    <>
      <SEParragraph onClick={openModal}>Ver QR</SEParragraph>
      {openYapeQR && (
        <ModalImagePreview
          source={urlYapeQr}
          title="Yape"
          descripcion={`N°: ${numCelular}`}
          onClose={() => setOpenYapeQR(false)}
        />
      )}
    </>
  );
};
