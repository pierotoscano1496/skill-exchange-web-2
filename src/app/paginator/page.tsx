"use client";

import { useRouter } from "next/navigation";

export default () => {
    const route = useRouter();
    return (
        <div>
            <button onClick={() => route.push("/paginator/consulta-backend")}>Ver Backend</button>
            <button onClick={() => route.push("/paginator/public-api")}>Ver JSON Place Holder</button>
        </div>
    );
}