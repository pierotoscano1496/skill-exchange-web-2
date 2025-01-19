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
import SEContainer from "@/components/skill-exchange/containers/SEContainer";
import loading from "../loading";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SESkeletonContainer from "@/components/loading/SESkeletonContainer";

export default () => {
  const [servicios, setServicios] = useState<ServicioResponse[]>([]);
  const [usuarioLogged, setUsuarioLogged] =
    useState<UsuarioRegisteredResponse>();
  const [servicioSelected, setServicioSelected] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const setup = async () => {
      try {
        const userLogged = await obtenerUsuarioLogged();
        setUsuarioLogged(userLogged);
        setServicios(await obtenerServiciosByPrestamista(userLogged.id));
      } catch {
        setServicios([]);
      } finally {
        //setIsLoading(false);
      }
    };

    setup();

    return () => {
      setServicios([]);
      setUsuarioLogged(undefined);
    };
  }, []);

  if (isLoading) {
    return (
      <SEGridContainer columns={2} size="medium" gap={8}>
        <SESkeletonContainer style="container" align="stretch" />
        {/* <SEContainer style="none">
          <Skeleton height={"100%"} width={"100%"} />
        </SEContainer> */}
        <div className="container baseline wrap">
          <div className="flex-grow-1">
            <Skeleton />
          </div>
          <div className="flex-grow-1">
            <Skeleton />
          </div>
          <div className="flex-grow-1">
            <Skeleton />
          </div>
        </div>
      </SEGridContainer>
    );
  }

  return (
    <SEContainer direction="column" size="medium">
      <SETitle size="extraLarge" label="Mis servicios" />
      {servicios.length > 0 ? (
        <>
          <SELinkButton label="Nuevo servicio" link="/registro/servicio" />
          <SEForm size="full">
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
    </SEContainer>
  );
};
