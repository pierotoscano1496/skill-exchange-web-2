import Skeleton from "react-loading-skeleton";
import cardStyles from "@/app/styles/cards/cardservicio.module.scss";

const ServiciosFallBack = () => {
  return (
    <div>
      <Skeleton width={"100%"} height={60} />
    </div>
  );
};

ServiciosFallBack.displayName = "ServiciosFallBack";

export default ServiciosFallBack;
