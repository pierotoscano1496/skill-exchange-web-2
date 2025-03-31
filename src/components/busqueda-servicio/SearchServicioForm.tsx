"use client";

import { obtenerCategorias } from "@/actions/categoria.actions";
import {
  obtenerSkills,
  obtenerSkillsBySubCategoria,
} from "@/actions/skill.action";
import {
  obtenerSubCategorias,
  obtenerSubCategoriasByCategoria,
} from "@/actions/subcategoria.actions";
import Categoria from "@/interfaces/models/Categoria";
import Skill from "@/interfaces/models/Skill";
import SubCategoria from "@/interfaces/models/SubCategoria";
import SkillResponse from "@/interfaces/responsebody/skill/SkillResponse";
import SubCategoriaResponse from "@/interfaces/responsebody/subCategoria/SubCategoriaResponse";
import { SelectOptions } from "@/utils/types";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import ReactSelect from "react-select";
import SearchServicioFallback from "./SearchServicioFallback";
import SECard from "../skill-exchange/SECard";
import SESelect from "../skill-exchange/form/SESelect";
import SEButton from "../skill-exchange/SEButton";
import SEInput from "../skill-exchange/form/SEInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import SEForm from "../skill-exchange/form/SEForm";
import SEContainer from "../skill-exchange/containers/SEContainer";
import SEGridContainer from "../skill-exchange/containers/SEGridContainer";

export default () => {
  const [keyWord, setKeyWord] = useState("");
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [subCategorias, setSubCategorias] = useState<SubCategoriaResponse[]>(
    []
  );
  const [skills, setSkills] = useState<SkillResponse[]>([]);
  const [categoriaSelected, setCategoriaSelected] = useState<string>();
  const [subcategoriaSelected, setSubCategoriaSelected] = useState<string>();
  const [skillSelected, setSkillSelected] = useState<string>();
  const router = useRouter();

  useEffect(() => {
    const setup = async () => {
      obtenerCategorias().then((data) => setCategorias(data));
      obtenerSubCategorias().then((data) => setSubCategorias(data));
      obtenerSkills().then((data) => setSkills(data));
    };

    setup();
  }, []);

  const buscarServicios = () => {
    const parameters = [];

    if (keyWord) {
      parameters.push(`keyWord=${keyWord}`);
    }
    if (categoriaSelected) {
      parameters.push(`idCategoria=${categoriaSelected}`);
    }
    if (subcategoriaSelected) {
      parameters.push(`idSubCategoria=${subcategoriaSelected}`);
    }
    if (skillSelected) {
      parameters.push(`idSkill=${skillSelected}`);
    }

    const searchParams =
      parameters.length > 0
        ? "?" + parameters.reduce((prevParam, param) => `${param}&${prevParam}`)
        : "";

    router.push(`/servicio${searchParams}`);
  };

  const subCategoriasFiltered = subCategorias.filter(
    (s) => s.idCategoria === categoriaSelected
  );
  const skillsFiltered = skills.filter(
    (s) => s.idSubCategoria === subcategoriaSelected
  );

  return (
    <SEContainer size="medium">
      <SEForm
        size="full"
        className="p-6 rounded-lg shadow-sm border grid items-baseline justify-items-start lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2"
      >
        <SEInput
          className="px-2 justify-self-stretch"
          name="keyWord"
          type="text"
          value={keyWord}
          onChange={(e) => setKeyWord(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              buscarServicios();
            }
          }}
          placeholder="Palabra clave"
        />
        <SESelect
          className="px-2 justify-self-stretch"
          key={"categoria"}
          initOption={{ label: "--Categoría--", value: "" }}
          options={categorias.map(
            (categoria) =>
              ({
                label: categoria.nombre,
                value: categoria.id,
              }) as SelectOptions
          )}
          value={categoriaSelected}
          onChange={(e) => {
            setCategoriaSelected(
              categorias.find((categoria) => categoria.id === e.target.value)
                ?.id
            );
            setSubCategoriaSelected(undefined);
            setSkillSelected(undefined);
          }}
        />
        <SESelect
          className="px-2 justify-self-stretch"
          key={"subCategoria"}
          initOption={{ label: "--Sub categoría--", value: "" }}
          options={subCategoriasFiltered.map(
            (subCategoria) =>
              ({
                value: subCategoria.id,
                label: subCategoria.nombre,
              }) as SelectOptions
          )}
          value={subcategoriaSelected}
          onChange={(e) => {
            setSubCategoriaSelected(
              subCategoriasFiltered.find(
                (subCategoria) => subCategoria.id === e.target.value
              )?.id
            );
            setSkillSelected(undefined);
          }}
        />
        <SESelect
          className="px-2 justify-self-stretch"
          key={"skill"}
          initOption={{ label: "--Habilidad--", value: "" }}
          options={skillsFiltered.map(
            (skill) =>
              ({
                value: skill.id,
                label: skill.descripcion,
              }) as SelectOptions
          )}
          value={skillSelected}
          onChange={(e) => {
            setSkillSelected(
              skillsFiltered.find((skill) => skill.id === e.target.value)?.id
            );
          }}
        />
        <SEButton
          icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
          variant="primary"
          onClick={buscarServicios}
        />
      </SEForm>
    </SEContainer>
  );
};
