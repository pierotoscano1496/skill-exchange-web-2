"use client";

import { useRegistroUsuarioContext } from "@/hooks/useRegistroUsuarioContext";
import Categoria from "@/interfaces/models/Categoria";
import Skill from "@/interfaces/models/Skill";
import SubCategoria from "@/interfaces/models/SubCategoria";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { obtenerCategorias } from "@/actions/categoria.actions";
import { obtenerSubCategoriasByCategoria } from "@/actions/subcategoria.actions";
import { obtenerSkillsBySubCategoria } from "@/actions/skill.action";
import ModalAlert from "@/components/ModalAlert";
import SESelect from "@/components/skill-exchange/form/SESelect";
import SEInput from "@/components/skill-exchange/form/SEInput";
import SETextarea from "@/components/skill-exchange/form/SETextarea";
import SEButton from "@/components/skill-exchange/SEButton";
import SELargeTitle from "@/components/skill-exchange/text/SELargeTitle";
import SEMediumTitle from "@/components/skill-exchange/text/SEMediumTitle";
import SEParragraph from "@/components/skill-exchange/text/SEParragraph";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import SEModalAlert from "@/components/skill-exchange/messaging/SEModalAlert";
import SECard from "@/components/skill-exchange/SECard";

const RegistroUsuarioSkills = () => {
  const {
    usuarioDatos,
    addSkill,
    removeSkill,
    registrarUsuarioAndSkills,
    validateRegistroDatosContacto,
  } = useRegistroUsuarioContext();

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [subCategorias, setSubCategorias] = useState<SubCategoria[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [categoriaSelected, setCategoriaSelected] = useState<string>("");
  const [comentarioDesempeno, setComentarioDesempeno] = useState<string>("");
  const [skillSelected, setSkillSelected] = useState<Skill>();
  const [nivelConocimiento, setNivelConocimiento] = useState<number>(1);
  const [attempSubmit, setAttempSubmit] = useState<boolean>(false);
  const [registrationSuccessfully, setRegistrationSuccessfully] =
    useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const setup = async () => {
      setCategorias(await obtenerCategorias());
    };

    if (!validateRegistroDatosContacto()) {
      router.push("/registro/usuario/redes");
    } else {
      setup();
    }

    return () => {
      setCategorias([]);
      setSubCategorias([]);
      setSkills([]);
      setComentarioDesempeno("");
      setSkillSelected(undefined);
      setNivelConocimiento(1);
      setAttempSubmit(false);
      setRegistrationSuccessfully(false);
    };
  }, []);

  const obtenerSubcategorias = async (idCategoria: string) => {
    setCategoriaSelected(idCategoria);
    setSubCategorias([]);
    setSkills([]);
    if (idCategoria) {
      setSubCategorias(await obtenerSubCategoriasByCategoria(idCategoria));
    }
  };

  const obtenerSkills = async (idSubCategoria: string) => {
    setSkills([]);
    if (idSubCategoria) {
      setSkills(await obtenerSkillsBySubCategoria(idSubCategoria));
    }
  };

  const addSkillToUsuario = () => {
    if (
      skillSelected &&
      nivelConocimiento >= 1 &&
      nivelConocimiento <= 10 &&
      !usuarioDatos.skills.find((s) => s.id === skillSelected.id)
    ) {
      addSkill({
        id: skillSelected!.id,
        descripcion: skillSelected!.descripcion,
        desempeno: comentarioDesempeno,
        nivelConocimiento,
      });

      setAttempSubmit(false);

      // Limpiar entradas
      setCategoriaSelected("");
      setSubCategorias([]);
      setSkills([]);
      setSkillSelected(undefined);
      setNivelConocimiento(1);
      setComentarioDesempeno("");
    } else {
      setAttempSubmit(true);
    }
  };

  const finalizarRegistro = async () => {
    const data = await registrarUsuarioAndSkills();
    if (data) {
      //Abrir Modal alert de éxito
      setRegistrationSuccessfully(true);
      localStorage.removeItem("usuarioDatos");
    }
  };

  const goBack = () => {
    router.push("/registro/usuario/redes");
  };

  return (
    <>
      <div className="flex flex-wrap max-w-5xl mx-auto p-6 bg-white shadow-xl rounded-xl">
        <SELargeTitle className="w-full" label="Registro de habilidades" />
        <div className="w-full md:w-1/2 mb-6 px-2">
          <SESelect
            label="Categoría"
            value={categoriaSelected}
            onChange={(e) => obtenerSubcategorias(e.target.value)}
            name="categoria"
            options={categorias.map((c) => ({
              label: c.nombre,
              value: c.id,
            }))}
          />
        </div>
        <div className="w-full md:w-1/2 mb-6 px-2">
          <SESelect
            label="Subcategoría"
            onChange={(e) => obtenerSkills(e.target.value)}
            name="subcategoria"
            options={subCategorias.map((s) => ({
              label: s.nombre,
              value: s.id,
            }))}
          />
        </div>
        <div className="w-full md:w-1/2 mb-6 px-2">
          <SESelect
            label="Habilidad"
            onChange={(e) =>
              setSkillSelected(skills.find((s) => s.id === e.target.value))
            }
            name="skill"
            options={skills.map((s) => ({
              label: s.descripcion,
              value: s.id,
            }))}
          />
        </div>
        {attempSubmit && !skillSelected && (
          <SEParragraph variant="error">
            Navegue por las categorías y sibcategorías para encontrar la
            habilidad que busca
          </SEParragraph>
        )}
        <div className="w-full md:w-1/2 mb-6 px-2">
          <SEInput
            type="number"
            label="Nivel de conocimiento"
            name="nivel-conocimiento"
            value={nivelConocimiento}
            onChange={(e) => setNivelConocimiento(parseInt(e.target.value))}
            numericProps={{
              max: 10,
              min: 1,
            }}
          />
        </div>
        {attempSubmit && (nivelConocimiento < 1 || nivelConocimiento > 10) && (
          <p className="text-sm text-red-500 mt-1">
            Establezca un nivel entre 1 y 10
          </p>
        )}
        <div className="w-full mb-6 px-2">
          <SETextarea
            name="comment-desempeno"
            placeholder="Comenta cómo te desempeñas"
            label="Introducción"
            value={comentarioDesempeno}
            onChange={(e) => setComentarioDesempeno(e.target.value)}
          />
        </div>
        {attempSubmit &&
          usuarioDatos.skills.find((s) => s.id === skillSelected?.id) && (
            <p className="text-sm text-red-500 mt-1">
              No puede agregar la misma habilidad otra vez
            </p>
          )}
        <div className="w-full mb-6 px-2 flex justify-center">
          <SEButton
            label="Agregar"
            variant="accent"
            onClick={addSkillToUsuario}
            disabled={!skillSelected}
          />
        </div>
      </div>

      <div className="flex flex-col max-w-5xl mx-auto p-6 my-12 bg-white shadow-xl rounded-xl">
        <SEMediumTitle label="Habilidades" />
        <div className="flex flex-wrap w-full mb-6 px-2 justify-center">
          {usuarioDatos.skills.map((s) => (
            <SECard key={s.id} variant="accent">
              {s.descripcion}&nbsp;
              <SEButton
                shape="circle"
                variant="error"
                className="bg-error-700"
                icon={<FontAwesomeIcon icon={faClose} />}
                onClick={() => removeSkill(s.id)}
              />
            </SECard>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <SEButton
          label="Finalizar"
          onClick={finalizarRegistro}
          disabled={usuarioDatos.skills.length === 0}
        />
        <SEButton label="Atrás" onClick={goBack} variant="secondary" />
      </div>

      {registrationSuccessfully && (
        <SEModalAlert onClose={() => router.push("/login")}>
          <p className="text-center">
            Gracias por registrarte a Skill Exchange.
          </p>
          <p className="text-center">
            Te enviamos un correo para validar tu identificación.
          </p>
        </SEModalAlert>
      )}
    </>
  );
};

export default RegistroUsuarioSkills;
