"use client";

import modalStyles from "@/app/styles/modal.module.scss";
import SEModal from "./skill-exchange/messaging/SEModal";
import SEImage from "./skill-exchange/multimedia/SEImage";
import SEParragraph from "./skill-exchange/text/SEParragraph";

type Props = {
  onOpen?: () => void;
  onClose: () => void;
  source: string;
  descripcion?: string;
  title?: string;
};

export default ({ source, onOpen, onClose, descripcion, title }: Props) => {
  return (
    <SEModal
      onOpen={onOpen}
      onClose={onClose}
      showFootOptions={false}
      title={title}
    >
      <SEImage src={source} size="medium" />
      <SEParragraph>{descripcion}</SEParragraph>
    </SEModal>
  );
};
