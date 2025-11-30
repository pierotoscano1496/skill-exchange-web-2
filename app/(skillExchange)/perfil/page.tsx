"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Facebook,
  Instagram,
  Linkedin,
  TwitterIcon as TikTok,
  Plus,
  Trash2,
  Star,
  Edit,
  Camera,
  CheckCircle,
  PlusCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CustomDialog } from "@/components/ui/custom-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { useUser } from "@/hooks/use-user";
import {
  SkillAsignadoResponse,
  SkillInfo,
  SkillUsuario,
} from "@/lib/types/api-responses";
import { formatDate } from "@/lib/utils";
import {
  addSkillToProfile,
  checkIfSkillIsPresentInServiciosFromProveedor,
  deleteSkillFromProfile,
  getAverageScoreMatchsProveedor,
  getOwnSkillsAsignados,
  getOwnSkillsInfo,
  getSkillsInfo,
} from "@/lib/actions/data";
import { DisponibilidadHorariaForm } from "@/components/disponibilidad-horaria-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProfilePage() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingSocial, setIsEditingSocial] = useState(false);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [personalData, setPersonalData] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    dni: "",
    carnetExtranjeria: "",
    tipoDocumento: "dni",
    fechaNacimiento: "",
    introduccion: "",
  });
  const [socialData, setSocialData] = useState({
    linkedin: "",
    facebook: "",
    instagram: "",
    tiktok: "",
  });
  const [userSkills, setUserSkills] = useState<SkillAsignadoResponse[]>([]);
  const [allSkills, setAllSkills] = useState<SkillInfo[]>([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [newSkillInfo, setNewSkillInfo] = useState<SkillInfo | null>(null);
  const [newSkillLevel, setNewSkillLevel] = useState<number>(5);
  const [newSkillComment, setNewSkillComment] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [skillToDelete, setSkillToDelete] = useState<string | null>(null);

  const [averageScore, setAverageScore] = useState<number>(0);
  const [dialogState, setDialogState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: "success" | "error" | "confirmation" | "info";
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });

  useEffect(() => {
    if (user) {
      setPersonalData({
        nombres: user.nombres || "",
        apellidos: user.apellidos || "",
        correo: user.correo || "",
        dni: user.dni || "",
        carnetExtranjeria: user.carnetExtranjeria || "",
        tipoDocumento: user.tipoDocumento || "dni",
        fechaNacimiento: user.fechaNacimiento || "",
        introduccion: user.introduccion || "",
      });
      setSocialData({
        linkedin: user.perfilLinkedin || "",
        facebook: user.perfilFacebook || "",
        instagram: user.perfilInstagram || "",
        tiktok: user.perfilTiktok || "",
      });

      loadAllUsuarioSkills();

      (async () => {
        setAverageScore(
          (await getAverageScoreMatchsProveedor(user.id)).data || 0
        );
      })();
    }
  }, [user]);

  useEffect(() => {
    const fetchAndProcessSkills = async () => {
      const response = await getSkillsInfo();
      if (response.success) {
        setAllSkills(response.data);
      }
    };
    fetchAndProcessSkills();
  }, []);

  const loadAllUsuarioSkills = async () => {
    const resp = await getOwnSkillsAsignados();
    if (resp.success) {
      setUserSkills(resp.data);
    }
  };

  const handleSelectSkill = (skill: SkillInfo) => {
    setNewSkillInfo(skill);
    setIsPopoverOpen(false);
  };

  const addSkill = async () => {
    const newErrors: Record<string, string> = {};
    if (!newSkillInfo) {
      newErrors.skill = "Debes seleccionar una habilidad.";
    }
    if (!newSkillComment) {
      newErrors.comment = "Debes agregar un comentario sobre tu desempeño.";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const skillAsignadoResp = await addSkillToProfile({
      idSkill: newSkillInfo!.id,
      descripcion: newSkillComment,
      nivelConocimiento: newSkillLevel,
    });

    if (!skillAsignadoResp.success) {
      setDialogState({
        isOpen: true,
        type: "error",
        title: "Error",
        message: "Ocurrió un error al agregar la habilidad.",
      });
      return;
    }

    const skillAsignado = skillAsignadoResp.data;

    const newSkillForUi: SkillUsuario = {
      idSkill: skillAsignado.id,
      nivelConocimiento: skillAsignado.nivelConocimiento,
      descripcion: `${newSkillInfo!.descripcion}: ${
        skillAsignado.descripcionDesempeno
      }`,
    };

    loadAllUsuarioSkills();

    // Limpiar el formulario
    setNewSkillInfo(null);
    setNewSkillLevel(5);
    setNewSkillComment("");
    setErrors({});

    // Cerrar el diálogo
    setIsAddingSkill(false);

    // Mostrar mensaje de éxito
    setSuccessMessage("Habilidad agregada correctamente");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleConfirmRemoveSkill = async () => {
    if (!skillToDelete) return;

    // Eliminar la habilidad
    const skillDeletedResp = await deleteSkillFromProfile(skillToDelete);
    if (skillDeletedResp.data) {
      loadAllUsuarioSkills();
      setDialogState({
        isOpen: true,
        type: "success",
        title: "Habilidad eliminada",
        message: "La habilidad ha sido eliminada correctamente.",
      });
    } else {
      setDialogState({
        isOpen: true,
        type: "error",
        title: "Error al eliminar habilidad",
        message:
          "Ocurrió un error al eliminar la habilidad. Por favor, inténtalo de nuevo.",
      });
    }
    setSkillToDelete(null);
  };

  // Eliminar una habilidad
  const removeSkill = async (skillId: string) => {
    const skillIsPresentInServicios =
      await checkIfSkillIsPresentInServiciosFromProveedor(skillId);
    if (skillIsPresentInServicios.data) {
      setDialogState({
        isOpen: true,
        type: "error",
        title: "Error al eliminar habilidad",
        message:
          "No puedes eliminar esta habilidad porque está asociada a un servicio.",
      });
      return;
    }
    setSkillToDelete(skillId);
  };

  // Guardar datos personales
  const savePersonalData = () => {
    // Aquí iría la lógica para guardar los datos en la base de datos
    setIsEditingPersonal(false);
    setSuccessMessage("Datos personales actualizados correctamente");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // Guardar datos de redes sociales
  const saveSocialData = () => {
    // Aquí iría la lógica para guardar los datos en la base de datos
    setIsEditingSocial(false);
    setSuccessMessage("Redes sociales actualizadas correctamente");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Columna de información del perfil */}
      <div className="md:col-span-1">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>{user?.nombres?.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full bg-background h-8 w-8"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <h2 className="text-xl font-bold">
                {user?.nombres} {user?.apellidos}
              </h2>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                <span>{averageScore}</span>
                <span className="mx-1">•</span>
                <span>18 reseñas</span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span>{user?.correo}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span>{user?.dni || user?.carnetExtranjeria}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span>
                  Nacimiento:{" "}
                  {user?.fechaNacimiento
                    ? formatDate(user.fechaNacimiento)
                    : "No disponible"}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <h3 className="font-semibold mb-2">Redes sociales</h3>
              <div className="space-y-3">
                {user?.perfilLinkedin && (
                  <div className="flex items-center gap-3">
                    <Linkedin className="h-5 w-5 text-[#0077B5]" />
                    <span>{user?.perfilLinkedin}</span>
                  </div>
                )}
                {user?.perfilFacebook && (
                  <div className="flex items-center gap-3">
                    <Facebook className="h-5 w-5 text-[#1877F2]" />
                    <span>{user?.perfilFacebook}</span>
                  </div>
                )}
                {user?.perfilInstagram && (
                  <div className="flex items-center gap-3">
                    <Instagram className="h-5 w-5 text-[#E4405F]" />
                    <span>{user?.perfilInstagram}</span>
                  </div>
                )}
                {user?.perfilTiktok && (
                  <div className="flex items-center gap-3">
                    <TikTok className="h-5 w-5" />
                    <span>{user?.perfilTiktok}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <h3 className="font-semibold mb-2">Estadísticas</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Miembro desde</span>
                  <span>Enero 2023</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Servicios completados
                  </span>
                  <span>24</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Calificación</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                    <span>{averageScore}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Columna principal con pestañas */}
      <div className="md:col-span-2">
        <Card>
          <CardContent className="p-0">
            <Tabs
              defaultValue="personal"
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="w-full rounded-none border-b grid grid-cols-4">
                <TabsTrigger value="personal">Información personal</TabsTrigger>
                <TabsTrigger value="skills">Habilidades</TabsTrigger>
                <TabsTrigger value="disponibilidad">Disponibilidad</TabsTrigger>
                <TabsTrigger value="social">Redes sociales</TabsTrigger>
              </TabsList>

              {/* Pestaña de información personal */}
              <TabsContent value="personal" className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">
                    Información personal
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditingPersonal(!isEditingPersonal)}
                  >
                    {isEditingPersonal ? (
                      "Cancelar"
                    ) : (
                      <>
                        <Edit className="h-4 w-4 mr-2" /> Editar{" "}
                      </>
                    )}
                  </Button>
                </div>

                {isEditingPersonal ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nombres">Nombres</Label>
                        <Input
                          id="nombres"
                          value={personalData.nombres}
                          onChange={(e) =>
                            setPersonalData({
                              ...personalData,
                              nombres: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="apellidos">Apellidos</Label>
                        <Input
                          id="apellidos"
                          value={personalData.apellidos}
                          onChange={(e) =>
                            setPersonalData({
                              ...personalData,
                              apellidos: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="correo">Correo electrónico</Label>
                      <Input
                        id="correo"
                        type="email"
                        value={personalData.correo}
                        onChange={(e) =>
                          setPersonalData({
                            ...personalData,
                            correo: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tipoDocumento">Tipo de Documento</Label>
                        <Select
                          value={personalData.tipoDocumento}
                          onValueChange={(value) =>
                            setPersonalData({
                              ...personalData,
                              tipoDocumento: value as
                                | "dni"
                                | "carnet_extranjeria",
                            })
                          }
                        >
                          <SelectTrigger id="tipoDocumento">
                            <SelectValue placeholder="Selecciona tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dni">DNI</SelectItem>
                            <SelectItem value="carnet_extranjeria">
                              Carnet de Extranjería
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="documento">
                          {personalData.tipoDocumento === "dni"
                            ? "DNI"
                            : "Carnet de Extranjería"}
                        </Label>
                        <Input
                          id="documento"
                          value={
                            personalData.tipoDocumento === "dni"
                              ? personalData.dni
                              : personalData.carnetExtranjeria
                          }
                          onChange={(e) =>
                            setPersonalData({
                              ...personalData,
                              [personalData.tipoDocumento === "dni"
                                ? "dni"
                                : "carnetExtranjeria"]: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fechaNacimiento">
                        Fecha de Nacimiento
                      </Label>
                      <Input
                        id="fechaNacimiento"
                        type="date"
                        value={personalData.fechaNacimiento}
                        onChange={(e) =>
                          setPersonalData({
                            ...personalData,
                            fechaNacimiento: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="introduccion">Introducción</Label>
                      <Textarea
                        id="introduccion"
                        value={personalData.introduccion}
                        onChange={(e) =>
                          setPersonalData({
                            ...personalData,
                            introduccion: e.target.value,
                          })
                        }
                        placeholder="Cuéntanos un poco sobre ti..."
                      />
                    </div>
                    <Button onClick={savePersonalData}>Guardar cambios</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          Nombres
                        </p>
                        <p className="text-base font-semibold">
                          {personalData.nombres}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          Apellidos
                        </p>
                        <p className="text-base font-semibold">
                          {personalData.apellidos}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        Correo electrónico
                      </p>
                      <p className="text-base font-semibold">
                        {personalData.correo}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          Tipo de Documento
                        </p>
                        <p className="text-base font-semibold">
                          {personalData.tipoDocumento === "dni"
                            ? "DNI"
                            : "Carnet de Extranjería"}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          Número de Documento
                        </p>
                        <p className="text-base font-semibold">
                          {personalData.dni || personalData.carnetExtranjeria}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        Fecha de Nacimiento
                      </p>
                      <p className="text-base font-semibold">
                        {personalData.fechaNacimiento}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        Introducción
                      </p>
                      <p className="text-base font-semibold">
                        {personalData.introduccion ||
                          "No hay introducción aún."}
                      </p>
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* Pestaña de habilidades */}
              <TabsContent value="skills" className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Mis habilidades</h2>
                  <Dialog open={isAddingSkill} onOpenChange={setIsAddingSkill}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar habilidad
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Agregar nueva habilidad</DialogTitle>
                        <DialogDescription>
                          Busca y añade una habilidad a tu perfil.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-2">
                        <Popover
                          open={isPopoverOpen}
                          onOpenChange={setIsPopoverOpen}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start"
                            >
                              <PlusCircle className="mr-2 h-4 w-4" />
                              {newSkillInfo
                                ? newSkillInfo.descripcion
                                : "Seleccionar habilidad"}
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
                                      disabled={userSkills.some((s) =>
                                        s.descripcion.startsWith(
                                          skill.descripcion
                                        )
                                      )}
                                    >
                                      <div className="flex flex-col">
                                        <span>{skill.descripcion}</span>
                                        <span className="text-xs text-muted-foreground">
                                          {skill.nombreCategoria} &gt;{" "}
                                          {skill.nombreSubCategoria}
                                        </span>
                                      </div>
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        {errors.skill && (
                          <p className="text-sm text-red-500">{errors.skill}</p>
                        )}

                        {newSkillInfo && (
                          <div className="space-y-4 pt-4 border-t">
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <Label htmlFor="skill-level">
                                  Nivel de conocimiento
                                </Label>
                                <span className="text-sm font-medium">
                                  {newSkillLevel}
                                </span>
                              </div>
                              <Slider
                                id="skill-level"
                                min={1}
                                max={10}
                                step={1}
                                value={[newSkillLevel]}
                                onValueChange={(value) =>
                                  setNewSkillLevel(value[0])
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="comment">
                                ¿Cómo te desempeñas en esta habilidad?
                              </Label>
                              <Textarea
                                id="comment"
                                value={newSkillComment}
                                onChange={(e) =>
                                  setNewSkillComment(e.target.value)
                                }
                                placeholder="Describe tu experiencia y nivel de conocimiento..."
                                className={
                                  errors.comment ? "border-red-500" : ""
                                }
                              />
                              {errors.comment && (
                                <p className="text-sm text-red-500">
                                  {errors.comment}
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsAddingSkill(false);
                            setNewSkillInfo(null);
                            setNewSkillLevel(5);
                            setNewSkillComment("");
                            setErrors({});
                          }}
                        >
                          Cancelar
                        </Button>
                        <Button onClick={addSkill}>Agregar habilidad</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="space-y-4">
                  {userSkills.length > 0 ? (
                    userSkills.map((skill) => (
                      <div
                        key={skill.id}
                        className="flex items-start justify-between p-4 border rounded-md bg-muted/20"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              {skill.descripcion.split(":")[0]}
                            </span>
                            <Badge variant="outline">
                              Nivel {skill.nivelConocimiento}
                            </Badge>
                          </div>
                          <p className="text-sm">
                            {skill.descripcion.split(":")[1]}
                          </p>
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
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No has agregado ninguna habilidad aún.</p>
                      <p className="mt-2">
                        Haz clic en "Agregar habilidad" para comenzar a mostrar
                        tus talentos.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Pestaña de disponibilidad */}
              <TabsContent value="disponibilidad" className="p-6">
                <DisponibilidadHorariaForm />
              </TabsContent>

              {/* Pestaña de redes sociales */}
              <TabsContent value="social" className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Redes sociales</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditingSocial(!isEditingSocial)}
                  >
                    {isEditingSocial ? (
                      "Cancelar"
                    ) : (
                      <Edit className="h-4 w-4 mr-2" />
                    )}
                    {isEditingSocial ? "Cancelar" : "Editar"}
                  </Button>
                </div>

                {isEditingSocial ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <div className="flex items-center gap-2">
                        <Linkedin className="h-5 w-5 text-[#0077B5]" />
                        <Input
                          id="linkedin"
                          value={socialData.linkedin}
                          onChange={(e) =>
                            setSocialData({
                              ...socialData,
                              linkedin: e.target.value,
                            })
                          }
                          placeholder="URL o nombre de usuario"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="facebook">Facebook</Label>
                      <div className="flex items-center gap-2">
                        <Facebook className="h-5 w-5 text-[#1877F2]" />
                        <Input
                          id="facebook"
                          value={socialData.facebook}
                          onChange={(e) =>
                            setSocialData({
                              ...socialData,
                              facebook: e.target.value,
                            })
                          }
                          placeholder="URL o nombre de usuario"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instagram">Instagram</Label>
                      <div className="flex items-center gap-2">
                        <Instagram className="h-5 w-5 text-[#E4405F]" />
                        <Input
                          id="instagram"
                          value={socialData.instagram}
                          onChange={(e) =>
                            setSocialData({
                              ...socialData,
                              instagram: e.target.value,
                            })
                          }
                          placeholder="Nombre de usuario (sin @)"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tiktok">TikTok</Label>
                      <div className="flex items-center gap-2">
                        <TikTok className="h-5 w-5" />
                        <Input
                          id="tiktok"
                          value={socialData.tiktok}
                          onChange={(e) =>
                            setSocialData({
                              ...socialData,
                              tiktok: e.target.value,
                            })
                          }
                          placeholder="Nombre de usuario (sin @)"
                        />
                      </div>
                    </div>
                    <Button onClick={saveSocialData}>Guardar cambios</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-muted-foreground mb-4">
                      Conecta tus redes sociales para que los clientes puedan
                      conocer más sobre ti y tu trabajo.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Linkedin className="h-5 w-5 text-[#0077B5]" />
                        <div>
                          <h3 className="font-medium">LinkedIn</h3>
                          <p className="text-sm text-muted-foreground">
                            {socialData.linkedin ||
                              "No has agregado tu perfil de LinkedIn"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Facebook className="h-5 w-5 text-[#1877F2]" />
                        <div>
                          <h3 className="font-medium">Facebook</h3>
                          <p className="text-sm text-muted-foreground">
                            {socialData.facebook ||
                              "No has agregado tu perfil de Facebook"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Instagram className="h-5 w-5 text-[#E4405F]" />
                        <div>
                          <h3 className="font-medium">Instagram</h3>
                          <p className="text-sm text-muted-foreground">
                            {socialData.instagram ||
                              "No has agregado tu perfil de Instagram"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <TikTok className="h-5 w-5" />
                        <div>
                          <h3 className="font-medium">TikTok</h3>
                          <p className="text-sm text-muted-foreground">
                            {socialData.tiktok ||
                              "No has agregado tu perfil de TikTok"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      <Dialog
        open={!!skillToDelete}
        onOpenChange={(open) => !open && setSkillToDelete(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres eliminar esta habilidad? Esta acción
              no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSkillToDelete(null)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleConfirmRemoveSkill}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <CustomDialog
        isOpen={dialogState.isOpen}
        onClose={() => setDialogState({ ...dialogState, isOpen: false })}
        title={dialogState.title}
        message={dialogState.message}
        type={dialogState.type}
      />
    </div>
  );
}
