"use client";

import Usuario from "@/interfaces/Usuario";
import mainMenuUserStyles from "@/app/styles/menu/mainMenu.module.scss";
import { useState } from "react";
import { logoutUsuario } from "@/actions/usuario.actions";
import { useRouter } from "next/navigation";

export default ({ children, usuario }: { children: React.ReactNode, usuario: Usuario | undefined }) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // Estado para controlar la expansión del sidebar
    const router = useRouter();

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    const logout = async () => {
        const mensaje = await logoutUsuario();
        router.push("/login");
    }

    return (
        <>
            <header className={mainMenuUserStyles.navbar}>
                <div className="brand"></div>
                <div className="communication">
                    <span className="">
                        <i className="fa-solid fa-bell"></i>
                    </span>
                    <span>
                        <i className="fa-solid fa-comment"></i>
                    </span>
                </div>
                <div className={mainMenuUserStyles.userData}>
                    {usuario ?
                        <>
                            <span>{usuario.nombres}</span>
                            <a className="link-white none" href="/servicio">Buscar Servicios</a>
                            <button className="btn-white icon" onClick={logout}>
                                <i className="fa-solid fa-right-from-bracket"></i>
                            </button>
                        </> :
                        <>
                            <a className="link-white none" href="/servicio">Buscar Servicios</a>
                            <a className={mainMenuUserStyles.login} href="/login">Iniciar sesión</a>
                        </>}
                </div>
            </header>
            {usuario ?
                <>
                    <aside className={`${mainMenuUserStyles.sidebar} ${sidebarCollapsed ? mainMenuUserStyles.collapsed : ""}`}>
                        <ul>
                            <li>
                                <span><i className="fa-solid fa-thumbs-up"></i> <a href="/acuerdos">Mis acuerdos</a></span>
                            </li>
                            <li>
                                <span><i className="fa-solid fa-file-contract"></i> <a href="/contratos">Mis contratos</a></span>
                            </li>
                            <li>
                                <span><i className="fa-solid fa-gear"></i> <a href="/servicio/own">Mis Servicios</a></span>
                            </li>
                            <li>
                                <span><i className="fa-solid fa-envelope"></i> <a href="/solicitudes">Mis solicitudes</a></span>
                            </li>
                            <li>
                                <span><i className="fa-solid fa-comment"></i> <a href="/mensajes">Mensajes</a></span>
                            </li>
                        </ul>
                        <button className={`btn-primary ${sidebarCollapsed ? "icon" : "btn-icon"}`} onClick={toggleSidebar}>
                            <i className="fa-solid fa-arrow-right-from-bracket"></i>
                        </button>
                    </aside>
                    <main className={`content ${mainMenuUserStyles.mainContent} ${sidebarCollapsed ? mainMenuUserStyles.leftCollapsed : ""}`}>
                        {children}
                    </main>
                </>
                :
                <main>
                    {children}
                </main>
            }
        </>
    )
}