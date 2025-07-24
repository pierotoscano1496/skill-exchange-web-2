"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { ServicioFormData } from "../page"
import { ServicioTipoPrecio } from "@/lib/constants/enums"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StepInformacionBasicaProps {
  formData: ServicioFormData
  updateFormData: (data: Partial<ServicioFormData>) => void
  errors: Record<string, string>
}

export function StepInformacionBasica({ formData, updateFormData, errors }: StepInformacionBasicaProps) {
  const handleTipoPrecioChange = (value: ServicioTipoPrecio) => {
    updateFormData({ tipoPrecio: value })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="titulo">Título del servicio</Label>
        <Input
          id="titulo"
          placeholder="Ej. Reparación de computadoras a domicilio"
          value={formData.titulo}
          onChange={(e) => updateFormData({ titulo: e.target.value })}
          className={errors.titulo ? "border-red-500" : ""}
        />
        {errors.titulo && <p className="text-sm text-red-500">{errors.titulo}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="descripcion">Descripción detallada</Label>
        <Textarea
          id="descripcion"
          placeholder="Describe detalladamente el servicio que ofreces, incluyendo lo que incluye, beneficios, etc."
          value={formData.descripcion}
          onChange={(e) => updateFormData({ descripcion: e.target.value })}
          className={errors.descripcion ? "border-red-500" : ""}
          rows={5}
        />
        {errors.descripcion && <p className="text-sm text-red-500">{errors.descripcion}</p>}
      </div>

      <div className="space-y-3">
        <Label>Tipo de precio</Label>
        <p className="text-sm text-muted-foreground">Selecciona cómo cobrarás por tu servicio.</p>
        <RadioGroup
          value={formData.tipoPrecio}
          onValueChange={handleTipoPrecioChange}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Label htmlFor="precio-fijo" className="cursor-pointer">
            <Card className={cn("p-4", formData.tipoPrecio === ServicioTipoPrecio.FIJO && "border-primary")}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={ServicioTipoPrecio.FIJO} id="precio-fijo" />
                <div className="space-y-1">
                  <p className="font-semibold">Precio Fijo</p>
                  <p className="text-xs text-muted-foreground">Un único precio por todo el servicio.</p>
                </div>
              </div>
            </Card>
          </Label>

          <Label htmlFor="precio-hora" className="cursor-pointer">
            <Card className={cn("p-4", formData.tipoPrecio === ServicioTipoPrecio.HORA && "border-primary")}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={ServicioTipoPrecio.HORA} id="precio-hora" />
                <div className="space-y-1">
                  <p className="font-semibold">Precio por Hora</p>
                  <p className="text-xs text-muted-foreground">Cobras por cada hora de trabajo.</p>
                </div>
              </div>
            </Card>
          </Label>

          <Label htmlFor="precio-rango" className="cursor-pointer">
            <Card className={cn("p-4", formData.tipoPrecio === ServicioTipoPrecio.RANGO && "border-primary")}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={ServicioTipoPrecio.RANGO} id="precio-rango" />
                <div className="space-y-1">
                  <p className="font-semibold">Rango de Precios</p>
                  <p className="text-xs text-muted-foreground">Define un precio mínimo y máximo.</p>
                </div>
              </div>
            </Card>
          </Label>
        </RadioGroup>
      </div>

      {(formData.tipoPrecio === ServicioTipoPrecio.FIJO || formData.tipoPrecio === ServicioTipoPrecio.HORA) && (
        <div className="space-y-2">
          <Label htmlFor="precio">Precio {formData.tipoPrecio === ServicioTipoPrecio.HORA ? "por hora" : ""}</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">S/</span>
            <Input
              id="precio"
              type="number"
              min="0"
              placeholder="0.00"
              value={formData.precio}
              onChange={(e) => updateFormData({ precio: e.target.value })}
              className={`pl-8 ${errors.precio ? "border-red-500" : ""}`}
            />
          </div>
          {errors.precio && <p className="text-sm text-red-500">{errors.precio}</p>}
        </div>
      )}

      {formData.tipoPrecio === ServicioTipoPrecio.RANGO && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="precioMinimo">Precio mínimo</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">S/</span>
              <Input
                id="precioMinimo"
                type="number"
                min="0"
                placeholder="0.00"
                value={formData.precioMinimo || ""}
                onChange={(e) => updateFormData({ precioMinimo: e.target.value })}
                className={`pl-8 ${errors.precioMinimo ? "border-red-500" : ""}`}
              />
            </div>
            {errors.precioMinimo && <p className="text-sm text-red-500">{errors.precioMinimo}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="precioMaximo">Precio máximo</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">S/</span>
              <Input
                id="precioMaximo"
                type="number"
                min="0"
                placeholder="0.00"
                value={formData.precioMaximo || ""}
                onChange={(e) => updateFormData({ precioMaximo: e.target.value })}
                className={`pl-8 ${errors.precioMaximo ? "border-red-500" : ""}`}
              />
            </div>
            {errors.precioMaximo && <p className="text-sm text-red-500">{errors.precioMaximo}</p>}
          </div>
        </div>
      )}
    </div>
  )
}
