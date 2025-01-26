import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import cardStyles from "@/app/styles/cards/cardservicio.module.scss";
import SEContainer from "@/components/skill-exchange/containers/SEContainer";
import SEGridContainer from "@/components/skill-exchange/containers/SEGridContainer";

export default () => {
  return (
    <SEContainer direction="column" size="medium">
      <h1 className="text-center text-4xl w-full">
        <Skeleton />
      </h1>
      <SEGridContainer columns={2} size="full">
        <Skeleton height={200} borderRadius={"0.75rem"} />
        <Skeleton height={200} borderRadius={"0.75rem"} />
      </SEGridContainer>
    </SEContainer>
  );
};
