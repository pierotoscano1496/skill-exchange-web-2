import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import cardStyles from "@/app/styles/cards/cardservicio.module.scss";

export default () => {
    return (
        <div>
            <div className="container">
                <div className="flex-grow-1">
                    <Skeleton width={"100%"} />
                </div>
                <div className="flex-grow-1">
                    <Skeleton width={"100%"} />
                </div>
                <div className="flex-grow-1">
                    <Skeleton width={"100%"} />
                </div>
            </div>
            <Skeleton count={3} height={100} className={cardStyles.cardServicio} style={{
                border: "none"
            }} />
        </div>
    )
}