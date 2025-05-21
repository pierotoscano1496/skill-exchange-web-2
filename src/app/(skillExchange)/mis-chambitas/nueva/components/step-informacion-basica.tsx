"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { ServicioFormData } from "../page";

interface StepInformacionBasicaProps {
  formData: ServicioFormData;
  updateFormData: (data: Partial<ServicioFormData>) => void;
  errors: Record<string, string>;
}

export function StepInformacionBasica({
  formData,
  updateFormData,
  errors,
}: StepInformacionBasicaProps) {
  const [tipoPrecio, setTipoPrecio] = useState<"fijo" | "hora" | "rango">(
    formData.tipoPrecio
  );

  const handleTipoPrecioChange = (value: "fijo" | "hora" | "rango") => {
    setTipoPrecio(value);
    updateFormData({ tipoPrecio: value });
  };

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
        {errors.titulo && (
          <p className="text-sm text-red-500">{errors.titulo}</p>
        )}
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
        {errors.descripcion && (
          <p className="text-sm text-red-500">{errors.descripcion}</p>
        )}
      </div>

      <div className="space-y-3">
        <Label>Tipo de precio</Label>
        <RadioGroup value={tipoPrecio} onValueChange={handleTipoPrecioChange}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="fijo" id="precio-fijo" />
            <Label htmlFor="precio-fijo">Precio fijo</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="hora" id="precio-hora" />
            <Label htmlFor="precio-hora">Precio por hora</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="rango" id="precio-rango" />
            <Label htmlFor="precio-rango">Rango de precios</Label>
          </div>
        </RadioGroup>
      </div>

      {tipoPrecio === "fijo" || tipoPrecio === "hora" ? (
        <div className="space-y-2">
          <Label htmlFor="precio">
            Precio {tipoPrecio === "hora" ? "por hora" : ""}
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
            <Input
              id="precio"
              type="number"
              min="0"
              placeholder="0.00"
              value={formData.precio}
              onChange={(e) => updateFormData({ precio: e.target.value })}
              className={`pl-7 ${errors.precio ? "border-red-500" : ""}`}
            />
          </div>
          {errors.precio && (
            <p className="text-sm text-red-500">{errors.precio}</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="precioMinimo">Precio mínimo</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">
                $
              </span>
              <Input
                id="precioMinimo"
                type="number"
                min="0"
                placeholder="0.00"
                value={formData.precioMinimo || ""}
                onChange={(e) =>
                  updateFormData({ precioMinimo: e.target.value })
                }
                className={`pl-7 ${errors.precioMinimo ? "border-red-500" : ""}`}
              />
            </div>
            {errors.precioMinimo && (
              <p className="text-sm text-red-500">{errors.precioMinimo}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="precioMaximo">Precio máximo</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">
                $
              </span>
              <Input
                id="precioMaximo"
                type="number"
                min="0"
                placeholder="0.00"
                value={formData.precioMaximo || ""}
                onChange={(e) =>
                  updateFormData({ precioMaximo: e.target.value })
                }
                className={`pl-7 ${errors.precioMaximo ? "border-red-500" : ""}`}
              />
            </div>
            {errors.precioMaximo && (
              <p className="text-sm text-red-500">{errors.precioMaximo}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
