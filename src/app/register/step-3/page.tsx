"use client";

import { useEffect, useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Check, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { obtenerCategorias } from "@/actions/categoria.actions";
import { obtenerSubCategorias } from "@/actions/subcategoria.actions";
import { obtenerSkills } from "@/actions/skill.action";
import {
  asignarSkillsToUsuario,
  registrarUsuarioDatos,
} from "@/actions/usuario.actions";
import CreateUsuarioBody from "@/interfaces/requestbody/CreateUsuarioBody";
import { TipoDocumento } from "@/utils/types";

interface Skill {
  id: string;
  category: string;
  subcategory: string;
  name: string;
  level: number;
  comment: string;
}

interface Category {
  id: string;
  name: string;
  subcategories: {
    id: string;
    name: string;
    skills: {
      id: string;
      name: string;
    }[];
  }[];
}

export default function RegisterStep3Page() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [selectedSkill, setSelectedSkill] = useState<string>("");
  const [skillLevel, setSkillLevel] = useState<number[]>([5]);
  const [comment, setComment] = useState<string>("");
  const [skills, setSkills] = useState<Skill[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    const setup = async () => {
      const categorias = await obtenerCategorias();
      const subCategorias = await obtenerSubCategorias();
      const skills = await obtenerSkills();

      setCategories(
        categorias.map((categoria) => ({
          id: categoria.id,
          name: categoria.nombre,
          subcategories: subCategorias
            .filter((subcat) => subcat.idCategoria === categoria.id)
            .map((subcat) => ({
              id: subcat.id,
              name: subcat.nombre,
              skills: skills
                .filter((skill) => skill.idSubCategoria === subcat.id)
                .map((skill) => ({
                  id: skill.id,
                  name: skill.descripcion,
                })),
            })),
        }))
      );
    };
    setup();
  }, []);

  // Obtener subcategorías basadas en la categoría seleccionada
  const getSubcategories = () => {
    const category = categories.find((cat) => cat.id === selectedCategory);
    return category ? category.subcategories : [];
  };

  // Obtener habilidades basadas en la subcategoría seleccionada
  const getSkills = () => {
    const subcategory = getSubcategories().find(
      (subcat) => subcat.id === selectedSubcategory
    );
    return subcategory ? subcategory.skills : [];
  };

  // Validar el formulario de habilidad
  const validateSkillForm = () => {
    const newErrors: Record<string, string> = {};

    if (!selectedCategory) {
      newErrors.category = "Debes seleccionar una categoría";
    }

    if (!selectedSubcategory) {
      newErrors.subcategory = "Debes seleccionar una subcategoría";
    }

    if (!selectedSkill) {
      newErrors.skill = "Debes seleccionar una habilidad";
    }

    if (!comment) {
      newErrors.comment = "Debes agregar un comentario sobre tu desempeño";
    }

    // Verificar si la habilidad ya existe
    const skillExists = skills.some((s) => s.id === selectedSkill);

    if (skillExists) {
      newErrors.skill = "Esta habilidad ya ha sido agregada";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Agregar una nueva habilidad
  const addSkill = () => {
    if (validateSkillForm()) {
      const category = categories.find((cat) => cat.id === selectedCategory);
      const subcategory = getSubcategories().find(
        (subcat) => subcat.id === selectedSubcategory
      );

      const newSkill: Skill = {
        id: selectedSkill,
        category: category?.name || "",
        subcategory: subcategory?.name || "",
        name:
          subcategory?.skills.find((s) => s.id === selectedSkill)?.name || "",
        level: skillLevel[0],
        comment,
      };

      setSkills([...skills, newSkill]);

      // Limpiar el formulario
      setSelectedSkill("");
      setSkillLevel([5]);
      setComment("");
    }
  };

  // Eliminar una habilidad
  const removeSkill = (skillId: string) => {
    setSkills(skills.filter((skill) => skill.id !== skillId));
  };

  // Validar el formulario completo
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (skills.length === 0) {
      newErrors.skills = "Debes agregar al menos una habilidad";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar el envío del formulario
  const handleSubmit = async () => {
    if (validateForm()) {
      // Obtener datos previos
      const savedData = localStorage.getItem("registrationData");
      if (savedData) {
        const data = JSON.parse(savedData);
        const {
          documentType,
          documentNumber,
          firstName,
          lastName,
          birthDate,
          description,
        } = data;

        const tipoDocumento = documentType as TipoDocumento;
        const usuarioDatos: CreateUsuarioBody = {
          dni: tipoDocumento == "dni" ? documentNumber : null,
          carnetExtranjeria:
            tipoDocumento == "carnet_extranjeria" ? documentNumber : null,
          nombres: firstName,
          apellidos: lastName,
          fechaNacimiento: birthDate,
          introduccion: description,
          tipoDocumento: tipoDocumento,
          correo: data.email,
          clave: data.password,
          tipo: "cliente",
          perfilLinkedin: data.linkedin,
          perfilFacebook: data.facebook,
          perfilInstagram: data.instagram,
          perfilTiktok: data.tiktok,
          skills: skills.map((skill) => ({
            idSkill: skill.id,
            descripcion: skill.comment,
            nivelConocimiento: skill.level,
          })),
        };

        const usuarioRegistered = await registrarUsuarioDatos(usuarioDatos);

        if (usuarioRegistered) {
          setSuccess(true);

          // Limpiar datos de registro
          localStorage.removeItem("registrationData");

          // Redirigir después de 2 segundos
          setTimeout(() => {
            router.push("/");
          }, 2000);
        }
      }
    }
  };

  const handleBack = () => {
    router.push("/register/step-2");
  };

  // Obtener el nombre de la categoría
  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "";
  };

  // Obtener el nombre de la subcategoría
  const getSubcategoryName = (subcategoryId: string) => {
    const subcategory = getSubcategories().find(
      (subcat) => subcat.id === subcategoryId
    );
    return subcategory ? subcategory.name : "";
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                3
              </div>
              <CardTitle>Habilidades</CardTitle>
            </div>
            <div className="text-sm text-muted-foreground">Paso 3 de 3</div>
          </div>
          <CardDescription>
            Agrega las habilidades que quieres ofrecer en Chambita
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {success ? (
            <Alert className="bg-green-50 border-green-200">
              <Check className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-600">
                ¡Registro completado con éxito! Redirigiendo...
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger
                    id="category"
                    className={errors.category ? "border-red-500" : ""}
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
                {errors.category && (
                  <p className="text-sm text-red-500">{errors.category}</p>
                )}
              </div>

              {selectedCategory && (
                <div className="space-y-2">
                  <Label htmlFor="subcategory">Subcategoría</Label>
                  <Select
                    value={selectedSubcategory}
                    onValueChange={(value) => {
                      setSelectedSubcategory(value);
                      setSelectedSkill("");
                    }}
                  >
                    <SelectTrigger
                      id="subcategory"
                      className={errors.subcategory ? "border-red-500" : ""}
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
                  {errors.subcategory && (
                    <p className="text-sm text-red-500">{errors.subcategory}</p>
                  )}
                </div>
              )}

              {selectedSubcategory && (
                <div className="space-y-2">
                  <Label htmlFor="skill">Habilidad</Label>
                  <Select
                    value={selectedSkill}
                    onValueChange={setSelectedSkill}
                  >
                    <SelectTrigger
                      id="skill"
                      className={errors.skill ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Selecciona una habilidad" />
                    </SelectTrigger>
                    <SelectContent>
                      {getSkills().map((skill) => (
                        <SelectItem key={skill.id} value={skill.id}>
                          {skill.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.skill && (
                    <p className="text-sm text-red-500">{errors.skill}</p>
                  )}
                </div>
              )}

              {selectedSkill && (
                <>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="skill-level">
                        Nivel de conocimiento (1-10)
                      </Label>
                      <span className="text-sm font-medium">
                        {skillLevel[0]}
                      </span>
                    </div>
                    <Slider
                      id="skill-level"
                      min={1}
                      max={10}
                      step={1}
                      value={skillLevel}
                      onValueChange={setSkillLevel}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="comment">
                      ¿Cómo te desempeñas en esta habilidad?
                    </Label>
                    <Textarea
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Describe tu experiencia y nivel de conocimiento..."
                      className={errors.comment ? "border-red-500" : ""}
                    />
                    {errors.comment && (
                      <p className="text-sm text-red-500">{errors.comment}</p>
                    )}
                  </div>

                  <Button
                    type="button"
                    onClick={addSkill}
                    className="w-full"
                    variant="outline"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Agregar habilidad
                  </Button>
                </>
              )}

              {skills.length > 0 && (
                <div className="space-y-2 pt-4">
                  <h3 className="text-sm font-medium">Habilidades agregadas</h3>
                  <div className="space-y-2">
                    {skills.map((skill) => (
                      <div
                        key={skill.id}
                        className="flex items-center justify-between p-3 border rounded-md bg-muted/20"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{skill.name}</span>
                            <Badge variant="outline">Nivel {skill.level}</Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {skill.category} &gt; {skill.subcategory}
                          </div>
                          <p className="text-sm">{skill.comment}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSkill(skill.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  {errors.skills && (
                    <p className="text-sm text-red-500">{errors.skills}</p>
                  )}
                </div>
              )}
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={success}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Atrás
          </Button>
          <Button onClick={handleSubmit} disabled={success}>
            Finalizar registro
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
