"use client";

import withAuth from "@/components/WithAuth";

const ClientSideHOC = () => {
    return <div>
        <h2>Bienvenido usuario</h2>
    </div>
};

export default withAuth(ClientSideHOC);