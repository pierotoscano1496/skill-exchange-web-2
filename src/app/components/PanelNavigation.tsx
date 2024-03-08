import Usuario from "@/interfaces/Usuario";
import { getCookieParam } from "@/utils/cookieManager";
import { useEffect, useState } from "react";

interface PanelProps {
    children: React.ReactNode;
};

const PanelNavigation: React.FC<PanelProps> = ({ children }) => {
    const [usuario, setUsuario] = useState<Usuario>();

    const logout = async () => {
        const tokenValue = getCookieParam("token");
        const response = await fetch(`http://localhost:9081/api/usuario/logout`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + tokenValue,
                'Content-Type': 'application/json'
            }
        });

        const message: string = await response.text();

        if (message === "Logout succesfull") {
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        }
    }

    useEffect(() => {
        obtenerUsuario();
    }, []);

    const obtenerUsuario = async () => {
        const token = `Bearer ${getCookieParam("token")}`;
        const response = await fetch(`http://localhost:9081/api/usuario`, {
            headers: {
                Authorization: token
            }
        });

        const usuario: Usuario = await response.json() as Usuario;
        setUsuario(usuario);
    }

    return (
        <div>
            <h2>Hola {usuario?.nombres}</h2>
            <button onClick={logout}>Logout</button>
            {children}
        </div>
    )
};

export default PanelNavigation;