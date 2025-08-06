"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Check,
  ChevronsUpDown,
  Loader2,
  PlusCircle,
  Trash2,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getSkillsInfo } from "@/lib/actions/data";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { SkillInfo } from "@/lib/types/api-responses";

interface UserSkill {
  id: string;
  nombre: string;
  categoria: string;
  subcategoria: string;
  nivelConocimiento: number;
  descripcion: string;
}

interface SearchableSkill {
  id: string;
  descripcion: string;
  idSubCategoria: string;
}

export default function RegisterStep4Page() {
  const router = useRouter();
  const [selectedSkills, setSelectedSkills] = useState<UserSkill[]>([]);
  const [allSkills, setAllSkills] = useState<SkillInfo[]>([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    const fetchAndProcessSkills = async () => {
      const response = await getSkillsInfo();
      if (response.success) {
        /* setAllSkills(
          response.data.map((skill) => ({
            id: skill.id,
            descripcion: skill.descripcion || "",
            idSubCategoria: skill.idSubCategoria,
          }))
        ); */
        setAllSkills(response.data);
      }
    };
    fetchAndProcessSkills();
  }, []);

  const handleSelectSkill = (skill: SkillInfo) => {
    if (!selectedSkills.some((s) => s.id === skill.id)) {
      setSelectedSkills([
        ...selectedSkills,
        {
          id: skill.id,
          nombre: skill.descripcion,
          categoria: skill.nombreCategoria,
          subcategoria: skill.nombreSubCategoria,
          nivelConocimiento: 5, // Default value
          descripcion: "",
        },
      ]);
    }
    setIsPopoverOpen(false);
  };

  const handleUpdateSkill = (
    index: number,
    field: keyof UserSkill,
    value: any
  ) => {
    const newSkills = [...selectedSkills];
    (newSkills[index] as any)[field] = value;
    setSelectedSkills(newSkills);
  };

  const removeSkill = (index: number) => {
    const newSkills = selectedSkills.filter((_, i) => i !== index);
    setSelectedSkills(newSkills);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (selectedSkills.length === 0) {
      newErrors.skills = "Debes añadir al menos una habilidad.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setApiError(null);

    try {
      const savedData = localStorage.getItem("registrationData");
      if (!savedData) {
        throw new Error("No se encontraron datos de registro.");
      }

      const registrationData = JSON.parse(savedData);

      const requestData: RegisterUserRequest = {
        ...registrationData,
        skills: selectedSkills.map((s) => ({
          idSkill: s.id,
          nivelConocimiento: s.nivelConocimiento,
          descripcion: s.descripcion,
        })),
      };

      const response = await userService.registerUser(requestData);

      if (response.success) {
        setSuccess(true);
        localStorage.removeItem("registrationData");
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        setApiError(response.message || "Ocurrió un error desconocido.");
      }
    } catch (error) {
      setApiError(
        error instanceof Error ? error.message : "Ocurrió un error inesperado."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push("/register/step-3");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                4
              </div>
              <CardTitle>Habilidades</CardTitle>
            </div>
            <div className="text-sm text-muted-foreground">Paso 4 de 4</div>
          </div>
          <CardDescription>
            Busca y añade tus habilidades para que otros usuarios puedan
            encontrarte.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {success ? (
            <Alert variant="default">
              <Check className="h-4 w-4" />
              <AlertTitle>¡Registro completado!</AlertTitle>
              <AlertDescription>
                Tu cuenta ha sido creada exitosamente. Serás redirigido al
                inicio de sesión en unos segundos.
              </AlertDescription>
            </Alert>
          ) : (
            <>
              {apiError && (
                <Alert variant="destructive">
                  <AlertTitle>Error en el registro</AlertTitle>
                  <AlertDescription>{apiError}</AlertDescription>
                </Alert>
              )}

              <div className="pt-4 space-y-4">
                {errors.skills && (
                  <p className="text-sm text-red-500">{errors.skills}</p>
                )}

                <div className="space-y-4">
                  {selectedSkills.map((skill, index) => (
                    <div
                      key={skill.id}
                      className="p-4 border rounded-md space-y-4 relative"
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => removeSkill(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <div className="flex flex-col gap-1">
                        <h4 className="font-semibold">{skill.nombre}</h4>
                        <div className="flex gap-1.5 flex-wrap">
                          <Badge variant="secondary">{skill.categoria}</Badge>
                          <Badge variant="secondary">
                            {skill.subcategoria}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>
                            Nivel de Conocimiento:{" "}
                            <span className="font-bold">
                              {skill.nivelConocimiento}
                            </span>
                          </Label>
                          <Slider
                            value={[skill.nivelConocimiento]}
                            min={0}
                            max={10}
                            step={1}
                            onValueChange={(value) =>
                              handleUpdateSkill(
                                index,
                                "nivelConocimiento",
                                value[0]
                              )
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Descripción (opcional)</Label>
                          <Textarea
                            placeholder="Describe tu experiencia con esta habilidad"
                            value={skill.descripcion}
                            onChange={(e) =>
                              handleUpdateSkill(
                                index,
                                "descripcion",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

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
                        <CommandEmpty>
                          No se encontraron resultados.
                        </CommandEmpty>
                        <CommandGroup>
                          {allSkills.map((skill) => (
                            <CommandItem
                              key={skill.id}
                              value={`${skill.descripcion} ${skill.nombreCategoria} ${skill.nombreSubCategoria}`}
                              onSelect={() => handleSelectSkill(skill)}
                              disabled={selectedSkills.some(
                                (s) => s.id === skill.id
                              )}
                              className="flex flex-col items-start"
                            >
                              <span className="font-medium">
                                {skill.descripcion}
                              </span>
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
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={isLoading || success}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Atrás
          </Button>
          <Button onClick={handleRegister} disabled={isLoading || success}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Finalizar registro"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
