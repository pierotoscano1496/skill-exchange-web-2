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

// Datos de ejemplo para categorías y subcategorías
const categories = [
  {
    id: "tech",
    name: "Tecnología",
    subcategories: [
      {
        id: "programming",
        name: "Programación",
        skills: [
          "JavaScript",
          "Python",
          "Java",
          "React",
          "Angular",
          "Node.js",
          "PHP",
        ],
      },
      {
        id: "design",
        name: "Diseño",
        skills: [
          "Photoshop",
          "Illustrator",
          "Figma",
          "UI/UX",
          "Diseño web",
          "Diseño gráfico",
        ],
      },
      {
        id: "hardware",
        name: "Hardware",
        skills: [
          "Reparación de PC",
          "Reparación de celulares",
          "Instalación de redes",
          "Soporte técnico",
        ],
      },
    ],
  },
  {
    id: "home",
    name: "Hogar",
    subcategories: [
      {
        id: "cleaning",
        name: "Limpieza",
        skills: [
          "Limpieza general",
          "Limpieza profunda",
          "Lavado de alfombras",
          "Limpieza de vidrios",
        ],
      },
      {
        id: "gardening",
        name: "Jardinería",
        skills: [
          "Mantenimiento de jardines",
          "Poda de árboles",
          "Diseño de jardines",
          "Fumigación",
        ],
      },
      {
        id: "repairs",
        name: "Reparaciones",
        skills: [
          "Plomería",
          "Electricidad",
          "Carpintería",
          "Pintura",
          "Albañilería",
        ],
      },
    ],
  },
  {
    id: "education",
    name: "Educación",
    subcategories: [
      {
        id: "languages",
        name: "Idiomas",
        skills: [
          "Inglés",
          "Español",
          "Francés",
          "Alemán",
          "Portugués",
          "Italiano",
          "Chino",
        ],
      },
      {
        id: "tutoring",
        name: "Tutoría",
        skills: [
          "Matemáticas",
          "Física",
          "Química",
          "Biología",
          "Historia",
          "Literatura",
        ],
      },
      {
        id: "arts",
        name: "Artes",
        skills: ["Música", "Pintura", "Danza", "Teatro", "Fotografía", "Canto"],
      },
    ],
  },
];

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
  const [availableSkills, setAvailableSkills] = useState<string[]>([]);

  // Obtener subcategorías basadas en la categoría seleccionada
  const getSubcategories = () => {
    const category = categories.find((cat) => cat.id === formData.categoria);
    return category ? category.subcategories : [];
  };

  // Obtener habilidades basadas en la subcategoría seleccionada
  useEffect(() => {
    if (formData.categoria && formData.subcategoria) {
      const category = categories.find((cat) => cat.id === formData.categoria);
      if (category) {
        const subcategory = category.subcategories.find(
          (subcat) => subcat.id === formData.subcategoria
        );
        if (subcategory) {
          setAvailableSkills(subcategory.skills);
        }
      }
    } else {
      setAvailableSkills([]);
    }
  }, [formData.categoria, formData.subcategoria]);

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
  const handleHabilidadChange = (skill: string, checked: boolean) => {
    if (checked) {
      updateFormData({
        habilidades: [...formData.habilidades, skill],
      });
    } else {
      updateFormData({
        habilidades: formData.habilidades.filter((s) => s !== skill),
      });
    }
  };

  // Eliminar una habilidad
  const removeHabilidad = (skill: string) => {
    updateFormData({
      habilidades: formData.habilidades.filter((s) => s !== skill),
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="categoria">Categoría</Label>
        <Select
          value={formData.categoria}
          onValueChange={handleCategoriaChange}
        >
          <SelectTrigger
            id="categoria"
            className={errors.categoria ? "border-red-500" : ""}
          >
            <SelectValue placeholder="Selecciona una categoría" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
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
          >
            <SelectTrigger
              id="subcategoria"
              className={errors.subcategoria ? "border-red-500" : ""}
            >
              <SelectValue placeholder="Selecciona una subcategoría" />
            </SelectTrigger>
            <SelectContent>
              {getSubcategories().map((subcategory) => (
                <SelectItem key={subcategory.id} value={subcategory.id}>
                  {subcategory.name}
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
                <div key={skill} className="flex items-center space-x-2">
                  <Checkbox
                    id={`skill-${skill}`}
                    checked={formData.habilidades.includes(skill)}
                    onCheckedChange={(checked) =>
                      handleHabilidadChange(skill, checked as boolean)
                    }
                  />
                  <Label htmlFor={`skill-${skill}`} className="cursor-pointer">
                    {skill}
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
                {formData.habilidades.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="pl-2 pr-1 py-1"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeHabilidad(skill)}
                      className="ml-1 rounded-full hover:bg-muted-foreground/20 p-1"
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Eliminar</span>
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
