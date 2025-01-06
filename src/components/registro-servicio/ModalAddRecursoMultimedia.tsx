"use client";

import { useEffect, useState } from "react";
import SocialMediaRender from "../SocialMediaRender";
import { MedioRecursoMultimedia } from "@/utils/types";
import { FileData } from "@/interfaces/registro-servicio/FileData";
import LinkData from "@/interfaces/registro-servicio/LinkData";
import SEModal from "../skill-exchange/messaging/SEModal";
import classNames from "classnames";
import SEForm, { SEFormFooter } from "../skill-exchange/form/SEForm";
import { SEFormControl } from "@/components/skill-exchange/form/SEForm";
import SEInput from "../skill-exchange/form/SEInput";
import SEButton from "../skill-exchange/SEButton";
import SEDragAndDrop from "../skill-exchange/multimedia/SEDragAndDrop";

type Props = {
  onSendFilesDataFromDragAndDrop: (filesData: FileData[]) => void;
  onSendLinkDataFromPlataformas: (linkData: LinkData) => void;
  onErrorFromDragAndDrop: () => void;
  onErrorFromPlataformas: () => void;
  onClose: () => void;
};

export default ({
  onSendLinkDataFromPlataformas,
  onClose,
  onSendFilesDataFromDragAndDrop,
  onErrorFromDragAndDrop,
  onErrorFromPlataformas,
}: Props) => {
  const [linkPost, setLinkPost] = useState<string>("");
  const [activeTab, setActiveTab] = useState(1);
  const [medio, setMedio] = useState<MedioRecursoMultimedia>();
  //const [newLinkDataFromRender, setNewLinkDataFromRender] = useState<LinkData>();

  useEffect(() => {
    return () => {
      setLinkPost("");
      setActiveTab(0);
      setMedio(undefined);
    };
  }, []);

  const tabs = [
    { order: 1, label: "Plataformas" },
    { order: 2, label: "Archivos" },
  ];

  const acceptedFilesForMultimedia = {
    "image/png": [".png"],
    "image/jpg": [".jpg", ".jpeg"],
    "image/bmp": [".bmp"],
    "image/gif": [".gif"],
    "video/mp4": [".mp4"],
    "video/mov": [".mov"],
    "video/wmv": [".wmv"],
    "video/avi": [".avi"],
  };

  const sendLinkDataFromRender = () => {
    if (medio && linkPost) {
      onSendLinkDataFromPlataformas({
        link: linkPost,
        medio,
      });
    } else {
      onErrorFromPlataformas();
    }
  };

  return (
    <SEModal title="" onClose={onClose}>
      <div className="mx-5 my-auto">
        <div className="flex">
          {tabs.map((tab, index) => (
            <div
              key={tab.label}
              className={classNames(
                "cursor-pointer w-full border-solid border-4 border-b-0 px-4 py-2",
                index === activeTab && "bg-primary-300"
              )}
              onClick={() => setActiveTab(index)}
            >
              {tab.label}
            </div>
          ))}
        </div>
        <div className="border-2 border-solid border-white">
          {activeTab === 0 && (
            <SEForm>
              <SEFormControl>
                <SEInput
                  name="link"
                  type="url"
                  value={linkPost}
                  onChange={(e) => setLinkPost(e.target.value)}
                />
              </SEFormControl>
              <SocialMediaRender
                link={linkPost}
                onRender={(medio) => setMedio(medio)}
              />
              <SEFormFooter>
                <SEButton
                  disabled={!medio}
                  onClick={sendLinkDataFromRender}
                  label="Añadir"
                />
              </SEFormFooter>
            </SEForm>
          )}
          {activeTab === 1 && (
            <SEDragAndDrop
              onSendFilesData={(filesData) =>
                onSendFilesDataFromDragAndDrop(filesData)
              }
              acceptSelect={acceptedFilesForMultimedia}
              onError={onErrorFromDragAndDrop}
              showSize={true}
            />
          )}
        </div>
      </div>
    </SEModal>
  );
};
