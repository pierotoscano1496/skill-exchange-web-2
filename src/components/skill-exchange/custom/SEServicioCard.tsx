import ServicioResponse from "@/interfaces/responsebody/servicio/ServicioResponse";
import SECard from "../SECard";
import SEButton from "../SEButton";
import { getFirstWords } from "@/utils/auxiliares";
import SETitle from "../text/SETitle";
import SEParragraph from "../text/SEParragraph";

interface ServiciosProps {
  servicio: ServicioResponse;
  sendSelectedServicio: (idServicio: string) => void;
}

const SEServicioCard = ({ servicio, sendSelectedServicio }: ServiciosProps) => {
  const shortDescription = `${getFirstWords(servicio.descripcion, 10)}...`;

  return (
    <SECard>
      <SETitle label={servicio.titulo} />
      <SEParragraph>{shortDescription}</SEParragraph>
      <SEButton onClick={() => sendSelectedServicio(servicio.id)} label="Ver" />
    </SECard>
  );
};

export default SEServicioCard;
