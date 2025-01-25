"use client";

import classNames from "classnames";
import SEModal from "./skill-exchange/messaging/SEModal";
import SEImage from "./skill-exchange/multimedia/SEImage";
import SEParragraph from "./skill-exchange/text/SEParragraph";
import { ExtendedSizeType } from "@/enums/Sizes";

type Props = {
  onOpen?: () => void;
  onClose: () => void;
  source: string;
  descripcion?: string;
  title?: string;
  width?: ExtendedSizeType;
  className?: string;
  fullModalClassName?: string;
};

export default ({
  source,
  onOpen,
  onClose,
  descripcion,
  title,
  className,
  fullModalClassName,
}: Props) => {
  return (
    <SEModal
      onOpen={onOpen}
      onClose={onClose}
      showFootOptions={false}
      title={title}
      size="small"
      fullModalClassName={fullModalClassName}
      className={classNames("flex flex-col items-center", className)}
    >
      <SEImage src={source} size="small" />
      <SEParragraph align="center">{descripcion}</SEParragraph>
    </SEModal>
  );
};
