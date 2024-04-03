"use client";

import { useRegistroUsuarioContext } from "@/hooks/useRegistroUsuarioContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RegistroUsuarioContacto = () => {
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

    const router = useRouter();

    useEffect(() => {
        if (!validateRegistroUsuario()) {
            router.push("/registro/usuario/datos");
        }
    })

    const nextStepRegistration = () => {
        if (validateRegistroDatosContacto()) {
            router.push("/registro/usuario/skills");
        }
    }

    return (
        <div className="form">
            <div className="form-control">
                <label>Correo:
                    <input type="email" placeholder="ejemplo@mail.com" value={usuarioDatos.correo} onChange={(e) => setCorreo(e.target.value)} />
                </label>
            </div>
            <div className="form-control">
                <label>Contraseña:
                    <input type="password" placeholder="ejemplo@mail.com" value={usuarioDatos.clave} onChange={(e) => setClave(e.target.value)} />
                </label>
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
            </div>
            <button onClick={nextStepRegistration} className="btn-primary">Siguiente</button>
            <button onClick={() => console.log(usuarioDatos)} className="btn-secondary">Corroborar</button>
        </div>
    )
};

export default RegistroUsuarioContacto;