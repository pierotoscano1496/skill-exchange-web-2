"use client";

import PanelNavigation from "@/components/PanelNavigation";
import withAuth from "@/components/WithAuth";

const ClientSideHOC = () => {
    return (
        <PanelNavigation>
            <h2>Bienvenido usuario</h2>
        </PanelNavigation>
    )
};

export default ClientSideHOC;