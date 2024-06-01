"use client";

import Usuario from "@/interfaces/Usuario";
import { useState } from "react";
import { logoutUsuario } from "@/actions/usuario.actions";
import { useRouter } from "next/navigation";
import mainMenuUserStyles from "@/app/styles/menu/mainMenu.module.scss";

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
                <ul className={mainMenuUserStyles.navigation}>
                    <li>
                        <i className="fa-solid fa-bell"></i>
                    </li>
                    <li>
                        <a href="/mensajes"><i className="fa-solid fa-comment"></i></a>
                    </li>
                    <li>
                        <a href="/servicio">Buscar Servicios</a>
                    </li>
                    {usuario ?
                        <>
                            <li>
                                <a href="/profile">{usuario.nombres}</a>
                            </li>
                            <li>
                                <button className="btn-white icon" onClick={logout}>
                                    <i className="fa-solid fa-door-open"></i>
                                </button>
                            </li>
                        </>
                        :
                        <li>
                            <a className={mainMenuUserStyles.login} href="/login">Iniciar sesión</a>
                        </li>
                    }
                </ul>
            </header>
            {usuario ?
                <>
                    <aside className={`${mainMenuUserStyles.sidebar} ${sidebarCollapsed ? mainMenuUserStyles.collapsed : ""}`}>
                        <ul>
                            <li>
                                <a href="/acuerdos"><i className="fa-solid fa-thumbs-up"></i><span> Acuerdos</span></a>
                            </li>
                            <li>
                                <a href="/contratos"><i className="fa-solid fa-file-contract"></i><span> Contratos</span></a>
                            </li>
                            <li>
                                <a href="/servicio/own"><i className="fa-solid fa-gear"></i><span> Servicios</span></a>
                            </li>
                            <li>
                                <a href="/solicitudes"><i className="fa-solid fa-envelope"></i><span> Solicitudes</span></a>
                            </li>
                            {/* <li>
                                <span><i className="fa-solid fa-comment"></i> <a href="/mensajes">Mensajes</a></span>
                            </li> */}
                        </ul>
                        <button className={mainMenuUserStyles.toggleButton} onClick={toggleSidebar}>
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