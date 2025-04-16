import bubbleStyles from "@/app/styles/chats/bubbleMessage.module.scss";
import { memo, useEffect, useState } from "react";

// Icons / Image
import PDFIcon from "@/app/vectors/pdf.svg";
import WordIcon from "@/app/vectors/word.svg";
import PowerPointIcon from "@/app/vectors/powerpoint.svg";
import ExcelIcon from "@/app/vectors/excel.svg";
import Image from "next/image";
import { getFormatFile } from "@/utils/auxiliares";

type Props = {
  myself: boolean;
  text: string;
  resourceUrl?: string;
};

const BubbleMessage = memo(({ myself, text, resourceUrl }: Props) => {
  const [source, setSource] = useState<any>();

  useEffect(() => {
    if (resourceUrl) {
      const formatFile = getFormatFile(resourceUrl);
      if (formatFile) {
        switch (formatFile) {
          case "jpeg":
          case "jpg":
          case "png":
            setSource(resourceUrl);
            break;
          case "doc":
          case "docx":
            setSource(WordIcon);
            break;
          case "pdf":
            setSource(PDFIcon);
            break;
          case "ppt":
          case "pptx":
            setSource(PowerPointIcon);
            break;
          case "xls":
          case "xlsx":
            setSource(ExcelIcon);
            break;
        }
      }
    }
  }, []);

  return (
    <div
      className={`${bubbleStyles.bubbleMessage} ${myself ? bubbleStyles.myself : bubbleStyles.themself}`}
    >
      <span>{text}</span>
      {resourceUrl &&
        (source === resourceUrl ? (
          <img
            loading="lazy"
            src={resourceUrl}
            alt="Archivo"
            data-file="image"
          />
        ) : (
          <a href={resourceUrl}>
            <Image
              src={source}
              data-file="file-icon"
              loading="lazy"
              alt={"Archivo"}
            />
          </a>
        ))}
    </div>
  );
});

BubbleMessage.displayName = "BubbleMessage";

export default BubbleMessage;
