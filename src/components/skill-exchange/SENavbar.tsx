"use client";

import Usuario from "@/interfaces/Usuario";
import React, { useEffect, useState } from "react";
import { logoutUsuario } from "@/actions/usuario.actions";
import { usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faBriefcase,
  faComment,
  faDoorOpen,
  faEnvelope,
  faFileContract,
  faGear,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import SEButton from "./SEButton";
import SELink from "./SELink";
import SENavbarItem from "./SENavbarItem";
import { NavbarOptionType } from "@/enums/NavbarOptions";
import { ThemesType } from "@/enums/Themes";
import SESpan from "./text/SESpan";

interface NavbarProps {
  children: React.ReactNode;
  usuario: Usuario | undefined;
  variant?: ThemesType;
  selectedKey?: NavbarOptionType;
}

const SENavbar: React.FC<NavbarProps> = ({
  children,
  usuario,
  variant = "primary",
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  const variantClasses = {
    primary: "bg-primary-dark",
    secondary: "bg-secondary-dark",
    accent: "bg-accent-dark",
    neutral: "bg-neutral-dark",
    error: "bg-error-dark",
  } as Record<ThemesType, string>;

  useEffect(() => {
    const saveCollapsed = localStorage.getItem("sidebarCollapsed");
    if (saveCollapsed === "true") {
      setSidebarCollapsed(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", sidebarCollapsed.toString());
  }, [sidebarCollapsed]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const logout = async () => {
    await logoutUsuario();
    router.push("/login");
  };

  const collapsedClassMargin = classNames(
    "transition-all duration-300",
    sidebarCollapsed ? "ml-0" : "ml-64"
  );

  const selectedKey: NavbarOptionType = (() => {
    if (pathName.startsWith("/acuerdos")) return "acuerdos";
    if (pathName.startsWith("/contratos")) return "contratos";
    if (pathName.startsWith("/servicio")) return "servicios";
    if (pathName.startsWith("/solicitudes")) return "solicitudes";
    return "none";
  })();

  return (
    <>
      <header className={collapsedClassMargin}>
        <nav className={classNames(variantClasses[variant], "p-4")}>
          <ul className="flex items-center justify-end list-none text-white">
            <li className="mr-auto">
              <SEButton
                shape="noShape"
                className="!text-primary-100 p-2 mr-4"
                onClick={toggleSidebar}
                icon={<FontAwesomeIcon icon={faBars} />}
                aria-label="Toggle Sidebar"
              />
            </li>
            <li>
              <SESpan className="!text-primary-100">
                <FontAwesomeIcon icon={faBell} />
              </SESpan>
            </li>
            <li>
              <SELink
                variant={variant}
                link="/mensajes"
                className="!text-primary-100"
              >
                <FontAwesomeIcon icon={faComment} />
              </SELink>
            </li>
            <li>
              <SELink className="!text-primary-100" link="/servicio">
                <span className="hidden md:inline">Buscar Servicios</span>
                <FontAwesomeIcon icon={faBriefcase} className="md:ml-1" />
              </SELink>
            </li>
            {usuario ? (
              <>
                <li>
                  <SELink className="!text-primary-100" link="/profile">
                    {usuario.nombres}
                  </SELink>
                </li>
                <li>
                  <SEButton
                    onClick={logout}
                    shape="noShape"
                    icon={<FontAwesomeIcon icon={faDoorOpen} />}
                    aria-label="Cerrar sesión"
                  />
                </li>
              </>
            ) : (
              <li>
                <SELink className="!text-primary-100" link="/login">
                  Iniciar sesión
                </SELink>
              </li>
            )}
          </ul>
        </nav>
      </header>

      {usuario ? (
        <>
          <aside
            className={classNames(
              "bg-primary-200 p-4",
              "flex flex-col h-screen fixed top-0 left-0 justify-between w-64",
              "transition-transform duration-300 ease-in-out transform",
              sidebarCollapsed ? "-translate-x-full" : "translate-x-0"
            )}
          >
            <nav>
              <ul className="space-y-2 w-48">
                <SENavbarItem
                  selected={selectedKey === "acuerdos"}
                  collapsed={sidebarCollapsed}
                  link="/acuerdos"
                  variant={variant}
                  icon={<FontAwesomeIcon icon={faThumbsUp} />}
                >
                  Acuerdos
                </SENavbarItem>
                <SENavbarItem
                  selected={selectedKey === "contratos"}
                  collapsed={sidebarCollapsed}
                  link="/contratos"
                  variant={variant}
                  icon={<FontAwesomeIcon icon={faFileContract} />}
                >
                  Contratos
                </SENavbarItem>
                <SENavbarItem
                  selected={selectedKey === "servicios"}
                  collapsed={sidebarCollapsed}
                  link="/servicio/own"
                  variant={variant}
                  icon={<FontAwesomeIcon icon={faGear} />}
                >
                  Servicios
                </SENavbarItem>
                <SENavbarItem
                  selected={selectedKey === "solicitudes"}
                  collapsed={sidebarCollapsed}
                  link="/solicitudes"
                  variant={variant}
                  icon={<FontAwesomeIcon icon={faEnvelope} />}
                >
                  Solicitudes
                </SENavbarItem>
              </ul>
            </nav>
          </aside>
          <main className={classNames("bg-gray-100", collapsedClassMargin)}>
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
