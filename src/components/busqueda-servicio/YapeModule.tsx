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

  const onOpenModal = async () => {
    setUrlYapeQr(await obtenerImagenMetodoPago(idServicio, "yape"));
  };

  return (
    <>
      <SEParragraph onClick={() => setOpenYapeQR(true)}>Ver QR</SEParragraph>
      {openYapeQR && (
        <ModalImagePreview
          onOpen={onOpenModal}
          source={urlYapeQr}
          title="Yape"
          descripcion={`Número de celular: ${numCelular}`}
          onClose={() => setOpenYapeQR(false)}
        />
      )}
    </>
  );
};
