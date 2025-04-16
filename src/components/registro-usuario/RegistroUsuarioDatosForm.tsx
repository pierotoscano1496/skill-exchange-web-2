"use client";

import { useRegistroUsuarioContext } from "@/hooks/useRegistroUsuarioContext";
import { getMaxDateToISOString } from "@/utils/auxiliares";
import { TipoDocumento } from "@/utils/types";
import { useRouter } from "next/navigation";

type TipoDocumentoOptions = {
  value: TipoDocumento;
  name: string;
};

const RegistroUsuarioDatosForm = () => {
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
  const router = useRouter();

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
    }
  };

  return (
    <div>
      <h2>Registro de usuario</h2>

      <div>
        <label>
          Nombres:
          <input
            type="text"
            value={usuarioDatos.nombres}
            onChange={(e) => setNombres(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Apellidos:
          <input
            type="text"
            value={usuarioDatos.apellidos}
            onChange={(e) => setApellidos(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Tipo de documento:
          <select onChange={(e) => setTipoDocumento(e.target.value)}>
            <option>--Seleccione--</option>
            {tipoDocummentoOptions.map((t) => (
              <option key={t.value} value={t.value}>
                {t.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          {usuarioDatos.tipoDocumento === "carnet_extranjeria"
            ? "Carnet de extranjería"
            : "DNI"}
          :
          {usuarioDatos.tipoDocumento === "dni" && (
            <input
              type="text"
              value={usuarioDatos.dni}
              onChange={(e) => setDocumento(e.target.value)}
              maxLength={8}
            />
          )}
          {usuarioDatos.tipoDocumento === "carnet_extranjeria" && (
            <input
              type="text"
              value={usuarioDatos.carnetExtranjeria}
              onChange={(e) => setDocumento(e.target.value)}
              maxLength={20}
            />
          )}
          {usuarioDatos.tipoDocumento === undefined && (
            <input type="text" disabled={true} />
          )}
        </label>
      </div>
      <div>
        <label>
          Fecha de nacimiento:
          <input
            type="date"
            defaultValue={maxFechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            max={maxFechaNacimiento}
          />
        </label>
      </div>

      <button type="button" onClick={nextStepRegistration}>
        Siguiente
      </button>
    </div>
  );
};

RegistroUsuarioDatosForm.displayName = "RegistroUsuarioDatosForm";

export default RegistroUsuarioDatosForm;
