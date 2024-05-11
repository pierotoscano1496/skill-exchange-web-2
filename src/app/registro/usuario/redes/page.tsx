"use client";

import { useRegistroUsuarioContext } from "@/hooks/useRegistroUsuarioContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default () => {
    const {
        usuarioDatos,
        setCorreo,
        setClave,
        setIntroduccion,
        setPerfilLinkedin,
        setPerfilFacebook,
        setPerfilInstagram,
        setPerfilTiktok,
        validateRegistroUsuario,
        validateRegistroDatosContacto
    } = useRegistroUsuarioContext();

    const [attempSubmit, setAttempSubmit] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        if (!validateRegistroUsuario()) {
            router.push("/registro/usuario/datos");
        }
    });

    useEffect(() => {
        return (() => {
            setAttempSubmit(false);
        })
    }, [])

    const nextStepRegistration = () => {
        if (validateRegistroDatosContacto()) {
            router.push("/registro/usuario/skills");
        } else {
            setAttempSubmit(true);
        }
    }

    return (
        <div className="form">
            <div className="form-control">
                <label>Correo:
                    <input type="email" placeholder="ejemplo@mail.com" value={usuarioDatos.correo} onChange={(e) => setCorreo(e.target.value)} />
                </label>
                {(attempSubmit && !usuarioDatos.correo) && <p className="text-danger">Indique su correo</p>}
            </div>
            <div className="form-control">
                <label>Contraseña:
                    <input type="password" value={usuarioDatos.clave} onChange={(e) => setClave(e.target.value)} />
                </label>
                {(attempSubmit && !usuarioDatos.clave) && <p className="text-danger">Escriba una contraseña</p>}
            </div>
            <div className="form-control">
                <label>Introducción:
                    <textarea placeholder="Escríbenos sobre ti" value={usuarioDatos.introduccion} onChange={(e) => setIntroduccion(e.target.value)} />
                </label>
            </div>

            <div className="form-panel">
                <h3>Tus redes</h3>
                <div>
                    <label>Linkedin:
                        <input value={usuarioDatos.perfilLinkedin} onChange={(e) => setPerfilLinkedin(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>Facebook:
                        <input value={usuarioDatos.perfilFacebook} onChange={(e) => setPerfilFacebook(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>Instagram:
                        <input value={usuarioDatos.perfilInstagram} onChange={(e) => setPerfilInstagram(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>Tiktok:
                        <input value={usuarioDatos.perfilTiktok} onChange={(e) => setPerfilTiktok(e.target.value)} />
                    </label>
                </div>
                {(attempSubmit && (!usuarioDatos.perfilLinkedin
                    && !usuarioDatos.perfilFacebook
                    && !usuarioDatos.perfilInstagram
                    && !usuarioDatos.perfilTiktok
                )) && <p className="text-danger">Indique al menos una de sus redes</p>}
            </div>
            <button onClick={nextStepRegistration} className="btn-primary">Siguiente</button>
            <button onClick={() => console.log(usuarioDatos)} className="btn-secondary">Corroborar</button>
        </div>
    )
};