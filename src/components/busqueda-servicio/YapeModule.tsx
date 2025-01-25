"use client";

import { useEffect, useState } from "react";
import ModalImagePreview from "../ModalImagePreview";
import SEImage from "../skill-exchange/multimedia/SEImage";
import SEParragraph from "../skill-exchange/text/SEParragraph";
import { obtenerImagenMetodoPago } from "@/actions/servicio.actions";
import yape from "@/assets/images/yape.png";
import SEContainer from "../skill-exchange/containers/SEContainer";
import classNames from "classnames";

type Props = {
  idServicio: string;
  source: string;
  numCelular: string;
};

export default ({ idServicio, source, numCelular }: Props) => {
  const [openYapeQR, setOpenYapeQR] = useState<boolean>(false);
  const [urlYapeQr, setUrlYapeQr] = useState<string>("");

  const openModal = async () => {
    console.log("openYet");

    const qr = await obtenerImagenMetodoPago(idServicio, "YAPE");
    if (qr) {
      setUrlYapeQr(qr);
      setOpenYapeQR(true);
    }
  };

  const clickCont = () => {
    console.log("click");
  };

  return (
    <SEContainer className="shadow-soft hover:shadow-deep bg-violet-200 rounded-xl p-8 cursor-pointer h-full">
      <SEImage src={yape.src} className="w-28" onClick={openModal} />
      {openYapeQR && urlYapeQr && (
        <ModalImagePreview
          source={urlYapeQr}
          title="Yape"
          descripcion={`N°: ${numCelular}`}
          onClose={() => {
            setOpenYapeQR(false);
            setUrlYapeQr("");
          }}
          fullModalClassName={classNames("bg-violet-200")}
        />
      )}
    </SEContainer>
  );
};
