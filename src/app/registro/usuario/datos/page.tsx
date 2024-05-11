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
}

export default () => {
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
    const [attempSubmit, setAttempSubmit] = useState<boolean>(false)
    const router = useRouter();

    useEffect(() => {
        return (() => {
            setAttempSubmit(false);
        })
    }, []);

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
        } else {
            setAttempSubmit(true);
        }
    }

    return (
        <div className="form">
            <h2>Registro de usuario</h2>

            <div className="form-control">
                <label>Nombres:
                    <input type="text" value={usuarioDatos.nombres} onChange={(e) => setNombres(e.target.value)} />
                </label>
                {(attempSubmit && !usuarioDatos.nombres) && <p className="text-danger">Escriba sus nombres</p>}
            </div>
            <div className="form-control">
                <label>Apellidos:
                    <input type="text" value={usuarioDatos.apellidos} onChange={(e) => setApellidos(e.target.value)} />
                </label>
                {(attempSubmit && !usuarioDatos.apellidos) && <p className="text-danger">Escriba sus apellidos</p>}
            </div>
            <div className="form-control">
                <label>Tipo de documento:
                    <select onChange={(e) => setTipoDocumento(e.target.value)}>
                        <option>--Seleccione--</option>
                        {tipoDocummentoOptions.map(t => (
                            <option key={t.value} value={t.value}>{t.name}</option>
                        ))}
                    </select>
                </label>
                {(attempSubmit && !usuarioDatos.tipoDocumento) && <p className="text-danger">Indique el tipo de documento</p>}
            </div>
            <div className="form-control">
                <label>{usuarioDatos.tipoDocumento === "carnet_extranjeria" ? "Carnet de extranjería" : "DNI"}:
                    {
                        usuarioDatos.tipoDocumento === "dni" &&
                        <>
                            <input type="text" value={usuarioDatos.dni}
                                onChange={(e) => setDocumento(e.target.value)}
                                maxLength={8} />
                            {(attempSubmit && !usuarioDatos.dni) && <p className="text-danger">Escriba su DNI</p>}
                        </>

                    }
                    {
                        usuarioDatos.tipoDocumento === "carnet_extranjeria" &&
                        <>
                            <input type="text" value={usuarioDatos.carnetExtranjeria}
                                onChange={(e) => setDocumento(e.target.value)}
                                maxLength={20} />
                            {(attempSubmit && !usuarioDatos.carnetExtranjeria) && <p className="text-danger">Escriba su carnet de extranjería</p>}
                        </>
                    }
                    {
                        usuarioDatos.tipoDocumento === undefined &&
                        <input type="text" disabled={true} />
                    }
                </label>
            </div>
            <div className="form-control">
                <label>Fecha de nacimiento:
                    <input type="date" defaultValue={maxFechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} max={maxFechaNacimiento} />
                </label>
                {(attempSubmit && !usuarioDatos.fechaNacimiento) && <p className="text-danger">Indique su fecha de nacimiento</p>}
            </div>
            <div className="form-control">
                <label>Registrarse como</label>

                <label>
                    <input type="radio" name="tipoRegistro" value="cliente" onChange={(e) => setTipoRegistro(e.target.value as "cliente")} />
                    Cliente
                </label>

                <label>
                    <input type="radio" name="tipoRegistro" value="proveedor" onChange={(e) => setTipoRegistro(e.target.value as "proveedor")} />
                    Proveedor
                </label>
                {(attempSubmit && !usuarioDatos.tipo) && <p className="text-danger">Indique con qué perfil se registrará</p>}
            </div>

            <button type="button" className="btn-primary" onClick={nextStepRegistration}>Siguiente</button>
        </div>
    )
};