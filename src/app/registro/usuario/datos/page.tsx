"use client";

import RegistroUsuarioDatosForm from "@/components/registro-usuario/RegistroUsuarioDatosForm";
import SEInput from "@/components/skill-exchange/form/SEInput";
import SESelect from "@/components/skill-exchange/form/SESelect";
import SEButton from "@/components/skill-exchange/SEButton";
import SETitle from "@/components/skill-exchange/text/SETitle";
import SEParragraph from "@/components/skill-exchange/text/SEParragraph";
import { RegistroUsuarioProvider } from "@/contexts/RegistroUsuarioProvider";
import { useRegistroUsuarioContext } from "@/hooks/useRegistroUsuarioContext";
import { RegistroUsuarioBodyFirstStep } from "@/interfaces/registro-usuario/RegistroUsuarioBody";
import { getMaxDate, getMaxDateToISOString } from "@/utils/auxiliares";
import { TipoDocumento, TipoRegistroUsuario } from "@/utils/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type TipoDocumentoOptions = {
  value: TipoDocumento;
  name: string;
};

export default () => {
  const {
    usuarioDatos,
    setNombres,
    setApellidos,
    setTipoDocumento,
    setDocumento,
    setFechaNacimiento,
    validateRegistroUsuario,
  } = useRegistroUsuarioContext();
  const maxFechaNacimiento = getMaxDateToISOString();
  const [attempSubmit, setAttempSubmit] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    return () => {
      setAttempSubmit(false);
    };
  }, []);

  const tipoDocummentoOptions: TipoDocumentoOptions[] = [
    {
      value: "dni",
      name: "DNI",
    },
    {
      value: "carnet_extranjeria",
      name: "Carnet de extranjería",
    },
  ];

  const nextStepRegistration = () => {
    if (validateRegistroUsuario()) {
      // Guardar valores temporales
      localStorage.setItem(
        "usuarioDatos",
        JSON.stringify({
          ...usuarioDatos,
          step: 1,
        } as RegistroUsuarioBodyFirstStep)
      );
      router.push("/registro/usuario/redes");
    } else {
      setAttempSubmit(true);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-xl rounded-xl">
      <SETitle
        size="extraLarge"
        label="Registro de usuario"
        className="mb-8 text-center"
      />

      <div className="mb-6">
        <SEInput
          name="nombres"
          value={usuarioDatos.nombres}
          onChange={(e) => setNombres(e.target.value)}
        />
        {attempSubmit && !usuarioDatos.nombres && (
          <SEParragraph variant="error">Escriba sus nombres</SEParragraph>
        )}
      </div>

      <div className="mb-6">
        <SEInput
          name="apellidos"
          label="Apellidos"
          value={usuarioDatos.apellidos}
          onChange={(e) => setApellidos(e.target.value)}
        />
        {attempSubmit && !usuarioDatos.apellidos && (
          <SEParragraph variant="error">Escriba sus apellidos</SEParragraph>
        )}
      </div>

      <div className="mb-6">
        <SESelect
          name="tipoDocumento"
          onChange={(e) => setTipoDocumento(e.target.value)}
          options={tipoDocummentoOptions.map((t) => ({
            label: t.name,
            value: t.value,
          }))}
        />
        {attempSubmit && !usuarioDatos.tipoDocumento && (
          <SEParragraph variant="error">
            Indique el tipo de documento
          </SEParragraph>
        )}
      </div>

      {usuarioDatos.tipoDocumento === "dni" && (
        <div className="mb-6">
          <SEInput
            label="DNI"
            name="dni"
            formatTextProps={{
              pattern: "[0-9]{8}",
              maxLength: 8,
              inputMode: "numeric",
            }}
            value={usuarioDatos.dni}
            onChange={(e) => setDocumento(e.target.value)}
          />
          {attempSubmit && !usuarioDatos.dni && (
            <SEParragraph variant="error">Escriba su DNI</SEParragraph>
          )}
        </div>
      )}

      {usuarioDatos.tipoDocumento === "carnet_extranjeria" && (
        <div className="mb-6">
          <SEInput
            label="Carnet de extranjería"
            name="carnet_extranjeria"
            formatTextProps={{
              pattern: "[0-9]{20}",
              maxLength: 20,
              inputMode: "numeric",
            }}
            value={usuarioDatos.carnetExtranjeria}
            onChange={(e) => setDocumento(e.target.value)}
          />
          {attempSubmit && !usuarioDatos.carnetExtranjeria && (
            <SEParragraph variant="error">
              Escriba su carnet de extranjería
            </SEParragraph>
          )}
        </div>
      )}

      <div className="mb-6">
        <SEInput
          defaultValue={maxFechaNacimiento}
          dateInputProps={{
            max: getMaxDate(),
          }}
          label="Fecha de nacimiento"
          type="date"
          onChange={(e) => setFechaNacimiento(e.target.value)}
        />
        {attempSubmit && !usuarioDatos.fechaNacimiento && (
          <SEParragraph variant="error">
            Indique su fecha de nacimiento
          </SEParragraph>
        )}
      </div>

      <div className="flex justify-center">
        <SEButton
          label="Siguiente"
          variant="accent"
          onClick={nextStepRegistration}
        />
      </div>
    </div>
  );
};
