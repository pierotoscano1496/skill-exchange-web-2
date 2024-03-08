"use client";

import { estadoSesion } from "@/utils/auth";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const withAuth = (Component: any) => {
    return function WithAuth(props: any) {
        const session = estadoSesion;

        useEffect(() => {
            if (!session) {
                redirect("/login");
            }
        }, []);

        if (!session) {
            return null;
        }

        return <Component {...props} />;
    };
};

export default withAuth;