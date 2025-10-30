"use client";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import type { ServicioFormData } from "../page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PlusCircle, X } from "lucide-react";
import type { SkillInfo } from "@/lib/types/api-responses";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getOwnSkillsInfo } from "@/lib/actions/data";

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
  const [availableSkills, setAvailableSkills] = useState<SkillInfo[]>([]);
  const [loadingSkills, setLoadingSkills] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Cargar skills del usuario
  useEffect(() => {
    const cargarSkills = async () => {
      setLoadingSkills(true);
      try {
        const response = await getOwnSkillsInfo();
        if (response.success) {
          setAvailableSkills(response.data);
        } else {
          setAvailableSkills([]);
          console.error("Error al cargar skills:", response.message);
        }
      } catch (error) {
        console.error("Error al cargar skills:", error);
        setAvailableSkills([]);
      } finally {
        setLoadingSkills(false);
      }
    };
    cargarSkills();
  }, []);

  // Manejar selección de habilidad
  const handleSelectSkill = (skill: SkillInfo) => {
    if (!formData.habilidades.some((s) => s.id === skill.id)) {
      updateFormData({
        habilidades: [
          ...formData.habilidades,
          {
            id: skill.id,
            nombre: skill.descripcion,
            nombreCategoria: skill.nombreCategoria,
            nombreSubCategoria: skill.nombreSubCategoria,
          },
        ],
      });
    }
    setIsPopoverOpen(false);
  };

  // Eliminar una habilidad
  const removeHabilidad = (skillId: string) => {
    updateFormData({
      habilidades: formData.habilidades.filter((s) => s.id !== skillId),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Habilidades del Servicio</CardTitle>
        <CardDescription>
          Busca y selecciona las habilidades que ofreces en este servicio. Estas
          son las habilidades que ya tienes registradas en tu perfil.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loadingSkills ? (
          <Skeleton className="h-10 w-full" />
        ) : (
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <PlusCircle className="mr-2 h-4 w-4" /> Añadir habilidad
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
              <Command>
                <CommandInput placeholder="Buscar habilidad..." />
                <CommandList>
                  <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                  <CommandGroup>
                    {availableSkills.map((skill) => (
                      <CommandItem
                        key={skill.id}
                        value={`${skill.descripcion} ${skill.nombreCategoria} ${skill.nombreSubCategoria}`}
                        onSelect={() => handleSelectSkill(skill)}
                        disabled={formData.habilidades.some(
                          (s) => s.id === skill.id
                        )}
                        className="flex flex-col items-start"
                      >
                        <span className="font-medium">{skill.descripcion}</span>
                        <span className="text-xs text-muted-foreground">
                          {skill.nombreCategoria} &gt;{" "}
                          {skill.nombreSubCategoria}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}
        {errors.habilidades && (
          <p className="text-sm text-red-500 mt-2">{errors.habilidades}</p>
        )}

        {formData.habilidades.length > 0 && (
          <div className="mt-6">
            <Label className="font-semibold">Habilidades seleccionadas</Label>
            <div className="flex flex-wrap gap-2 mt-2 p-3 bg-muted/50 rounded-lg">
              {formData.habilidades.map((skill) => (
                <Badge
                  key={skill.id}
                  variant="secondary"
                  className="pl-2 pr-1 py-1 text-sm"
                >
                  {skill.nombre}
                  <button
                    type="button"
                    onClick={() => removeHabilidad(skill.id)}
                    className="ml-2 rounded-full hover:bg-background/50 p-0.5"
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Eliminar {skill.nombre}</span>
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
