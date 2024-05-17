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
        <>
            <div className="form main">
                <div className="form-control">
                    <label>Correo:</label>
                    <input type="email" placeholder="ejemplo@mail.com" value={usuarioDatos.correo} onChange={(e) => setCorreo(e.target.value)} />
                </div>
                {(attempSubmit && !usuarioDatos.correo) && <p className="text-danger">Indique su correo</p>}
                <div className="form-control">
                    <label>Contraseña:</label>
                    <input type="password" value={usuarioDatos.clave} onChange={(e) => setClave(e.target.value)} />
                </div>
                {(attempSubmit && !usuarioDatos.clave) && <p className="text-danger">Escriba una contraseña</p>}
                <div className="form-control">
                    <label>Introducción:</label>
                    <textarea placeholder="Escríbenos sobre ti" value={usuarioDatos.introduccion} onChange={(e) => setIntroduccion(e.target.value)} />
                </div>
            </div>
            <div className="form main">
                <h3>Tus redes</h3>
                <div className="form-control">
                    <label htmlFor="linkedin">Linkedin:</label>
                    <input name="linkedin" value={usuarioDatos.perfilLinkedin} onChange={(e) => setPerfilLinkedin(e.target.value)} />
                </div>
                <div className="form-control">
                    <label htmlFor="facebook">Facebook:</label>
                    <input name="facebook" value={usuarioDatos.perfilFacebook} onChange={(e) => setPerfilFacebook(e.target.value)} />
                </div>
                <div className="form-control">
                    <label htmlFor="instagram">Instagram:</label>
                    <input name="instagram" value={usuarioDatos.perfilInstagram} onChange={(e) => setPerfilInstagram(e.target.value)} />
                </div>
                <div className="form-control">
                    <label className="tiktok">Tiktok:</label>
                    <input name="tiktok" value={usuarioDatos.perfilTiktok} onChange={(e) => setPerfilTiktok(e.target.value)} />
                </div>
                {(attempSubmit && (!usuarioDatos.perfilLinkedin
                    && !usuarioDatos.perfilFacebook
                    && !usuarioDatos.perfilInstagram
                    && !usuarioDatos.perfilTiktok
                )) && <p className="text-danger">Indique al menos una de sus redes</p>}
                <div className="form-control btn-group">
                    <button onClick={nextStepRegistration} className="btn-primary">Siguiente</button>
                    <button onClick={() => console.log(usuarioDatos)} className="btn-secondary">Corroborar</button>
                </div>
            </div>
        </>
    )
};