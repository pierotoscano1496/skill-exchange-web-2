import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import cardStyles from "@/app/styles/cards/cardservicio.module.scss";

export default () => {
    return (
        <div className="container column">
            <h2 className="text-primary"><Skeleton /></h2>
            <p><Skeleton /></p>
            <p><Skeleton /></p>
            <div className="container baseline wrap">
                <div className="flex-grow-1">
                    <Skeleton />
                </div>
                <div className="flex-grow-1">
                    <Skeleton />
                </div>
                <div className="flex-grow-1">
                    <Skeleton />
                </div>
            </div>
            <p><Skeleton /></p>
            <div className="container content-space-evenly">
                <div className="container column">
                    <div style={{
                        height: "auto",
                        maxWidth: "12rem",
                        minWidth: "8rem"
                    }}>
                        <Skeleton width={"100%"} height={"100%"} />
                    </div>
                </div>
                <div className="container column">
                    <div style={{
                        height: "auto",
                        maxWidth: "12rem",
                        minWidth: "8rem"
                    }}>
                        <Skeleton width={"100%"} height={"100%"} />
                    </div>
                </div>
            </div>

        </div >
    )
}