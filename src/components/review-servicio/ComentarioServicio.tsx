import ComentarioServicioResponse from "@/interfaces/responsebody/review/ComentarioServicioResponse";
import SEContainer from "../skill-exchange/containers/SEContainer";
import SESpan from "../skill-exchange/text/SESpan";
import StarRating from "../skill-exchange/business/StarRating";
import SEParragraph from "../skill-exchange/text/SEParragraph";

interface ComentarioProps {
  comentario: ComentarioServicioResponse;
}

export default ({ comentario }: ComentarioProps) => (
  <SEContainer
    key={comentario.id}
    direction="column"
    style="container"
    align="center"
  >
    <SEContainer justify="start">
      <SESpan
        weight="bold"
        className="h-8 mr-4"
      >{`${comentario.nombresComentarista} ${comentario.apellidosComentarista}`}</SESpan>
      <StarRating rating={comentario.puntaje} size="small" className="h-8" />
    </SEContainer>
    <SEContainer>
      <SEParragraph align="start" breakSpace={false}>
        {comentario.comentario}
      </SEParragraph>
    </SEContainer>
  </SEContainer>
);
