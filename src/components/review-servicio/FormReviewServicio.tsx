"use client";

import { useState } from "react";
import SEForm, { SEFormControl } from "../skill-exchange/form/SEForm";
import SELabel from "../skill-exchange/text/SELabel";
import SETextarea from "../skill-exchange/form/SETextarea";
import SEButton from "../skill-exchange/SEButton";
import StarRating from "../skill-exchange/business/StarRating";
import { comentarServicio } from "@/actions/servicioreviews.actions";
import SEParragraph from "../skill-exchange/text/SEParragraph";

interface Props {
  comentarista: {
    id: string;
    nombres: string;
    apellidos: string;
  };
  idServicio: string;
  className?: string;
  onSubmit: (success: boolean) => void;
}

const FormReviewServicio = ({
  idServicio,
  comentarista,
  className,
  onSubmit,
}: Props) => {
  const [comentario, setComentario] = useState("");
  const [puntaje, setPuntaje] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorSubmission, setErrorSubmission] = useState<boolean>(false);

  const cleanForm = () => {
    setComentario("");
    setPuntaje(0);
  };

  const comentar = async () => {
    if (errorSubmission) {
      setErrorSubmission(false);
    }

    if (puntaje && comentario) {
      setLoading(true);
      const publishedComment = await comentarServicio({
        idServicio,
        idComentarista: comentarista.id,
        nombresComentarista: comentarista.nombres,
        apellidosComentarista: comentarista.apellidos,
        comentario,
        puntaje,
      });
      setLoading(false);

      if (publishedComment) {
        cleanForm();
        onSubmit(true);
      }
    }
  };

  return (
    <SEForm size="full" className={className}>
      <SEFormControl>
        <SELabel htmlFor="comentario">Comentario</SELabel>
        <SETextarea
          name="comentario"
          value={comentario}
          onChange={(e) => {
            setComentario(e.target.value);
            if (errorSubmission) {
              setErrorSubmission(false);
            }
          }}
        />
      </SEFormControl>
      <SEFormControl>
        <SELabel htmlFor="puntaje">Puntaje:</SELabel>
        <StarRating
          rating={puntaje}
          onRate={(rating) => setPuntaje(rating)}
          focusable={true}
        />
      </SEFormControl>
      <SEButton label="Comentar" onClick={comentar} disabled={loading} />
      {errorSubmission && (
        <SEParragraph variant="error" onClick={() => setErrorSubmission(false)}>
          Error en la publicación de la reseña
        </SEParragraph>
      )}
    </SEForm>
  );
};

FormReviewServicio.displayName = "FormReviewServicio";

export default FormReviewServicio;
