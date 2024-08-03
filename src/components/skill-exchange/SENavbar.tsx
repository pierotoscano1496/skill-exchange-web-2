"use client";

import Usuario from "@/interfaces/Usuario";
import React, { useState } from "react";
import { logoutUsuario } from "@/actions/usuario.actions";
import { useRouter } from "next/navigation";
import mainMenuUserStyles from "@/app/styles/menu/mainMenu.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faBell,
  faComment,
  faDoorOpen,
  faEnvelope,
  faFileContract,
  faGear,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import SEButton from "./SEButton";

interface NavbarProps {
  children: React.ReactNode;
  usuario: Usuario | undefined;
  variant?: "primary" | "secondary";
}

const SENavbar: React.FC<NavbarProps> = ({
  children,
  usuario,
  variant = "primary",
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const logout = async () => {
    const mensaje = await logoutUsuario();
    router.push("/login");
  };

  const variantStyles = `bg-${variant}-dark`;

  return (
    <>
      <header>
        <nav className={classNames(variantStyles)}>
          <ul
            className={classNames(
              "flex items-center flex-wrap flex-row justify-end list-none list-image-none text-white [&>li>*]:no-underline [&>li>*]:block [&>li>*]:p-4 [&>li>i]:cursor-pointer"
            )}
          >
            <li>
              <FontAwesomeIcon icon={faBell} />
            </li>
            <li>
              <a href="/mensajes">
                <FontAwesomeIcon icon={faComment} />
              </a>
            </li>
            <li>
              <a href="/servicio">Buscar Servicios</a>
            </li>
            {usuario ? (
              <>
                <li>
                  <a href="/profile">{usuario.nombres}</a>
                </li>
                <li>
                  <SEButton
                    onClick={logout}
                    className="bg-inherit"
                    marginBottom={0}
                    icon={<FontAwesomeIcon icon={faDoorOpen} />}
                  />
                </li>
              </>
            ) : (
              <li>
                <a className={mainMenuUserStyles.login} href="/login">
                  Iniciar sesión
                </a>
              </li>
            )}
          </ul>
        </nav>
      </header>
      {usuario ? (
        <>
          <aside
            className={`${mainMenuUserStyles.sidebar} ${sidebarCollapsed ? mainMenuUserStyles.collapsed : ""}`}
          >
            <nav>
              <ul>
                <li>
                  <a href="/acuerdos">
                    <FontAwesomeIcon icon={faThumbsUp} />
                    <span> Acuerdos</span>
                  </a>
                </li>
                <li>
                  <a href="/contratos">
                    <FontAwesomeIcon icon={faFileContract} />
                    <span> Contratos</span>
                  </a>
                </li>
                <li>
                  <a href="/servicio/own">
                    <FontAwesomeIcon icon={faGear} />
                    <span> Servicios</span>
                  </a>
                </li>
                <li>
                  <a href="/solicitudes">
                    <FontAwesomeIcon icon={faEnvelope} />
                    <span> Solicitudes</span>
                  </a>
                </li>
              </ul>
            </nav>
            <button
              className={mainMenuUserStyles.toggleButton}
              onClick={toggleSidebar}
            >
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </button>
          </aside>
          <main
            className={`content ${mainMenuUserStyles.mainContent} ${sidebarCollapsed ? mainMenuUserStyles.leftCollapsed : ""}`}
          >
            {children}
          </main>
        </>
      ) : (
        <main>{children}</main>
      )}
    </>
  );
};

export default SENavbar;
