"use client";

import { obtenerServiciosByPrestamista } from "@/actions/servicio.actions";
import { obtenerUsuarioLogged } from "@/actions/usuario.actions";
import ServicioItemOwn from "@/components/busqueda-servicio/ServicioItemOwn";
import SEForm from "@/components/skill-exchange/form/SEForm";
import SEInput from "@/components/skill-exchange/form/SEInput";
import SESelect from "@/components/skill-exchange/form/SESelect";
import SELinkButton from "@/components/skill-exchange/SELinkButton";
import SETitle from "@/components/skill-exchange/text/SETitle";
import SEParragraph from "@/components/skill-exchange/text/SEParragraph";
import ServicioResponse from "@/interfaces/responsebody/servicio/ServicioResponse";
import UsuarioRegisteredResponse from "@/interfaces/responsebody/usuario/UsuarioRegisteredResponse";
import classNames from "classnames";
import { useEffect, useState } from "react";
import SEContainer from "@/components/skill-exchange/containers/SEContainer";
import SECard from "@/components/skill-exchange/SECard";
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
    <div className={classNames("")}>
      <SETitle size="extraLarge" label="Mis servicios" />
      <SELinkButton label="Nuevo servicio" link="/registro/servicio" />
      {servicios.length > 0 ? (
        <>
          <SEForm>
            <SESelect
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
