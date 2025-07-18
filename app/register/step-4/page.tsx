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
import { ArrowLeft, Check, Loader2, PlusCircle, Trash2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { userService, RegisterUserRequest } from "@/lib/services/user-service";
import { dataService } from "@/lib/services/data-service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Skill, Categoria, Subcategoria } from "@/lib/types/api-responses";

interface UserSkill {
  idSkill: string;
  nivelConocimiento: number;
  descripcion: string;
}

interface SkillSelection {
  idCategoria: string;
  idSubcategoria: string;
  idSkill: string;
  nivelConocimiento: number;
  descripcion: string;
}

export default function RegisterStep4Page() {
  const router = useRouter();
  const [skillSelections, setSkillSelections] = useState<SkillSelection[]>([
    {
      idCategoria: "",
      idSubcategoria: "",
      idSkill: "",
      nivelConocimiento: 0,
      descripcion: "",
    },
  ]);

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [subcategorias, setSubcategorias] = useState<Subcategoria[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategorias = async () => {
      const response = await dataService.getCategorias();
      if (response.success) {
        setCategorias(response.data);
      }
    };
    fetchCategorias();
  }, []);

  const handleCategoriaChange = async (index: number, idCategoria: string) => {
    const newSelections = [...skillSelections];
    newSelections[index] = {
      ...newSelections[index],
      idCategoria,
      idSubcategoria: "",
      idSkill: "",
    };
    setSkillSelections(newSelections);
    const response = await dataService.getSubCategoriasByCategoria(idCategoria);
    if (response.success) {
      setSubcategorias(response.data);
    } else {
      setSubcategorias([]);
    }
    setSkills([]);
  };

  const handleSubcategoriaChange = async (
    index: number,
    idSubcategoria: string
  ) => {
    const newSelections = [...skillSelections];
    newSelections[index] = {
      ...newSelections[index],
      idSubcategoria,
      idSkill: "",
    };
    setSkillSelections(newSelections);
    const response = await dataService.getSkillsBySubCategoria(idSubcategoria);
    if (response.success) {
      setSkills(response.data);
    } else {
      setSkills([]);
    }
  };

  const handleSkillChange = (
    index: number,
    field: keyof SkillSelection,
    value: any
  ) => {
    const newSelections = [...skillSelections];
    newSelections[index] = { ...newSelections[index], [field]: value };
    setSkillSelections(newSelections);
  };

  const addSkill = () => {
    setSkillSelections([
      ...skillSelections,
      {
        idCategoria: "",
        idSubcategoria: "",
        idSkill: "",
        nivelConocimiento: 0,
        descripcion: "",
      },
    ]);
  };

  const removeSkill = (index: number) => {
    const newSkills = skillSelections.filter((_, i) => i !== index);
    setSkillSelections(newSkills);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (skillSelections.some((s) => !s.idSkill)) {
      newErrors.skills = "Debes seleccionar una habilidad para cada entrada.";
    }
    if (skillSelections.length === 0) {
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
        skills: skillSelections.map((s) => ({
          idSkill: s.idSkill,
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
            Añade tus habilidades para que otros usuarios puedan encontrarte.
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

                {skillSelections.map((selection, index) => (
                  <div
                    key={index}
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Categoría</Label>
                        <Select
                          onValueChange={(value) =>
                            handleCategoriaChange(index, value)
                          }
                          value={selection.idCategoria}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una categoría" />
                          </SelectTrigger>
                          <SelectContent>
                            {categorias.map((c) => (
                              <SelectItem key={c.id} value={c.id}>
                                {c.nombre}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Subcategoría</Label>
                        <Select
                          onValueChange={(value) =>
                            handleSubcategoriaChange(index, value)
                          }
                          value={selection.idSubcategoria}
                          disabled={!selection.idCategoria}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una subcategoría" />
                          </SelectTrigger>
                          <SelectContent>
                            {subcategorias.map((s) => (
                              <SelectItem key={s.id} value={s.id}>
                                {s.nombre}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Habilidad</Label>
                        <Select
                          onValueChange={(value) =>
                            handleSkillChange(index, "idSkill", value)
                          }
                          value={selection.idSkill}
                          disabled={!selection.idSubcategoria}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una habilidad" />
                          </SelectTrigger>
                          <SelectContent>
                            {skills.map((s) => (
                              <SelectItem key={s.id} value={s.id}>
                                {s.descripcion}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Nivel de Conocimiento (0-10)</Label>
                        <Input
                          type="number"
                          min="0"
                          max="10"
                          value={selection.nivelConocimiento}
                          onChange={(e) =>
                            handleSkillChange(
                              index,
                              "nivelConocimiento",
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Descripción (opcional)</Label>
                        <Textarea
                          placeholder="Describe tu experiencia con esta habilidad"
                          value={selection.descripcion}
                          onChange={(e) =>
                            handleSkillChange(
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
                <Button variant="outline" onClick={addSkill}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Añadir otra habilidad
                </Button>
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
