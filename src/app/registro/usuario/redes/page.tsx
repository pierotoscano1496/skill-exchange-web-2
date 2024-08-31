"use client";

import SEInput from "@/components/skill-exchange/form/SEInput";
import SETextarea from "@/components/skill-exchange/form/SETextarea";
import SEButton from "@/components/skill-exchange/SEButton";
import SELargeTitle from "@/components/skill-exchange/text/SELargeTitle";
import SEParragraph from "@/components/skill-exchange/text/SEParragraph";
import { useRegistroUsuarioContext } from "@/hooks/useRegistroUsuarioContext";
import {
  RegistroUsuarioBodyFirstStep,
  RegistroUsuarioBodySkills,
} from "@/interfaces/registro-usuario/RegistroUsuarioBody";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default () => {
  const {
    usuarioDatos,
    setUsuarioDatos,
    setCorreo,
    setClave,
    setIntroduccion,
    setPerfilLinkedin,
    setPerfilFacebook,
    setPerfilInstagram,
    setPerfilTiktok,
    validateRegistroUsuario,
    validateRegistroDatosContacto,
  } = useRegistroUsuarioContext();

  const [attempSubmit, setAttempSubmit] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (!validateRegistroUsuario()) {
      //Actualizar valores del usuario
      const usuarioInfoPrev = localStorage.getItem("usuarioDatos");
      if (usuarioInfoPrev) {
        const usuarioDatosFromFirst: RegistroUsuarioBodyFirstStep =
          JSON.parse(usuarioInfoPrev);
        setUsuarioDatos(usuarioDatosFromFirst as RegistroUsuarioBodySkills);
      } else {
        router.push("/registro/usuario/datos");
      }
    }
  });

  useEffect(() => {
    return () => {
      setAttempSubmit(false);
    };
  }, []);

  const nextStepRegistration = () => {
    if (validateRegistroDatosContacto()) {
      router.push("/registro/usuario/skills");
    } else {
      setAttempSubmit(true);
    }
  };

  return (
    <>
      <div className="flex flex-wrap max-w-5xl mx-auto p-6 bg-white shadow-xl rounded-xl">
        <div className="w-full md:w-1/2 mb-6 px-2">
          <SEInput
            label="Correo"
            onChange={(e) => setCorreo(e.target.value)}
            value={usuarioDatos.correo}
            type="email"
          />
          {attempSubmit && !usuarioDatos.correo && (
            <SEParragraph variant="error" label="Indique su correo" />
          )}
        </div>
        <div className="w-full md:w-1/2 mb-6 px-2">
          <SEInput
            label="Contraseña"
            onChange={(e) => setClave(e.target.value)}
            value={usuarioDatos.clave}
            type="email"
          />
          {attempSubmit && !usuarioDatos.clave && (
            <SEParragraph variant="error" label="Escriba una contraseña" />
          )}
        </div>
        <div className="w-full mb-6 px-2">
          <SETextarea
            placeholder="Escríbenos sobre ti"
            label="Introducción"
            value={usuarioDatos.introduccion}
            onChange={(e) => setIntroduccion(e.target.value)}
          />
        </div>
        <div className="w-full border-t-primary-900 border-t-2 pt-4">
          <SELargeTitle label="Tus redes" />
        </div>
        <div className="w-full md:w-1/2 mb-6 px-2">
          <SEInput
            name="linkedin"
            label="Linkedin"
            value={usuarioDatos.perfilLinkedin}
            onChange={(e) => setPerfilLinkedin(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/2 mb-6 px-2">
          <SEInput
            name="facebook"
            label="Facebook"
            value={usuarioDatos.perfilFacebook}
            onChange={(e) => setPerfilFacebook(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/2 mb-6 px-2">
          <SEInput
            name="instagram"
            label="Instagram"
            value={usuarioDatos.perfilInstagram}
            onChange={(e) => setPerfilInstagram(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/2 mb-6 px-2">
          <SEInput
            name="tiktok"
            label="Tiktok"
            value={usuarioDatos.perfilTiktok}
            onChange={(e) => setPerfilTiktok(e.target.value)}
          />
        </div>
        {attempSubmit &&
          !usuarioDatos.perfilLinkedin &&
          !usuarioDatos.perfilFacebook &&
          !usuarioDatos.perfilInstagram &&
          !usuarioDatos.perfilTiktok && (
            <div className="w-full mb-6 px-2">
              <SEParragraph
                variant="error"
                label="Indique al menos una de sus redes"
              />
            </div>
          )}

        <div className="w-full mb-6 px-2 flex">
          <SEButton
            className="m-auto"
            onClick={nextStepRegistration}
            variant="accent"
            label="Siguiente"
          />
        </div>
      </div>
    </>
  );
};
