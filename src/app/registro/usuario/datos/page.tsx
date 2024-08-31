"use client";

import RegistroUsuarioDatosForm from "@/components/registro-usuario/RegistroUsuarioDatosForm";
import SEButton from "@/components/skill-exchange/SEButton";
import { RegistroUsuarioProvider } from "@/contexts/RegistroUsuarioProvider";
import { useRegistroUsuarioContext } from "@/hooks/useRegistroUsuarioContext";
import { RegistroUsuarioBodyFirstStep } from "@/interfaces/registro-usuario/RegistroUsuarioBody";
import { getMaxDateToISOString } from "@/utils/auxiliares";
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
      <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
        Registro de usuario
      </h2>

      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700 mb-3">
          Nombres:
        </label>
        <input
          type="text"
          value={usuarioDatos.nombres}
          onChange={(e) => setNombres(e.target.value)}
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
        />
        {attempSubmit && !usuarioDatos.nombres && (
          <p className="text-sm text-red-500 mt-1">Escriba sus nombres</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700 mb-3">
          Apellidos:
        </label>
        <input
          type="text"
          value={usuarioDatos.apellidos}
          onChange={(e) => setApellidos(e.target.value)}
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
        />
        {attempSubmit && !usuarioDatos.apellidos && (
          <p className="text-sm text-red-500 mt-1">Escriba sus apellidos</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700 mb-3">
          Tipo de documento:
        </label>
        <select
          onChange={(e) => setTipoDocumento(e.target.value)}
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
        >
          <option value={""}>--Seleccione--</option>
          {tipoDocummentoOptions.map((t) => (
            <option key={t.value} value={t.value}>
              {t.name}
            </option>
          ))}
        </select>
        {attempSubmit && !usuarioDatos.tipoDocumento && (
          <p className="text-sm text-red-500 mt-1">
            Indique el tipo de documento
          </p>
        )}
      </div>

      {usuarioDatos.tipoDocumento === "dni" && (
        <div className="mb-6">
          <label
            htmlFor="dni"
            className="block text-lg font-medium text-gray-700 mb-3"
          >
            DNI
          </label>
          <input
            name="dni"
            type="text"
            value={usuarioDatos.dni}
            pattern="[0-9]{8}"
            inputMode="numeric"
            onChange={(e) => setDocumento(e.target.value)}
            maxLength={8}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
          />
          {attempSubmit && !usuarioDatos.dni && (
            <p className="text-sm text-red-500 mt-1">Escriba su DNI</p>
          )}
        </div>
      )}

      {usuarioDatos.tipoDocumento === "carnet_extranjeria" && (
        <div className="mb-6">
          <label
            htmlFor="carnet_extranjeria"
            className="block text-lg font-medium text-gray-700 mb-3"
          >
            Carnet de extranjería
          </label>
          <input
            name="carnet_extranjeria"
            type="text"
            value={usuarioDatos.carnetExtranjeria}
            pattern="[0-9]{20}"
            inputMode="numeric"
            onChange={(e) => setDocumento(e.target.value)}
            maxLength={20}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
          />
          {attempSubmit && !usuarioDatos.carnetExtranjeria && (
            <p className="text-sm text-red-500 mt-1">
              Escriba su carnet de extranjería
            </p>
          )}
        </div>
      )}

      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700 mb-3">
          Fecha de nacimiento:
        </label>
        <input
          type="date"
          defaultValue={maxFechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
          max={maxFechaNacimiento}
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
        />
        {attempSubmit && !usuarioDatos.fechaNacimiento && (
          <p className="text-sm text-red-500 mt-1">
            Indique su fecha de nacimiento
          </p>
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
