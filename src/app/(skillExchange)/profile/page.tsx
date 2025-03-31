"use client";

import { obtenerUsuarioLogged } from "@/actions/usuario.actions";
import SEContainer from "@/components/skill-exchange/containers/SEContainer";
import SEGridContainer from "@/components/skill-exchange/containers/SEGridContainer";
import SEInput from "@/components/skill-exchange/form/SEInput";
import SELink from "@/components/skill-exchange/SELink";
import SELabel from "@/components/skill-exchange/text/SELabel";
import SEParragraph from "@/components/skill-exchange/text/SEParragraph";
import SESpan from "@/components/skill-exchange/text/SESpan";
import SETitle from "@/components/skill-exchange/text/SETitle";
import UsuarioRegisteredResponse from "@/interfaces/responsebody/usuario/UsuarioRegisteredResponse";
import { useEffect, useState } from "react";

export default () => {
  const [usuario, setUsuario] = useState<UsuarioRegisteredResponse>();

  useEffect(() => {
    const setup = async () => {
      const usuarioLogged = await obtenerUsuarioLogged();
      setUsuario(usuarioLogged);
    };

    setup();
  }, []);

  return (
    <SEContainer direction="column" size="medium">
      {usuario && (
        <>
          <SEContainer direction="column" size="full">
            <SEGridContainer columns={2}>
              <SESpan weight="bold">Nombres</SESpan>
              <SEParragraph variant="hero">{usuario.nombres}</SEParragraph>
            </SEGridContainer>
            <SEGridContainer columns={2}>
              <SESpan weight="bold">Apellidos</SESpan>
              <SEParragraph variant="hero">{usuario.apellidos}</SEParragraph>
            </SEGridContainer>
            <SEGridContainer columns={2}>
              <SESpan weight="bold">Correo</SESpan>
              <SEParragraph variant="hero">{usuario.correo}</SEParragraph>
            </SEGridContainer>
            <SEGridContainer columns={2}>
              <SESpan weight="bold">Tipo de documento</SESpan>
              <SEParragraph variant="hero">
                {usuario.tipoDocumento}
              </SEParragraph>
            </SEGridContainer>
            <SEGridContainer columns={2}>
              <SESpan weight="bold">Número de documento</SESpan>
              <SEParragraph variant="hero">
                {usuario.dni || usuario.carnetExtranjeria}
              </SEParragraph>
            </SEGridContainer>
            <SEGridContainer columns={2}>
              <SESpan weight="bold">Fecha de nacimiento</SESpan>
              <SEParragraph variant="hero">
                {new Date(usuario.fechaNacimiento).toLocaleDateString()}
              </SEParragraph>
            </SEGridContainer>
            <SEContainer direction="column" size="full">
              <SESpan weight="bold">Sobre mí</SESpan>
              <SEParragraph variant="hero">{usuario.introduccion}</SEParragraph>
            </SEContainer>
          </SEContainer>

          <SESpan weight="bold">Redes sociales</SESpan>
          <SEGridContainer columns={3}>
            {usuario.perfilLinkedin && (
              <SELink
                link={usuario.perfilLinkedin}
                image={{
                  src: "/img/network/linkedin-logo.png",
                  alt: "LinkedIn Profile",
                  className: "w-12 h-12 hover:opacity-80 transition-opacity",
                }}
              />
            )}
            {usuario.perfilFacebook && (
              <SELink
                link={usuario.perfilFacebook}
                image={{
                  src: "/img/network/facebook-logo.png",
                  alt: "Facebook Profile",
                  className: "w-12 h-12 hover:opacity-80 transition-opacity",
                }}
              />
            )}
            {usuario.perfilInstagram && (
              <SELink
                link={usuario.perfilInstagram}
                image={{
                  src: "/img/network/instagram-logo.png",
                  alt: "Instagram Profile",
                  className: "w-12 h-12 hover:opacity-80 transition-opacity",
                }}
              />
            )}
            {usuario.perfilTiktok && (
              <SELink
                link={usuario.perfilTiktok}
                image={{
                  src: "/img/network/tiktok-logo.png",
                  alt: "TikTok Profile",
                  className: "w-12 h-12 hover:opacity-80 transition-opacity",
                }}
              />
            )}
          </SEGridContainer>
        </>
      )}
    </SEContainer>
  );
};
