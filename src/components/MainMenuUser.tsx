"use client";

import Usuario from "@/interfaces/Usuario";

export default ({ children, usuario }: { children: React.ReactNode, usuario: Usuario }) => {
    return (
        <div className="content">
            <div className="navbar">
                <div className="brand"></div>
                <div className="communication">
                    <span className="">
                        <i className="fa-solid fa-bell"></i>
                    </span>
                    <span>
                        <i className="fa-solid fa-comment"></i>
                    </span>
                </div>
                <div className="user-data">
                    {usuario.nombres}
                </div>
            </div>
            <div className="sidebar">
                <div className="sidebar-item">
                    <span><i className="fa-solid fa-thumbs-up"></i> Mis acuerdos</span>
                </div>
                <div className="sidebar-item">
                    <span><i className="fa-solid fa-file-contract"></i> Mis contratos</span></div>
                <div className="sidebar-item">
                    <span><i className="fa-solid fa-gear"></i> Servicios</span>
                </div>
                <div className="sidebar-item">
                    <span><i className="fa-solid fa-envelope"></i> Mis solicitudes</span></div>
            </div>
            <div className="">{children}</div>
        </div>
    )
}