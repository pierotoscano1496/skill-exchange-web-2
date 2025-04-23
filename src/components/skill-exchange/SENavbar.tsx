"use client";

import Usuario from "@/interfaces/Usuario";
import React, { useState } from "react";
import { logoutUsuario } from "@/actions/usuario.actions";
import { usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faBars,
  faBell,
  faComment,
  faDoorOpen,
  faEllipsisV,
  faEnvelope,
  faFileContract,
  faGear,
  faMagnifyingGlass,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import SEButton from "./SEButton";
import { VariantClasses } from "@/utils/types";
import SELink from "./SELink";
import SENavbarItem from "./SENavbarItem";
import { NavbarOptionType } from "@/enums/NavbarOptions";
import styles from "@/app/styles/tailwind.module.scss";
import SESpan from "./text/SESpan";

interface NavbarProps {
  children: React.ReactNode;
  usuario: Usuario | undefined;
  variant?: "primary" | "secondary";
  selectedKey?: NavbarOptionType;
}

const variantClasses: VariantClasses = {
  primary: {
    background: "bg-primary-dark",
    hoverBackground600: "hover:bg-primary-600",
  },
  accent: {
    background: "bg-accent-dark",
    hoverBackground600: "hover:bg-accent-600",
  },
  neutral: {
    background: "bg-neutral-dark",
    hoverBackground600: "hover:bg-neutral-600",
  },
  hero: {
    background: "bg-hero-light",
    hoverBackground600: "hover:bg-hero",
  },
};

const SENavbar: React.FC<NavbarProps> = ({
  children,
  usuario,
  variant = "primary",
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const logout = async () => {
    const mensaje = await logoutUsuario();
    router.push("/login");
  };

  const asideStyles = classNames(
    "bg-primary-200 p-4",
    "flex flex-col h-screen fixed top-0 left-0 justify-between",
    "w-64",
    "transition-transform duration-300 ease-in-out transform",
    sidebarCollapsed ? "-translate-x-full" : "translate-x-0"
  );
  const iconRotationStyles = classNames(
    "transition-transform duration-300 ease-in-out",
    sidebarCollapsed ? "rotate-90" : "rotate-0"
  );

  const collapsedClassMargin = classNames(
    "transition-all duration-300",
    sidebarCollapsed ? "ml-0" : "ml-64"
  );
  const collapsedClassPadding = classNames(
    "transition-all duration-300",
    sidebarCollapsed ? "p-0" : "p-64"
  );

  const collapsedClassTransition = classNames(
    "transition-all duration-300",
    sidebarCollapsed ? "-translate-x-full" : "translate-x-0"
  );
  const collapsedClassWidth = classNames(
    "transition-all duration-300",
    sidebarCollapsed ? "w-12" : "w-64"
  );
  const variantStyles = classNames(variantClasses[variant]?.background);

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
        <nav className={classNames(variantStyles, "p-4")}>
          <ul
            className={classNames(
              "flex items-center flex-wrap flex-row justify-end list-none list-image-none text-white [&>li>*]:no-underline [&>li>*]:block [&>li>*]:p-4 [&>li>i]:cursor-pointer"
            )}
          >
            <li className="mr-auto">
              <SEButton
                variant="neutral"
                shape="noShape"
                className="!text-primary-100 p-2 mr-4"
                onClick={toggleSidebar}
                icon={
                  <FontAwesomeIcon
                    icon={faBars}
                    className={iconRotationStyles}
                  />
                }
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
                icon={<FontAwesomeIcon icon={faComment} />}
              />
            </li>
            <li>
              <SELink
                className="!text-primary-100"
                link="/servicio"
                label="Buscar Servicios"
                icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
              />
            </li>
            {usuario ? (
              <>
                <li>
                  <SELink
                    className="!text-primary-100"
                    link="/profile"
                    label={usuario.nombres}
                  />
                </li>
                <li>
                  <SEButton
                    onClick={logout}
                    shape="noShape"
                    marginBottom={0}
                    icon={<FontAwesomeIcon icon={faDoorOpen} />}
                  />
                </li>
              </>
            ) : (
              <li>
                <SELink
                  className="!text-primary-100"
                  link="/login"
                  label="Iniciar sesión"
                />
              </li>
            )}
          </ul>
        </nav>
      </header>
      {usuario ? (
        <>
          <aside className={asideStyles}>
            <nav>
              <ul
                className={classNames(
                  "space-y-2 w-48"
                  //sidebarCollapsed ? "p-0" : "p-4"
                )}
              >
                <SENavbarItem
                  selected={selectedKey === "acuerdos"}
                  collapsed={sidebarCollapsed}
                  link="/acuerdos"
                  label="Acuerdos"
                  variant={variant}
                  icon={<FontAwesomeIcon icon={faThumbsUp} />}
                />
                <SENavbarItem
                  selected={selectedKey === "contratos"}
                  collapsed={sidebarCollapsed}
                  link="/contratos"
                  label="Contratos"
                  variant={variant}
                  icon={<FontAwesomeIcon icon={faFileContract} />}
                />
                <SENavbarItem
                  selected={selectedKey === "servicios"}
                  collapsed={sidebarCollapsed}
                  link="/servicio/own"
                  label="Servicios"
                  variant={variant}
                  icon={<FontAwesomeIcon icon={faGear} />}
                />
                <SENavbarItem
                  selected={selectedKey === "solicitudes"}
                  collapsed={sidebarCollapsed}
                  link="/solicitudes"
                  label="Solicitudes"
                  variant={variant}
                  icon={<FontAwesomeIcon icon={faEnvelope} />}
                />
              </ul>
            </nav>
          </aside>
          <main
            className={classNames(
              styles.backgroundPrincipal,
              collapsedClassMargin
            )}
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
