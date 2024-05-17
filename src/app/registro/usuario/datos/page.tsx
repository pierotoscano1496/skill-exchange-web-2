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
        <div className="form main">
            <h2>Registro de usuario</h2>

            <div className="form-control">
                <label>Nombres:</label>
                <input type="text" value={usuarioDatos.nombres} onChange={(e) => setNombres(e.target.value)} />
            </div>
            {(attempSubmit && !usuarioDatos.nombres) && <p className="text-danger">Escriba sus nombres</p>}
            <div className="form-control">
                <label>Apellidos:</label>
                <input type="text" value={usuarioDatos.apellidos} onChange={(e) => setApellidos(e.target.value)} />
            </div>
            {(attempSubmit && !usuarioDatos.apellidos) && <p className="text-danger">Escriba sus apellidos</p>}
            <div className="form-control">
                <label>Tipo de documento:</label>
                <select onChange={(e) => setTipoDocumento(e.target.value)}>
                    <option value={""}>--Seleccione--</option>
                    {tipoDocummentoOptions.map(t => (
                        <option key={t.value} value={t.value}>{t.name}</option>
                    ))}
                </select>
            </div>
            {(attempSubmit && !usuarioDatos.tipoDocumento) && <p className="text-danger">Indique el tipo de documento</p>}
            {usuarioDatos.tipoDocumento === "dni" &&
                <>
                    <div className="form-control">
                        <label htmlFor="dni">DNI</label>
                        <input name="dni" type="text" value={usuarioDatos.dni}
                            pattern="[0-9]{8}"
                            inputMode="numeric"
                            onChange={(e) => setDocumento(e.target.value)}
                            maxLength={8} />

                    </div>
                    {(attempSubmit && !usuarioDatos.dni) && <p className="text-danger">Escriba su DNI</p>}
                </>

            }
            {usuarioDatos.tipoDocumento === "carnet_extranjeria" &&
                <>
                    <div className="form-control">
                        <label htmlFor="carnet_extranjeria">Carnet de extranjería</label>
                        <input name="carnet_extranjeria" type="text" value={usuarioDatos.carnetExtranjeria}
                            pattern="[0-9]{20}"
                            inputMode="numeric"
                            onChange={(e) => setDocumento(e.target.value)}
                            maxLength={20} />
                    </div>
                    {(attempSubmit && !usuarioDatos.carnetExtranjeria) && <p className="text-danger">Escriba su carnet de extranjería</p>}
                </>
            }
            <div className="form-control">
                <label>Fecha de nacimiento:</label>
                <input type="date" defaultValue={maxFechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} max={maxFechaNacimiento} />
            </div>
            {(attempSubmit && !usuarioDatos.fechaNacimiento) && <p className="text-danger">Indique su fecha de nacimiento</p>}
            <div className="form-control">
                <label>Registrarse como</label>
                <div className="form-radio-group">
                    <div className="form-radio">
                        <label>Cliente</label>
                        <input type="radio" name="tipoRegistro" value="cliente" onChange={(e) => setTipoRegistro(e.target.value as "cliente")} />
                    </div>

                    <div className="form-radio">
                        <label>Proveedor</label>
                        <input type="radio" name="tipoRegistro" value="proveedor" onChange={(e) => setTipoRegistro(e.target.value as "proveedor")} />
                    </div>
                </div>
            </div>
            {(attempSubmit && !usuarioDatos.tipo) && <p className="text-danger">Indique con qué perfil se registrará</p>}
            <div className="form-control btn-group">
                <button type="button" className="btn-primary" onClick={nextStepRegistration}>Siguiente</button>
            </div>

        </div>
    )
};