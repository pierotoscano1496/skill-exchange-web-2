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

const SEServicioCard: React.FC<ServiciosProps> = ({
  servicio,
  sendSelectedServicio,
}) => {
  const shortDescription = `${getFirstWords(servicio.descripcion, 10)}...`;

  return (
    <SECard>
      <SETitle>{servicio.titulo}</SETitle>
      <SEParragraph>{shortDescription}</SEParragraph>
      <SEButton onClick={() => sendSelectedServicio(servicio.id)}>Ver</SEButton>
    </SECard>
  );
};

export default SEServicioCard;
