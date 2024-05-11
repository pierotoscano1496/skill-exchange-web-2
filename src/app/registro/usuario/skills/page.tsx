"use client";

import { useRegistroUsuarioContext } from "@/hooks/useRegistroUsuarioContext";
import Categoria from "@/interfaces/models/Categoria";
import Skill from "@/interfaces/models/Skill";
import SubCategoria from "@/interfaces/models/SubCategoria";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import skillItemStyles from "@/app/styles/skillItem.module.scss";
import { obtenerCategorias } from "@/actions/categoria.actions";
import { obtenerSubCategoriasByCategoria } from "@/actions/subcategoria.actions";
import { obtenerSkillsBySubCategoria } from "@/actions/skill.action";
import Image from "next/image";
import Close from "@/app/vectors/times-solid-svgrepo-com.svg";
import ModalAlert from "@/components/ModalAlert";

const RegistroUsuarioSkills = () => {
    const {
        usuarioDatos,
        addSkill,
        removeSkill,
        registrarUsuarioAndSkills,
        validateRegistroDatosContacto
    } = useRegistroUsuarioContext();

    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [subCategorias, setSubCategorias] = useState<SubCategoria[]>([]);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [comentarioDesempeno, setComentarioDesempeno] = useState<string>("");
    const [skillSelected, setSkillSelected] = useState<Skill>();
    const [nivelConocimiento, setNivelConocimiento] = useState<number>(1);
    const [attempSubmit, setAttempSubmit] = useState<boolean>(false);
    const [registrationSuccessfully, setRegistrationSuccessfully] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const setup = async () => {
            setCategorias(await obtenerCategorias());
        }

        if (!validateRegistroDatosContacto()) {
            router.push("/registro/usuario/redes");
        } else {
            setup();
        }

        return (() => {
            setCategorias([]);
            setSubCategorias([]);
            setSkills([]);
            setComentarioDesempeno("");
            setSkillSelected(undefined);
            setNivelConocimiento(1);
            setAttempSubmit(false);
        })
    }, []);

    const obtenerSubcategorias = async (idCategoria: string) => {
        setSubCategorias([]);
        if (idCategoria) {
            setSubCategorias(await obtenerSubCategoriasByCategoria(idCategoria));
        }
    }

    const obtenerSkills = async (idSubCategoria: string) => {
        setSkills([]);
        if (idSubCategoria) {
            setSkills(await obtenerSkillsBySubCategoria(idSubCategoria));
        }
    }

    const addSkillToUsuario = () => {
        if (skillSelected && (nivelConocimiento >= 1 && nivelConocimiento <= 10)) {
            addSkill({
                id: skillSelected!.id,
                descripcion: skillSelected!.descripcion,
                desempeno: comentarioDesempeno,
                nivelConocimiento
            });

            setAttempSubmit(false);
        } else {
            setAttempSubmit(true);
        }
    }

    const finalizarRegistro = async () => {
        const data = await registrarUsuarioAndSkills();
        if (data) {
            //Abrir Modal alert de éxito

        }
    }

    const goBack = () => {
        router.back();
    }

    return (
        <>
            <div>
                <h2>Registro de habilidades</h2>
                <div>
                    <label>Categoría:
                        <select onChange={(e) => obtenerSubcategorias(e.target.value)}>
                            <option disabled>--Seleccione--</option>
                            {categorias.map(c =>
                                <option key={c.id} value={c.id}>{c.nombre}</option>
                            )}
                        </select>
                    </label>
                </div>
                <div>
                    <label>Subcategoría:
                        <select onChange={(e) => obtenerSkills(e.target.value)}>
                            <option disabled>--Seleccione--</option>
                            {subCategorias.map(s =>
                                <option key={s.id} value={s.id}>{s.nombre}</option>
                            )}
                        </select>
                    </label>
                </div>
                <div>
                    <label>Habilidad:
                        <select onChange={(e) => setSkillSelected(skills.find(s => s.id === e.target.value))}>
                            <option disabled>--Seleccione--</option>
                            {skills.map(s =>
                                <option key={s.id} value={s.id}>{s.descripcion}</option>
                            )}
                        </select>
                    </label>
                    {(attempSubmit && !skillSelected) && <p className="text-danger">Navegue por las categorías y sibcategorías para encontrar la habilidad que busca</p>}
                </div>
                <div>
                    <label>Nivel de conocimiento:
                        <input type="number" value={nivelConocimiento} onChange={(e) => setNivelConocimiento(parseInt(e.target.value))} min={1} max={10} />
                    </label>
                    {(attempSubmit && (nivelConocimiento < 1 || nivelConocimiento > 10))
                        && <p className="text-danger">Establezca un nivel entre 1 y 10</p>}
                </div>
                <div>
                    <label>Comenta cómo te desempeñas:
                        <textarea value={comentarioDesempeno} onChange={(e) => setComentarioDesempeno(e.target.value)} />
                    </label>
                    {/* {(attempSubmit && !comentarioDesempeno) && <p className="text-danger">Describanos cómo se desempeña</p>} */}
                </div>
                <button onClick={addSkillToUsuario} disabled={!skillSelected}>Agregar</button>
                <div className={`${skillItemStyles.skillsSelected} container column`}>
                    <h3>Habilidades</h3>
                    <div className={`${skillItemStyles.skillContent} container`}>
                        {
                            usuarioDatos.skills.map(s => (
                                <div key={s.id} className={`${skillItemStyles.skillCard} container`}>
                                    <span className={`${skillItemStyles["texto-primary"]} flex-grow-1`}>{s.descripcion}</span>
                                    <button onClick={() => removeSkill(s.id)} className="btn-close">
                                        <Image src={Close} alt="close" />
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <button onClick={finalizarRegistro}
                    className="btn-primary"
                    disabled={usuarioDatos.skills.length > 0}>Finalizar</button>
                <button onClick={goBack} className="btn-secondary">Atrás</button>
            </div>
            {registrationSuccessfully &&
                <ModalAlert onClose={() => router.push("/login")}>
                    <p>Gracias por registrarte a Skill Exchange.</p>
                    <p>Te enviamos un correo para validar tu identificación.</p>
                </ModalAlert>
            }
        </>

    )
};

export default RegistroUsuarioSkills;