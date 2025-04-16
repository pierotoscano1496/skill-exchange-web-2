import ContactForm from "@/components/busqueda-servicio/ContactForm";
import ServicioDetailsResponse from "@/interfaces/busqueda-servicio/ServicioDetailsResponse";
import { TipoModalidadPagoOption } from "@/utils/types";
import ServicioReviewResponse from "@/interfaces/responsebody/review/ServicioReviewResponse";
import FormReviewServicio from "@/components/review-servicio/FormReviewServicio";
import {
  getServicioDetails,
  getServicioReview,
} from "@/actions/servicio.actions";
import { obtenerUsuarioLogged } from "@/actions/usuario.actions";
import UsuarioRegisteredResponse from "@/interfaces/responsebody/usuario/UsuarioRegisteredResponse";
import YapeModule from "@/components/busqueda-servicio/YapeModule";
import CreditCardModule from "@/components/busqueda-servicio/CreditCardModule";
import SEContainer from "@/components/skill-exchange/containers/SEContainer";
import SETitle from "@/components/skill-exchange/text/SETitle";
import SEParragraph from "@/components/skill-exchange/text/SEParragraph";
import SESpan from "@/components/skill-exchange/text/SESpan";
import SELink from "@/components/skill-exchange/SELink";
import StarRating from "@/components/skill-exchange/business/StarRating";
import ComentarioServicioResponse from "@/interfaces/responsebody/review/ComentarioServicioResponse";
import { revalidatePath } from "next/cache";
import { getBackendInstanceAuth } from "@/utils/constants.backend";
import ComentarioServicioBody from "@/interfaces/requestbody/review/ComentarioServicioBody";
import ComentarioServicio from "@/components/review-servicio/ComentarioServicio";
import MedioPagoResponse from "@/interfaces/busqueda-servicio/MedioPagoResponse";
import React from "react";
import SEGridContainer from "@/components/skill-exchange/containers/SEGridContainer";
import { addComment } from "@/actions/comments.actions";

let servicioReview: ServicioReviewResponse;

interface MedioPagoProps {
  medioPago: MedioPagoResponse;
}

type Props = {
  params: Promise<{ id: string }>;
};

const ServicioDetailsPage = async ({ params }: Props) => {
  const { id } = await params;
  const servicioDetails: ServicioDetailsResponse = await getServicioDetails(id);

  servicioReview = await getServicioReview(id);

  let usuarioLogged: UsuarioRegisteredResponse | undefined = undefined;

  try {
    usuarioLogged = await obtenerUsuarioLogged();
  } catch {
    usuarioLogged = undefined;
  }

  const yapeMethod = servicioDetails.modalidadesPago.find(
    (m) => m.tipo === "yape"
  );

  const tarjetaMethod = servicioDetails.modalidadesPago.find(
    (m) => m.tipo === "tarjeta"
  );

  return (
    <SEContainer direction="column" size="medium">
      <SETitle size="extraLarge" label={servicioDetails.titulo} />
      <SEParragraph className="!mb-12">
        {servicioDetails.descripcion}
      </SEParragraph>

      <SETitle align="start" label="Detalles del servicio" />
      <SEGridContainer columns={2} className="!mb-12">
        <SESpan weight="bold">Precio (S/.):</SESpan>
        <SEParragraph variant="hero" breakSpace={false}>
          {servicioDetails.precio}
        </SEParragraph>
        <SESpan weight="bold">Categoría:</SESpan>
        <SEParragraph variant="accent" breakSpace={false}>
          {servicioDetails.categoria.nombre}
        </SEParragraph>
        <SESpan weight="bold">Subcategoría:</SESpan>
        <SEParragraph variant="secondary" breakSpace={false}>
          {servicioDetails.subCategoria.nombre}
        </SEParragraph>
        <SESpan weight="bold">Habilidades:</SESpan>
        <SEParragraph breakSpace={false}>
          {servicioDetails.skill.descripcion}
        </SEParragraph>
      </SEGridContainer>

      {servicioDetails.modalidadesPago.length > 0 && (
        <>
          <SETitle align="start" label="Pagar con:" />
          <SEGridContainer columns={2} gap={8} className="!mb-12">
            {yapeMethod && (
              <YapeModule
                idServicio={servicioDetails.id}
                numCelular={yapeMethod.numeroCelular}
                source={yapeMethod.url}
              />
            )}
            {tarjetaMethod && (
              <CreditCardModule number={tarjetaMethod.cuentaBancaria} />
            )}
          </SEGridContainer>
        </>
      )}
      {usuarioLogged && servicioDetails.prestamista.id !== usuarioLogged.id && (
        <SEContainer direction="column" className="!mb-12">
          <ContactForm cliente={usuarioLogged} servicio={servicioDetails}>
            Enviar mensaje
          </ContactForm>
        </SEContainer>
      )}
      {!usuarioLogged && (
        <SEParragraph className="!mb-12">
          <SELink link="/login" label="Inicia sesión" />
          <SELink link="/registro/usuario" label="Regístrate" />
        </SEParragraph>
      )}
      {usuarioLogged ? (
        <>
          <SETitle align="start" label="Emite tu opinión" />
          <FormReviewServicio
            className="!mb-12"
            comentarista={{
              id: usuarioLogged.id,
              apellidos: usuarioLogged.apellidos,
              nombres: usuarioLogged.nombres,
            }}
            idServicio={servicioDetails.id}
            onSubmit={addComment}
          />
        </>
      ) : (
        <SEParragraph className="!mb-12">
          Inicia sesión para que puedas emitir tu opinión
        </SEParragraph>
      )}
      <SETitle align="start" label="Comentarios" size="large" />
      {servicioReview.comentarios.length > 0 ? (
        <>
          <hr />
          {servicioReview.comentarios.map((c) => (
            <ComentarioServicio key={c.id} comentario={c} />
          ))}
        </>
      ) : (
        <SEParragraph>Sin reseñas</SEParragraph>
      )}
    </SEContainer>
  );
};

ServicioDetailsPage.displayName = "ServicioDetailsPage";

export default ServicioDetailsPage;
