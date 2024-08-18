"use client";

import RegistroUsuarioDatosForm from "@/components/registro-usuario/RegistroUsuarioDatosForm";
import { RegistroUsuarioProvider } from "@/contexts/RegistroUsuarioProvider";
import { useRegistroUsuarioContext } from "@/hooks/useRegistroUsuarioContext";
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
    setTipoRegistro,
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
      router.push("/registro/usuario/redes");
    } else {
      setAttempSubmit(true);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Registro de usuario
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nombres:
        </label>
        <input
          type="text"
          value={usuarioDatos.nombres}
          onChange={(e) => setNombres(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {attempSubmit && !usuarioDatos.nombres && (
          <p className="text-sm text-red-600 mt-1">Escriba sus nombres</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Apellidos:
        </label>
        <input
          type="text"
          value={usuarioDatos.apellidos}
          onChange={(e) => setApellidos(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {attempSubmit && !usuarioDatos.apellidos && (
          <p className="text-sm text-red-600 mt-1">Escriba sus apellidos</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tipo de documento:
        </label>
        <select
          onChange={(e) => setTipoDocumento(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={""}>--Seleccione--</option>
          {tipoDocummentoOptions.map((t) => (
            <option key={t.value} value={t.value}>
              {t.name}
            </option>
          ))}
        </select>
        {attempSubmit && !usuarioDatos.tipoDocumento && (
          <p className="text-sm text-red-600 mt-1">
            Indique el tipo de documento
          </p>
        )}
      </div>

      {usuarioDatos.tipoDocumento === "dni" && (
        <div className="mb-4">
          <label
            htmlFor="dni"
            className="block text-sm font-medium text-gray-700 mb-2"
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
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {attempSubmit && !usuarioDatos.dni && (
            <p className="text-sm text-red-600 mt-1">Escriba su DNI</p>
          )}
        </div>
      )}

      {usuarioDatos.tipoDocumento === "carnet_extranjeria" && (
        <div className="mb-4">
          <label
            htmlFor="carnet_extranjeria"
            className="block text-sm font-medium text-gray-700 mb-2"
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
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {attempSubmit && !usuarioDatos.carnetExtranjeria && (
            <p className="text-sm text-red-600 mt-1">
              Escriba su carnet de extranjería
            </p>
          )}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Fecha de nacimiento:
        </label>
        <input
          type="date"
          defaultValue={maxFechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
          max={maxFechaNacimiento}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {attempSubmit && !usuarioDatos.fechaNacimiento && (
          <p className="text-sm text-red-600 mt-1">
            Indique su fecha de nacimiento
          </p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Registrarse como:
        </label>
        <div className="flex items-center">
          <label className="mr-4 flex items-center">
            <input
              type="radio"
              name="tipoRegistro"
              value="cliente"
              onChange={(e) => setTipoRegistro(e.target.value as "cliente")}
              className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Cliente</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="tipoRegistro"
              value="proveedor"
              onChange={(e) => setTipoRegistro(e.target.value as "proveedor")}
              className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Proveedor</span>
          </label>
        </div>
        {attempSubmit && !usuarioDatos.tipo && (
          <p className="text-sm text-red-600 mt-1">
            Indique con qué perfil se registrará
          </p>
        )}
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={nextStepRegistration}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
