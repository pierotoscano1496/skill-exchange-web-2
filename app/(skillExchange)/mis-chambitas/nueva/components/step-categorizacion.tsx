"use client"

import { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import type { ServicioFormData } from "../page"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { dataService } from "@/lib/services/data-service"
import type { Categoria, Skill } from "@/lib/types/api-responses"

interface StepCategorizacionProps {
  formData: ServicioFormData
  updateFormData: (data: Partial<ServicioFormData>) => void
  errors: Record<string, string>
}

export function StepCategorizacion({ formData, updateFormData, errors }: StepCategorizacionProps) {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [availableSkills, setAvailableSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingSkills, setLoadingSkills] = useState(false)

  // Cargar categorías al montar el componente
  useEffect(() => {
    const cargarCategorias = async () => {
      setLoading(true)
      try {
        const response = await dataService.getCategorias()
        if (response.success) {
          setCategorias(response.data)
        } else {
          console.error("Error al cargar categorías:", response.message)
        }
      } catch (error) {
        console.error("Error al cargar categorías:", error)
      } finally {
        setLoading(false)
      }
    }

    cargarCategorias()
  }, [])

  // Cargar skills cuando cambia la subcategoría
  useEffect(() => {
    const cargarSkills = async () => {
      if (!formData.subcategoria) {
        setAvailableSkills([])
        return
      }

      setLoadingSkills(true)
      try {
        const skills = await dataService.getSkillsByCategoria(formData.subcategoria)
        setAvailableSkills(skills)
      } catch (error) {
        console.error("Error al cargar skills:", error)
        setAvailableSkills([])
      } finally {
        setLoadingSkills(false)
      }
    }

    cargarSkills()
  }, [formData.subcategoria])

  // Obtener subcategorías basadas en la categoría seleccionada
  const getSubcategorias = () => {
    const categoria = categorias.find((cat) => cat.id === formData.categoria)
    return categoria ? categoria.subcategorias : []
  }

  // Manejar cambio de categoría
  const handleCategoriaChange = (value: string) => {
    updateFormData({
      categoria: value,
      subcategoria: "",
      habilidades: [],
    })
  }

  // Manejar cambio de subcategoría
  const handleSubcategoriaChange = (value: string) => {
    updateFormData({
      subcategoria: value,
      habilidades: [],
    })
  }

  // Manejar cambio de habilidades
  const handleHabilidadChange = (skill: { id: string; nombre: string }, checked: boolean) => {
    if (checked) {
      updateFormData({
        habilidades: [...formData.habilidades, skill],
      })
    } else {
      updateFormData({
        habilidades: formData.habilidades.filter((s) => s.id !== skill.id),
      })
    }
  }

  // Eliminar una habilidad
  const removeHabilidad = (skillId: string) => {
    updateFormData({
      habilidades: formData.habilidades.filter((s) => s.id !== skillId),
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="categoria">Categoría</Label>
        <Select value={formData.categoria} onValueChange={handleCategoriaChange} disabled={loading}>
          <SelectTrigger id="categoria" className={errors.categoria ? "border-red-500" : ""}>
            <SelectValue placeholder={loading ? "Cargando categorías..." : "Selecciona una categoría"} />
          </SelectTrigger>
          <SelectContent>
            {categorias.map((categoria) => (
              <SelectItem key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.categoria && <p className="text-sm text-red-500">{errors.categoria}</p>}
      </div>

      {formData.categoria && (
        <div className="space-y-2">
          <Label htmlFor="subcategoria">Subcategoría</Label>
          <Select value={formData.subcategoria} onValueChange={handleSubcategoriaChange}>
            <SelectTrigger id="subcategoria" className={errors.subcategoria ? "border-red-500" : ""}>
              <SelectValue placeholder="Selecciona una subcategoría" />
            </SelectTrigger>
            <SelectContent>
              {getSubcategorias().map((subcategoria) => (
                <SelectItem key={subcategoria.id} value={subcategoria.id}>
                  {subcategoria.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.subcategoria && <p className="text-sm text-red-500">{errors.subcategoria}</p>}
        </div>
      )}

      {formData.subcategoria && (
        <div className="space-y-2">
          <Label>Habilidades relacionadas</Label>
          {loadingSkills ? (
            <div className="border rounded-md p-4">
              <p className="text-sm text-muted-foreground">Cargando habilidades...</p>
            </div>
          ) : availableSkills.length > 0 ? (
            <div className="border rounded-md p-4">
              <div className="grid grid-cols-2 gap-2">
                {availableSkills.map((skill) => (
                  <div key={skill.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`skill-${skill.id}`}
                      checked={formData.habilidades.some((h) => h.id === skill.id)}
                      onCheckedChange={(checked) => handleHabilidadChange(skill, checked as boolean)}
                    />
                    <Label htmlFor={`skill-${skill.id}`} className="cursor-pointer">
                      {skill.nombre}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="border rounded-md p-4">
              <p className="text-sm text-muted-foreground">No hay habilidades disponibles para esta subcategoría</p>
            </div>
          )}
          {errors.habilidades && <p className="text-sm text-red-500">{errors.habilidades}</p>}

          {formData.habilidades.length > 0 && (
            <div className="mt-4">
              <Label>Habilidades seleccionadas</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.habilidades.map((skill) => (
                  <Badge key={skill.id} variant="secondary" className="pl-2 pr-1 py-1">
                    {skill.nombre}
                    <button
                      type="button"
                      onClick={() => removeHabilidad(skill.id)}
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
  )
}
