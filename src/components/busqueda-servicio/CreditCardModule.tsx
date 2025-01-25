"use client";

import { useState } from "react";
import ModalImagePreview from "../ModalImagePreview";
import ModalAlert from "../ModalAlert";
import styles from "@/app/styles/servicios/creditcard.module.scss";
import ModalInfo from "../ModalInfo";
import SEImage from "../skill-exchange/multimedia/SEImage";
import creditCard from "@/assets/images/credit-card.png";
import SEContainer from "../skill-exchange/containers/SEContainer";

type Props = {
  number: string;
};

export default ({ number }: Props) => {
  const [openCreditCardInfo, setOpenCreditCardInfo] = useState<boolean>(false);

  return (
    <SEContainer className="shadow-soft hover:shadow-deep bg-blue-200 rounded-xl p-8 cursor-pointer h-full">
      <SEImage
        src={creditCard.src}
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
    </SEContainer>
  );
};
