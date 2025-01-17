"use client";

import { obtenerServiciosByPrestamista } from "@/actions/servicio.actions";
import { obtenerUsuarioLogged } from "@/actions/usuario.actions";
import SEForm from "@/components/skill-exchange/form/SEForm";
import SESelect from "@/components/skill-exchange/form/SESelect";
import SELinkButton from "@/components/skill-exchange/SELinkButton";
import SETitle from "@/components/skill-exchange/text/SETitle";
import SEParragraph from "@/components/skill-exchange/text/SEParragraph";
import ServicioResponse from "@/interfaces/responsebody/servicio/ServicioResponse";
import UsuarioRegisteredResponse from "@/interfaces/responsebody/usuario/UsuarioRegisteredResponse";
import { useEffect, useState } from "react";
import SEServicio from "@/components/servicios/SEServicio";
import SEGridContainer from "@/components/skill-exchange/containers/SEGridContainer";

export default () => {
  const [servicios, setServicios] = useState<ServicioResponse[]>([]);
  const [usuarioLogged, setUsuarioLogged] =
    useState<UsuarioRegisteredResponse>();
  const [servicioSelected, setServicioSelected] = useState<string>("");

  useEffect(() => {
    const setup = async () => {
      const userLogged = await obtenerUsuarioLogged();
      setUsuarioLogged(userLogged);
      try {
        setServicios(await obtenerServiciosByPrestamista(userLogged.id));
      } catch {
        setServicios([]);
      }
    };

    setup();

    return () => {
      setServicios([]);
      setUsuarioLogged(undefined);
    };
  }, []);

  return (
    <div>
      <SETitle size="extraLarge" label="Mis servicios" />
      {servicios.length > 0 ? (
        <>
          <SELinkButton label="Nuevo servicio" link="/registro/servicio" />
          <SEForm size="medium">
            <SESelect
              includeInitOption={false}
              onChange={(e) => setServicioSelected(e.target.value)}
              options={servicios.map((s) => ({
                label: s.titulo,
                value: s.id,
              }))}
            />
          </SEForm>
          <SEGridContainer columns={2} size="medium">
            {servicios.map((s) => (
              <SEServicio key={s.id} servicio={s} />
            ))}
          </SEGridContainer>
        </>
      ) : (
        <>
          <SEParragraph>Aún no tiene servicios publicados.</SEParragraph>
          <SELinkButton label="Empezar" link="/registro/servicio" />
        </>
      )}
    </div>
  );
};
