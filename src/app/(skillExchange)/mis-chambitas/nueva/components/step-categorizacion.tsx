"use client";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import type { ServicioFormData } from "../page";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { obtenerCategoriasDetails } from "@/actions/categoria.actions";

interface Categoria {
  id: string;
  nombre: string;
  subCategorias: {
    id: string;
    nombre: string;
    skills: {
      id: string;
      descripcion: string;
    }[];
  }[];
}

interface StepCategorizacionProps {
  formData: ServicioFormData;
  updateFormData: (data: Partial<ServicioFormData>) => void;
  errors: Record<string, string>;
}

export function StepCategorizacion({
  formData,
  updateFormData,
  errors,
}: StepCategorizacionProps) {
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [availableSkills, setAvailableSkills] = useState<
    {
      id: string;
      descripcion: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);

  // Obtener categorías desde el endpoint al montar el componente
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const data = await obtenerCategoriasDetails();
        setCategories(data || []);
      } catch (e) {
        setCategories([]);
      }
      setLoading(false);
    };
    fetchCategories();
  }, []);

  // Obtener habilidades basadas en la subcategoría seleccionada
  useEffect(() => {
    if (formData.categoria && formData.subcategoria && categories.length > 0) {
      const category = categories.find((cat) => cat.id === formData.categoria);
      if (category) {
        const subcategory = category.subCategorias.find(
          (subcat) => subcat.id === formData.subcategoria
        );
        if (subcategory) {
          setAvailableSkills(subcategory.skills);
        }
      }
    } else {
      setAvailableSkills([]);
    }
  }, [formData.categoria, formData.subcategoria, categories]);

  // Manejar cambio de categoría
  const handleCategoriaChange = (value: string) => {
    updateFormData({
      categoria: value,
      subcategoria: "",
      habilidades: [],
    });
  };

  // Manejar cambio de subcategoría
  const handleSubcategoriaChange = (value: string) => {
    updateFormData({
      subcategoria: value,
      habilidades: [],
    });
  };

  // Manejar cambio de habilidades
  const handleHabilidadChange = (skillId: string, checked: boolean) => {
    if (checked) {
      updateFormData({
        habilidades: [...formData.habilidades, skillId],
      });
    } else {
      updateFormData({
        habilidades: formData.habilidades.filter((s) => s !== skillId),
      });
    }
  };

  // Eliminar una habilidad
  const removeHabilidad = (skillId: string) => {
    updateFormData({
      habilidades: formData.habilidades.filter((s) => s !== skillId),
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="categoria">Categoría</Label>
        <Select
          value={formData.categoria}
          onValueChange={handleCategoriaChange}
          disabled={loading}
        >
          <SelectTrigger
            id="categoria"
            className={errors.categoria ? "border-red-500" : ""}
          >
            <SelectValue
              placeholder={loading ? "Cargando..." : "Selecciona una categoría"}
            />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.categoria && (
          <p className="text-sm text-red-500">{errors.categoria}</p>
        )}
      </div>

      {formData.categoria && (
        <div className="space-y-2">
          <Label htmlFor="subcategoria">Subcategoría</Label>
          <Select
            value={formData.subcategoria}
            onValueChange={handleSubcategoriaChange}
            disabled={loading}
          >
            <SelectTrigger
              id="subcategoria"
              className={errors.subcategoria ? "border-red-500" : ""}
            >
              <SelectValue
                placeholder={
                  loading ? "Cargando..." : "Selecciona una subcategoría"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {(
                categories.find((cat) => cat.id === formData.categoria)
                  ?.subCategorias || []
              ).map((subcategory) => (
                <SelectItem key={subcategory.id} value={subcategory.id}>
                  {subcategory.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.subcategoria && (
            <p className="text-sm text-red-500">{errors.subcategoria}</p>
          )}
        </div>
      )}

      {formData.subcategoria && (
        <div className="space-y-2">
          <Label>Habilidades relacionadas</Label>
          <div className="border rounded-md p-4">
            <div className="grid grid-cols-2 gap-2">
              {availableSkills.map((skill) => (
                <div key={skill.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`skill-${skill.id}`}
                    checked={formData.habilidades.includes(skill.id)}
                    onCheckedChange={(checked) =>
                      handleHabilidadChange(skill.id, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`skill-${skill.id}`}
                    className="cursor-pointer"
                  >
                    {skill.descripcion}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          {errors.habilidades && (
            <p className="text-sm text-red-500">{errors.habilidades}</p>
          )}

          {formData.habilidades.length > 0 && (
            <div className="mt-4">
              <Label>Habilidades seleccionadas</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.habilidades.map((skillId) => {
                  const skillObj = availableSkills.find(
                    (s) => s.id === skillId
                  );
                  return (
                    <Badge
                      key={skillId}
                      variant="secondary"
                      className="pl-2 pr-1 py-1"
                    >
                      {skillObj?.descripcion || skillId}
                      <button
                        type="button"
                        onClick={() => removeHabilidad(skillId)}
                        className="ml-1 rounded-full hover:bg-muted-foreground/20 p-1"
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Eliminar</span>
                      </button>
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
