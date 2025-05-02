"use client";

import SEInput from "@/components/skill-exchange/form/SEInput";
import SESelect from "@/components/skill-exchange/form/SESelect";
import SEButton from "@/components/skill-exchange/SEButton";
import SETitle from "@/components/skill-exchange/text/SETitle";
import SEParragraph from "@/components/skill-exchange/text/SEParragraph";
import { useRegistroUsuarioContext } from "@/hooks/useRegistroUsuarioContext";
import { RegistroUsuarioBodyFirstStep } from "@/interfaces/registro-usuario/RegistroUsuarioBody";
import { getMaxDate, getMaxDateToISOString } from "@/utils/auxiliares";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const RegistroUsuarioDatosPage = () => {
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

  const tipoDocumentoOptions = [
    { value: "dni", label: "DNI" },
    { value: "carnet_extranjeria", label: "Carnet de extranjería" },
  ];

  const nextStepRegistration = () => {
    if (validateRegistroUsuario()) {
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
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <SETitle size="extraLarge" className="mb-6 text-center">
        Registro de Usuario
      </SETitle>

      <div className="mb-4">
        <SEInput
          name="nombres"
          label="Nombres"
          value={usuarioDatos.nombres}
          onChange={(e) => setNombres(e.target.value)}
          placeholder="Ingresa tus nombres"
        />
        {attempSubmit && !usuarioDatos.nombres && (
          <SEParragraph theme="error" className="mt-2">
            Escriba sus nombres
          </SEParragraph>
        )}
      </div>

      <div className="mb-4">
        <SEInput
          name="apellidos"
          label="Apellidos"
          value={usuarioDatos.apellidos}
          onChange={(e) => setApellidos(e.target.value)}
          placeholder="Ingresa tus apellidos"
        />
        {attempSubmit && !usuarioDatos.apellidos && (
          <SEParragraph theme="error" className="mt-2">
            Escriba sus apellidos
          </SEParragraph>
        )}
      </div>

      <div className="mb-4">
        <SESelect
          name="tipoDocumento"
          label="Tipo de Documento"
          onChange={(e) => setTipoDocumento(e.target.value)}
          options={tipoDocumentoOptions}
          value={usuarioDatos.tipoDocumento}
        />
        {attempSubmit && !usuarioDatos.tipoDocumento && (
          <SEParragraph theme="error" className="mt-2">
            Indique el tipo de documento
          </SEParragraph>
        )}
      </div>

      {usuarioDatos.tipoDocumento === "dni" && (
        <div className="mb-4">
          <SEInput
            name="dni"
            label="DNI"
            value={usuarioDatos.dni}
            onChange={(e) => setDocumento(e.target.value)}
            placeholder="Ingresa tu DNI"
            formatTextProps={{
              pattern: "[0-9]{8}",
              maxLength: 8,
              inputMode: "numeric",
            }}
          />
          {attempSubmit && !usuarioDatos.dni && (
            <SEParragraph theme="error" className="mt-2">
              Escriba su DNI
            </SEParragraph>
          )}
        </div>
      )}

      {usuarioDatos.tipoDocumento === "carnet_extranjeria" && (
        <div className="mb-4">
          <SEInput
            name="carnet_extranjeria"
            label="Carnet de extranjería"
            value={usuarioDatos.carnetExtranjeria}
            onChange={(e) => setDocumento(e.target.value)}
            placeholder="Ingresa tu carnet de extranjería"
            formatTextProps={{
              pattern: "[0-9]{20}",
              maxLength: 20,
              inputMode: "numeric",
            }}
          />
          {attempSubmit && !usuarioDatos.carnetExtranjeria && (
            <SEParragraph theme="error" className="mt-2">
              Escriba su carnet de extranjería
            </SEParragraph>
          )}
        </div>
      )}

      <div className="mb-4">
        <SEInput
          name="fechaNacimiento"
          label="Fecha de Nacimiento"
          type="date"
          value={usuarioDatos.fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
          dateInputProps={{
            max: getMaxDate(),
          }}
        />
        {attempSubmit && !usuarioDatos.fechaNacimiento && (
          <SEParragraph theme="error" className="mt-2">
            Indique su fecha de nacimiento
          </SEParragraph>
        )}
      </div>

      <div className="flex justify-center">
        <SEButton variant="accent" size="medium" onClick={nextStepRegistration}>
          Siguiente
        </SEButton>
      </div>
    </div>
  );
};

export default RegistroUsuarioDatosPage;
