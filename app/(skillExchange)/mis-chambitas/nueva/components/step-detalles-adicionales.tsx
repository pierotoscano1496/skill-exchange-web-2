"use client"
import { Label } from "@/components/ui/label"
import type React from "react"

import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import type { ServicioFormData } from "../page"
import { Camera, X } from "lucide-react"
import { useRef } from "react"
import { ServicioDia, ServicioModalidad } from "@/lib/constants/enums"

interface StepDetallesAdicionalesProps {
  formData: ServicioFormData
  updateFormData: (data: Partial<ServicioFormData>) => void
  errors: Record<string, string>
}

export function StepDetallesAdicionales({ formData, updateFormData, errors }: StepDetallesAdicionalesProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const diasSemana = [
    { id: ServicioDia.LUNES, label: "Lunes" },
    { id: ServicioDia.MARTES, label: "Martes" },
    { id: ServicioDia.MIERCOLES, label: "Miércoles" },
    { id: ServicioDia.JUEVES, label: "Jueves" },
    { id: ServicioDia.VIERNES, label: "Viernes" },
    { id: ServicioDia.SABADO, label: "Sábado" },
    { id: ServicioDia.DOMINGO, label: "Domingo" },
  ]

  // Manejar cambio en los días de disponibilidad
  const handleDiaChange = (dia: ServicioDia, checked: boolean) => {
    if (checked) {
      updateFormData({
        disponibilidad: {
          ...formData.disponibilidad,
          dias: [...formData.disponibilidad.dias, dia],
        },
      })
    } else {
      updateFormData({
        disponibilidad: {
          ...formData.disponibilidad,
          dias: formData.disponibilidad.dias.filter((d) => d !== dia),
        },
      })
    }
  }

  // Manejar cambio en las horas de disponibilidad
  const handleHoraChange = (tipo: "inicio" | "fin", value: string) => {
    updateFormData({
      disponibilidad: {
        ...formData.disponibilidad,
        [tipo === "inicio" ? "horaInicio" : "horaFin"]: value,
      },
    })
  }

  // Manejar selección de archivos
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImages = Array.from(files)
      updateFormData({
        imagenes: [...formData.imagenes, ...newImages],
      })
    }
  }

  // Abrir selector de archivos
  const handleAddImage = () => {
    fileInputRef.current?.click()
  }

  // Eliminar una imagen
  const handleRemoveImage = (index: number) => {
    const newImages = [...formData.imagenes]
    newImages.splice(index, 1)
    updateFormData({
      imagenes: newImages,
    })
  }

  // Obtener URL para mostrar la imagen
  const getImageUrl = (imagen: File | string): string => {
    if (imagen instanceof File) {
      return URL.createObjectURL(imagen)
    }
    return imagen
  }

  // Obtener nombre del archivo
  const getImageName = (imagen: File | string): string => {
    if (imagen instanceof File) {
      return imagen.name
    }
    return "Imagen"
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Disponibilidad</Label>
        <div className="space-y-4">
          <div>
            <Label className="text-sm text-muted-foreground mb-2 block">Días de la semana</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {diasSemana.map((dia) => (
                <div key={dia.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`dia-${dia.id}`}
                    checked={formData.disponibilidad.dias.includes(dia.id)}
                    onCheckedChange={(checked) => handleDiaChange(dia.id, checked as boolean)}
                  />
                  <Label htmlFor={`dia-${dia.id}`} className="cursor-pointer">
                    {dia.label}
                  </Label>
                </div>
              ))}
            </div>
            {errors.dias && <p className="text-sm text-red-500 mt-1">{errors.dias}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hora-inicio">Hora de inicio</Label>
              <Input
                id="hora-inicio"
                type="time"
                value={formData.disponibilidad.horaInicio}
                onChange={(e) => handleHoraChange("inicio", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hora-fin">Hora de fin</Label>
              <Input
                id="hora-fin"
                type="time"
                value={formData.disponibilidad.horaFin}
                onChange={(e) => handleHoraChange("fin", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="ubicacion">Ubicación</Label>
        <Input
          id="ubicacion"
          placeholder="Ej. San Isidro, Lima"
          value={formData.ubicacion}
          onChange={(e) => updateFormData({ ubicacion: e.target.value })}
          className={errors.ubicacion ? "border-red-500" : ""}
        />
        {errors.ubicacion && <p className="text-sm text-red-500">{errors.ubicacion}</p>}
      </div>

      <div className="space-y-2">
        <Label>Modalidad del servicio</Label>
        <RadioGroup
          value={formData.modalidad}
          onValueChange={(value: ServicioModalidad) => updateFormData({ modalidad: value })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={ServicioModalidad.PRESENCIAL} id="modalidad-presencial" />
            <Label htmlFor="modalidad-presencial">Presencial</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={ServicioModalidad.REMOTO} id="modalidad-remoto" />
            <Label htmlFor="modalidad-remoto">Remoto</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={ServicioModalidad.MIXTO} id="modalidad-mixto" />
            <Label htmlFor="modalidad-mixto">Mixto (Presencial y remoto)</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label>Imágenes del servicio</Label>
          <Button type="button" variant="outline" size="sm" onClick={handleAddImage}>
            <Camera className="mr-2 h-4 w-4" />
            Agregar imagen
          </Button>
        </div>

        {/* Input oculto para seleccionar archivos */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
          {formData.imagenes.map((imagen, index) => (
            <div key={index} className="relative group">
              <img
                src={getImageUrl(imagen) || "/placeholder.svg"}
                alt={getImageName(imagen)}
                className="w-full h-40 object-cover rounded-md border"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Eliminar</span>
              </button>
              {imagen instanceof File && (
                <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {imagen.name}
                </div>
              )}
            </div>
          ))}
        </div>
        {errors.imagenes && <p className="text-sm text-red-500">{errors.imagenes}</p>}
      </div>
    </div>
  )
}
