"use client";

import PanelNavigation from "@/app/components/PanelNavigation";
import withAuth from "@/app/components/WithAuth";

const ClientSideHOC = () => {
    return (
        <PanelNavigation>
            <h2>Bienvenido usuario</h2>
        </PanelNavigation>
    )
};

export default ClientSideHOC;