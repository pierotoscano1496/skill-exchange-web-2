"use client";

import { useState } from "react";
import { RegistroUsuarioContext } from "./RegistroUsuarioContext";
import { RegistroUsuarioBodySkills } from "@/interfaces/registro-usuario/RegistroUsuarioBody";
import { TipoDocumento, TipoRegistroUsuario } from "@/utils/types";
import Skill from "@/interfaces/models/Skill";
import SkillUsuario from "@/interfaces/models/SkillUsuario";
import { RegistroSkill } from "@/interfaces/registro-usuario/RegistroSkill";
import axios from "axios";
import AsignacionSkillToUsuarioRequest from "@/interfaces/requestbody/AsignacionSkillToUsuarioRequest";
import UsuarioSkillsAsignadosResponse from "@/interfaces/responsebody/usuario/UsuarioSkillsAsignadosResponse";
import CreateUsuarioBody from "@/interfaces/requestbody/CreateUsuarioBody";
import UsuarioRegisteredResponse from "@/interfaces/responsebody/usuario/UsuarioRegisteredResponse";

export const RegistroUsuarioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const fechaNacimientoMax = new Date();
    fechaNacimientoMax.setFullYear(fechaNacimientoMax.getFullYear() - 18);

    const [usuarioDatos, setUsuarioDatos] = useState<RegistroUsuarioBodySkills>({
        id: "",
        dni: "",
        carnetExtranjeria: "",
        tipoDocumento: undefined,
        nombres: "",
        apellidos: "",
        tipo: "cliente",
        fechaNacimiento: fechaNacimientoMax,
        correo: "",
        clave: "",
        introduccion: "",
        perfilFacebook: "",
        perfilInstagram: "",
        perfilLinkedin: "",
        perfilTiktok: "",
        skills: []
    });

    const setNombres = (nombres: string) => {
        setUsuarioDatos({
            ...usuarioDatos,
            nombres
        });
    };

    const setApellidos = (apellidos: string) => {
        setUsuarioDatos({
            ...usuarioDatos,
            apellidos
        });
    };

    const setDocumento = (documento: string) => {
        switch (usuarioDatos.tipoDocumento) {
            case "dni":
                setUsuarioDatos({
                    ...usuarioDatos,
                    dni: documento
                });

                break;
            case "carnet_extranjeria":
                setUsuarioDatos({
                    ...usuarioDatos,
                    carnetExtranjeria: documento
                });

                break;
        }
    };

    const setTipoDocumento = (tipoDocumento: string) => {
        setUsuarioDatos({
            ...usuarioDatos,
            tipoDocumento: tipoDocumento as TipoDocumento
        })
    };

    const setFechaNacimiento = (fechaNacimiento: string) => {
        const date = new Date(fechaNacimiento);
        const fechaNacimientoWithTimeZone = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

        setUsuarioDatos({
            ...usuarioDatos,
            fechaNacimiento: fechaNacimientoWithTimeZone
        })
    };

    const setTipoRegistro = (tipoRegistro: TipoRegistroUsuario) => {
        setUsuarioDatos({
            ...usuarioDatos,
            tipo: tipoRegistro
        })
    };

    const setCorreo = (correo: string) => {
        setUsuarioDatos({
            ...usuarioDatos,
            correo
        })
    };

    const setClave = (clave: string) => {
        setUsuarioDatos({
            ...usuarioDatos,
            clave
        })
    };

    const setIntroduccion = (introduccion: string) => {
        setUsuarioDatos({
            ...usuarioDatos,
            introduccion
        })
    };

    const setPerfilFacebook = (perfilFacebook: string) => {
        setUsuarioDatos({
            ...usuarioDatos,
            perfilFacebook
        })
    };
    const setPerfilInstagram = (perfilInstagram: string) => {
        setUsuarioDatos({
            ...usuarioDatos,
            perfilInstagram
        })
    };
    const setPerfilLinkedin = (perfilLinkedin: string) => {
        setUsuarioDatos({
            ...usuarioDatos,
            perfilLinkedin
        })
    };
    const setPerfilTiktok = (perfilTiktok: string) => {
        setUsuarioDatos({
            ...usuarioDatos,
            perfilTiktok
        })
    };

    const addSkill = (skill: RegistroSkill) => {
        let skills = [...usuarioDatos.skills]
        skills.push(skill);

        setUsuarioDatos({
            ...usuarioDatos,
            skills
        })
    };

    const removeSkill = (id: string) => {
        let skills = [...usuarioDatos.skills];
        skills.splice(skills.findIndex(s => s.id === id));

        setUsuarioDatos({
            ...usuarioDatos,
            skills
        })
    };

    const validateRegistroUsuario = (): boolean => {
        const documentValidation = (usuarioDatos.tipoDocumento === "dni" && usuarioDatos.dni) ||
            (usuarioDatos.tipoDocumento === "carnet_extranjeria" && usuarioDatos.carnetExtranjeria);

        return !!(usuarioDatos.nombres
            && usuarioDatos.apellidos
            && usuarioDatos.tipoDocumento
            && documentValidation
            && usuarioDatos.fechaNacimiento
            && usuarioDatos.tipo);
    };

    const validateRegistroDatosContacto = (): boolean => {
        return !!(usuarioDatos.correo
            && usuarioDatos.clave
            && usuarioDatos.perfilFacebook
            && usuarioDatos.perfilInstagram
            && usuarioDatos.perfilLinkedin
            && usuarioDatos.perfilTiktok)
    };

    const validateRegistroSkills = (): boolean => {
        return usuarioDatos.skills.length > 0;
    };

    const registrarUsuarioAndSkills = async () => {
        const usuarioBodyRequest: CreateUsuarioBody = {
            dni: usuarioDatos.dni!,
            tipo: usuarioDatos.tipo!,
            tipoDocumento: usuarioDatos.tipoDocumento!,
            nombres: usuarioDatos.nombres!,
            apellidos: usuarioDatos.apellidos!,
            carnetExtranjeria: usuarioDatos.carnetExtranjeria!,
            correo: usuarioDatos.correo!,
            clave: usuarioDatos.clave!,
            fechaNacimiento: usuarioDatos.fechaNacimiento!,
            introduccion: usuarioDatos.introduccion!,
            perfilFacebook: usuarioDatos.perfilFacebook!,
            perfilInstagram: usuarioDatos.perfilInstagram!,
            perfilLinkedin: usuarioDatos.perfilLinkedin!,
            perfilTiktok: usuarioDatos.perfilTiktok!
        };
        const responseUsuarioRegistered = await axios.post(`/api/usuario`, usuarioBodyRequest);

        const { id } = responseUsuarioRegistered.data as UsuarioRegisteredResponse;

        setUsuarioDatos({
            ...usuarioDatos,
            id
        });

        const responseSkillsAsignados = await axios.patch(`api/usuario/skills/${usuarioDatos.id}`, usuarioDatos.skills.map(s => ({
            idSkill: s.id,
            descripcion: s.desempeno,
            nivelConocimiento: s.nivelConocimiento
        })) as AsignacionSkillToUsuarioRequest[]);

        const { skillsAsignados } = responseSkillsAsignados.data as UsuarioSkillsAsignadosResponse;

        return { id, skillsAsignados }
    }

    return (
        <RegistroUsuarioContext.Provider value={{
            usuarioDatos,
            setUsuarioDatos,
            setNombres,
            setApellidos,
            setDocumento,
            setTipoDocumento,
            setFechaNacimiento,
            setTipoRegistro,
            setCorreo,
            setClave,
            setIntroduccion,
            setPerfilFacebook,
            setPerfilInstagram,
            setPerfilLinkedin,
            setPerfilTiktok,
            addSkill,
            removeSkill,
            validateRegistroUsuario,
            validateRegistroDatosContacto,
            validateRegistroSkills,
            registrarUsuarioAndSkills
        }}>
            {children}
        </RegistroUsuarioContext.Provider>
    );
};