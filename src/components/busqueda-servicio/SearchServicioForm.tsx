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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type Props = {
  redirect?: string;
};

const SearchServicioForm = ({ redirect = "servicio" }: Props) => {
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

    router.push(`/${redirect}${searchParams}`);
  };

  const subCategoriasFiltered = subCategorias.filter(
    (s) => s.idCategoria === categoriaSelected
  );
  const skillsFiltered = skills.filter(
    (s) => s.idSubCategoria === subcategoriaSelected
  );

  return (
    <form
      className="p-6 rounded-lg shadow-sm border grid items-baseline justify-items-start gap-2 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 w-full"
      onSubmit={(e) => {
        e.preventDefault();
        buscarServicios();
      }}
    >
      <Input
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
      <Select
        value={categoriaSelected ?? ""}
        onValueChange={(value) => {
          setCategoriaSelected(value || undefined);
          setSubCategoriaSelected(undefined);
          setSkillSelected(undefined);
        }}
      >
        <SelectTrigger className="px-2 justify-self-stretch">
          <SelectValue placeholder="--Categoría--" />
        </SelectTrigger>
        <SelectContent>
          {categorias.map((categoria) => (
            <SelectItem key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={subcategoriaSelected ?? ""}
        onValueChange={(value) => {
          setSubCategoriaSelected(value || undefined);
          setSkillSelected(undefined);
        }}
        disabled={!categoriaSelected}
      >
        <SelectTrigger className="px-2 justify-self-stretch">
          <SelectValue placeholder="--Sub categoría--" />
        </SelectTrigger>
        <SelectContent>
          {subCategoriasFiltered.map((subCategoria) => (
            <SelectItem key={subCategoria.id} value={subCategoria.id}>
              {subCategoria.nombre}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={skillSelected ?? ""}
        onValueChange={(value) => setSkillSelected(value || undefined)}
        disabled={!subcategoriaSelected}
      >
        <SelectTrigger className="px-2 justify-self-stretch">
          <SelectValue placeholder="--Habilidad--" />
        </SelectTrigger>
        <SelectContent>
          {skillsFiltered.map((skill) => (
            <SelectItem key={skill.id} value={skill.id}>
              {skill.descripcion}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        type="submit"
        variant="default"
        className="flex items-center justify-center"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </Button>
    </form>
  );
};

SearchServicioForm.displayName = "SearchServicioForm";

export default SearchServicioForm;
