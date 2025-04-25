"use client";

import { useEffect, useState } from "react";
import { obtenerUsuarioLogged } from "@/actions/usuario.actions";
import SEContainer from "@/components/skill-exchange/containers/SEContainer";
import SEGridContainer from "@/components/skill-exchange/containers/SEGridContainer";
import SEParragraph from "@/components/skill-exchange/text/SEParragraph";
import SELabel from "@/components/skill-exchange/text/SELabel";
import SETitle from "@/components/skill-exchange/text/SETitle";
import SESpan from "@/components/skill-exchange/text/SESpan";
import SECard from "@/components/skill-exchange/SECard";
import SELink from "@/components/skill-exchange/SELink";
import UsuarioRegisteredResponse from "@/interfaces/responsebody/usuario/UsuarioRegisteredResponse";

const ProfilePage: React.FC = () => {
  const [usuario, setUsuario] = useState<UsuarioRegisteredResponse>();

  useEffect(() => {
    const setup = async () => {
      const usuarioLogged = await obtenerUsuarioLogged();
      setUsuario(usuarioLogged);
    };

    setup();
  }, []);

  return (
    <SEContainer direction="column" size="medium" className="py-10">
      {usuario && (
        <SECard className="p-6 shadow-lg bg-surface border border-gray-200 rounded-2xl space-y-8">
          <div className="space-y-6">
            <SETitle size="large" className="text-primary">
              Información del perfil
            </SETitle>

            <SEGridContainer columns={2}>
              <SELabel>Nombres</SELabel>
              <SEParragraph>{usuario.nombres}</SEParragraph>
            </SEGridContainer>

            <SEGridContainer columns={2}>
              <SELabel>Apellidos</SELabel>
              <SEParragraph>{usuario.apellidos}</SEParragraph>
            </SEGridContainer>

            <SEGridContainer columns={2}>
              <SELabel>Correo</SELabel>
              <SEParragraph>{usuario.correo}</SEParragraph>
            </SEGridContainer>

            <SEGridContainer columns={2}>
              <SELabel>Tipo de documento</SELabel>
              <SEParragraph>{usuario.tipoDocumento}</SEParragraph>
            </SEGridContainer>

            <SEGridContainer columns={2}>
              <SELabel>Número de documento</SELabel>
              <SEParragraph>
                {usuario.dni || usuario.carnetExtranjeria}
              </SEParragraph>
            </SEGridContainer>

            <SEGridContainer columns={2}>
              <SELabel>Fecha de nacimiento</SELabel>
              <SEParragraph>
                {new Date(usuario.fechaNacimiento).toLocaleDateString()}
              </SEParragraph>
            </SEGridContainer>

            <div>
              <SELabel>Sobre mí</SELabel>
              <SEParragraph className="text-muted mt-2">
                {usuario.introduccion}
              </SEParragraph>
            </div>
          </div>

          {(usuario.perfilLinkedin ||
            usuario.perfilFacebook ||
            usuario.perfilInstagram ||
            usuario.perfilTiktok) && (
            <div className="pt-6 border-t border-gray-200">
              <SETitle size="medium" className="text-secondary mb-4">
                Redes sociales
              </SETitle>
              <SEGridContainer columns={4}>
                {usuario.perfilLinkedin && (
                  <SELink
                    link={usuario.perfilLinkedin}
                    image={{
                      src: "/img/network/linkedin-logo.png",
                      alt: "LinkedIn Profile",
                      className:
                        "w-12 h-12 hover:opacity-80 transition-opacity",
                    }}
                  />
                )}
                {usuario.perfilFacebook && (
                  <SELink
                    link={usuario.perfilFacebook}
                    image={{
                      src: "/img/network/facebook-logo.png",
                      alt: "Facebook Profile",
                      className:
                        "w-12 h-12 hover:opacity-80 transition-opacity",
                    }}
                  />
                )}
                {usuario.perfilInstagram && (
                  <SELink
                    link={usuario.perfilInstagram}
                    image={{
                      src: "/img/network/instagram-logo.png",
                      alt: "Instagram Profile",
                      className:
                        "w-12 h-12 hover:opacity-80 transition-opacity",
                    }}
                  />
                )}
                {usuario.perfilTiktok && (
                  <SELink
                    link={usuario.perfilTiktok}
                    image={{
                      src: "/img/network/tiktok-logo.png",
                      alt: "TikTok Profile",
                      className:
                        "w-12 h-12 hover:opacity-80 transition-opacity",
                    }}
                  />
                )}
              </SEGridContainer>
            </div>
          )}
        </SECard>
      )}
    </SEContainer>
  );
};

ProfilePage.displayName = "ProfilePage";

export default ProfilePage;
