"use client";

import { useState } from "react";
import ModalImagePreview from "../ModalImagePreview";
import ModalAlert from "../ModalAlert";
import styles from "@/app/styles/servicios/creditcard.module.scss";
import ModalInfo from "../ModalInfo";

type Props = {
  number: string;
};

export default ({ number }: Props) => {
  const [openCreditCardInfo, setOpenCreditCardInfo] = useState<boolean>(false);

  return (
    <>
      <img
        className="brand credit-card option"
        onClick={() => setOpenCreditCardInfo(true)}
      />
      {openCreditCardInfo && (
        <ModalInfo
          title="Cuenta interbancaria"
          flexProps={{
            flexDirection: "column",
          }}
          onClose={() => setOpenCreditCardInfo(false)}
        >
          <img className={styles.creditCard} />
          <p>
            <span className="bold">CCI: </span> {number}
          </p>
        </ModalInfo>
      )}
    </>
  );
};
