"use client";

import modalStyles from "@/app/styles/modal.module.scss";
import SEModal from "./skill-exchange/messaging/SEModal";
import SEImage from "./skill-exchange/multimedia/SEImage";
import SEParragraph from "./skill-exchange/text/SEParragraph";
import { ExtendedSizeType } from "@/enums/Sizes";

type Align = "start" | "end" | "center" | "stretch";

type Props = {
  onOpen?: () => void;
  onClose: () => void;
  source: string;
  descripcion?: string;
  title?: string;
  width?: ExtendedSizeType;
};

export default ({ source, onOpen, onClose, descripcion, title }: Props) => {
  return (
    <SEModal
      onOpen={onOpen}
      onClose={onClose}
      showFootOptions={false}
      title={title}
      size="small"
      className="flex flex-col items-center"
    >
      <SEImage src={source} size="small" />
      <SEParragraph align="center">{descripcion}</SEParragraph>
    </SEModal>
  );
};
