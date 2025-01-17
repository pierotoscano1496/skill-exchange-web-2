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

let servicioReview: ServicioReviewResponse;

interface MedioPagoProps {
  medioPago: MedioPagoResponse;
}

export async function addComment(success: boolean) {
  "use server";

  if (success) {
    revalidatePath("/");
  }
}

export default async ({ params }: { params: Promise<{ id: string }> }) => {
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
      <SEParragraph>{servicioDetails.descripcion}</SEParragraph>
      <SETitle align="start" label="Detalles del servicio" />
      <SEContainer direction="column">
        <SEParragraph variant="hero">
          <SESpan weight="bold" className="mr-4">
            Precio:
          </SESpan>
          {servicioDetails.precio}
        </SEParragraph>
        <SEParragraph variant="accent">
          <SESpan weight="bold" className="mr-4">
            Categoría:
          </SESpan>
          {servicioDetails.categoria.nombre}
        </SEParragraph>
        <SEParragraph variant="secondary">
          <SESpan weight="bold" className="mr-4">
            Subcategoría:
          </SESpan>
          {servicioDetails.subCategoria.nombre}
        </SEParragraph>
        <SEParragraph>{servicioDetails.skill.descripcion}</SEParragraph>
      </SEContainer>
      {servicioDetails.modalidadesPago.length > 0 && (
        <>
          <SETitle align="start" label="Pagar con:" />
          <SEContainer columns={2}>
            {yapeMethod && (
              <SEContainer className="shadow-soft hover:shadow-deep bg-blue-200 rounded-xl p-8 w">
                <SESpan variant="yape-purple">Yape</SESpan>
                <YapeModule
                  numCelular={yapeMethod.numeroCelular}
                  source={yapeMethod.url}
                />
              </SEContainer>
            )}
            {tarjetaMethod && (
              <SEContainer className="shadow-soft hover:shadow-deep bg-blue-200 rounded-xl p-8">
                <SESpan>Tarjeta de débito/crédito</SESpan>
                <CreditCardModule number={tarjetaMethod.cuentaBancaria} />
              </SEContainer>
            )}
          </SEContainer>
        </>
      )}
      <SEContainer direction="column">
        {usuarioLogged &&
          servicioDetails.prestamista.id !== usuarioLogged.id && (
            <ContactForm cliente={usuarioLogged} servicio={servicioDetails}>
              Enviar mensaje
            </ContactForm>
          )}
        {!usuarioLogged && (
          <SEParragraph>
            <SELink link="/login" label="Inicia sesión" />
            <SELink link="/registro/usuario" label="Regístrate" />
          </SEParragraph>
        )}
      </SEContainer>
      <SEContainer direction="column">
        {usuarioLogged ? (
          <>
            <SETitle align="start" label="Emite tu opinión" />
            <FormReviewServicio
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
          <SEParragraph>
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
    </SEContainer>
  );
};
