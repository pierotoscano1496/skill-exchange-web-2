import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SEContainer from "@/components/skill-exchange/containers/SEContainer";

const ServicioDetailsLoading: React.FC = () => {
  return (
    <SEContainer direction="column" size="medium">
      <h1 className="text-center text-4xl w-full">
        <Skeleton />
      </h1>
      <SEContainer direction="column">
        <Skeleton className="w-full" height={200} borderRadius={"0.75rem"} />
        <Skeleton className="w-full" height={200} borderRadius={"0.75rem"} />
      </SEContainer>
    </SEContainer>
  );
};

ServicioDetailsLoading.displayName = "ServicioDetailsLoading";

export default ServicioDetailsLoading;
