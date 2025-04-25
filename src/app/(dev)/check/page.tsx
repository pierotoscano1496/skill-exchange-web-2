"use client";

import { checkServer } from "@/actions/check.actions";
import SEContainer from "@/components/skill-exchange/containers/SEContainer";
import SEButton from "@/components/skill-exchange/SEButton";
import SEParragraph from "@/components/skill-exchange/text/SEParragraph";
import SETitle from "@/components/skill-exchange/text/SETitle";
import { getBackendInstance } from "@/utils/constants.backend";
import React, { useState } from "react";

const CheckPage: React.FC = () => {
  const [message, setMessage] = useState<string>("");

  return (
    <SEContainer>
      <SETitle>Click aquí</SETitle>
      <SEButton
        label="Click aquí"
        onClick={async () => {
          const mensaje = await checkServer();
          setMessage(mensaje);
        }}
      />
      <SEParragraph>{message}</SEParragraph>
    </SEContainer>
  );
};

CheckPage.displayName = "CheckPage";

export default CheckPage;
