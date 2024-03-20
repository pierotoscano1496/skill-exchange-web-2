"use client";

import { useRegistroUsuarioContext } from "@/hooks/useRegistroUsuarioContext";
import { getMaxDateToISOString } from "@/utils/auxiliares";
import { TipoDocumento, TipoRegistroUsuario } from "@/utils/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type TipoDocumentoOptions = {
    value: TipoDocumento;
    name: string;
}

const RegistroDatosUsuario = () => {
    const {
        usuarioDatos,
        setNombres,
        setApellidos,
        setTipoDocumento,
        setDocumento,
        setFechaNacimiento,
        setTipoRegistro,
        validateRegistroUsuario
    } = useRegistroUsuarioContext();
    const maxFechaNacimiento = getMaxDateToISOString();
    const router = useRouter();

    const tipoDocummentoOptions: TipoDocumentoOptions[] = [{
        value: "dni",
        name: "DNI"
    }, {
        value: "carnet_extranjeria",
        name: "Carnet de extranjería"
    }];

    const nextStepRegistration = () => {
        if (validateRegistroUsuario()) {
            router.push("/registro/usuario/redes");
        }
    }

    return (
        <div>
            <h2>Registro de usuario</h2>

            <div>
                <label>Nombres:
                    <input type="text" value={usuarioDatos.nombres} onChange={(e) => setNombres(e.target.value)} />
                </label>
            </div>
            <div>
                <label>Apellidos:
                    <input type="text" value={usuarioDatos.apellidos} onChange={(e) => setApellidos(e.target.value)} />
                </label>
            </div>
            <div>
                <label>Tipo de documento:
                    <select onChange={(e) => setTipoDocumento(e.target.value)}>
                        <option>--Seleccione--</option>
                        {tipoDocummentoOptions.map(t => (
                            <option value={t.value}>{t.name}</option>
                        ))}
                    </select>
                </label>
            </div>
            <div>
                <label>{usuarioDatos.tipoDocumento === "carnet_extranjeria" ? "Carnet de extranjería" : "DNI"}:
                    <input type="text" value={
                        (usuarioDatos.tipoDocumento === "dni" && usuarioDatos.dni) ||
                        (usuarioDatos.tipoDocumento === "carnet_extranjeria" && usuarioDatos.carnetExtranjeria) || ""
                    } onChange={(e) => setDocumento(e.target.value)} />
                </label>
            </div>
            <div>
                <label>Fecha de nacimiento:
                    <input type="date" defaultValue={maxFechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} max={maxFechaNacimiento} />
                </label>
            </div>
            <div>
                <label>Registrarse como</label>

                <label>
                    <input type="radio" name="tipoRegistro" value="cliente" /* checked={usuarioDatos.tipo === "cliente"}  */ onChange={(e) => setTipoRegistro(e.target.value as "cliente")} />
                    Cliente
                </label>

                <label>
                    <input type="radio" name="tipoRegistro" value="proveedor" /* checked={usuarioDatos.tipo === "proveedor"} */ onChange={(e) => setTipoRegistro(e.target.value as "proveedor")} />
                    Proveedor
                </label>
            </div>

            <button type="button" onClick={nextStepRegistration}>Siguiente</button>
        </div>
    )
};

export default RegistroDatosUsuario;