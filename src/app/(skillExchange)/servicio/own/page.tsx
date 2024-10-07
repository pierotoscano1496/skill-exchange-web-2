"use client";

import { obtenerServiciosByPrestamista } from "@/actions/servicio.actions";
import { obtenerUsuarioLogged } from "@/actions/usuario.actions";
import ServicioItemOwn from "@/components/busqueda-servicio/ServicioItemOwn";
import SEForm from "@/components/skill-exchange/form/SEForm";
import SEInput from "@/components/skill-exchange/form/SEInput";
import SESelect from "@/components/skill-exchange/form/SESelect";
import SELinkButton from "@/components/skill-exchange/SELinkButton";
import SELargeTitle from "@/components/skill-exchange/text/SELargeTitle";
import SEMediumTitle from "@/components/skill-exchange/text/SEMediumTitle";
import SEParragraph from "@/components/skill-exchange/text/SEParragraph";
import ServicioResponse from "@/interfaces/responsebody/servicio/ServicioResponse";
import UsuarioRegisteredResponse from "@/interfaces/responsebody/usuario/UsuarioRegisteredResponse";
import classNames from "classnames";
import { useEffect, useState } from "react";

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
    <>
      <div className={classNames("")}>
        <SELargeTitle label="Mis servicios" />
        {servicios.length > 0 ? (
          <SEForm>
            <SESelect
              onChange={(e) => setServicioSelected(e.target.value)}
              options={servicios.map((s) => ({
                label: s.titulo,
                value: s.id,
              }))}
            />
            <div className="container">
              {servicios.map((s) => (
                <ServicioItemOwn key={s.id} servicio={s} />
              ))}
            </div>
          </SEForm>
        ) : (
          <>
            <SEParragraph content="Aún no tiene servicios publicados." />
            <SELinkButton label="Empezar" link="/registro/servicio" />
          </>
        )}
      </div>
    </>
  );
};
