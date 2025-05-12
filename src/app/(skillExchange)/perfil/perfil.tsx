"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Alert, AlertDescription } from "@/components/ui/alert";

// Datos de ejemplo para categorías y subcategorías (igual que en el registro)
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

// Datos de ejemplo para el perfil del usuario
const userData = {
  id: "user-1",
  name: "María López",
  email: "maria@ejemplo.com",
  phone: "+51 987 654 321",
  location: "San Isidro, Lima",
  birthDate: "15/05/1990",
  avatar: "/avatars/shadcn.jpg",
  bio: "Profesional con experiencia en diseño gráfico y desarrollo web. Me apasiona crear soluciones visuales atractivas y funcionales para mis clientes.",
  memberSince: "Enero 2023",
  completedServices: 24,
  rating: 4.9,
  reviews: 18,
  socialMedia: {
    linkedin: "maria-lopez-design",
    facebook: "marialopezdesign",
    instagram: "maria.design",
    tiktok: "mariadesign",
  },
  skills: [
    {
      id: "skill-1",
      category: "Tecnología",
      subcategory: "Diseño",
      name: "Diseño web",
      level: 9,
      comment:
        "Especialista en diseño de interfaces modernas y responsivas con experiencia en más de 30 proyectos.",
    },
    {
      id: "skill-2",
      category: "Tecnología",
      subcategory: "Diseño",
      name: "Diseño gráfico",
      level: 8,
      comment:
        "Creación de logos, banners, material publicitario y contenido para redes sociales.",
    },
    {
      id: "skill-3",
      category: "Tecnología",
      subcategory: "Programación",
      name: "HTML/CSS",
      level: 7,
      comment:
        "Desarrollo de sitios web estáticos y maquetación de interfaces de usuario.",
    },
  ],
};

interface Skill {
  id: string;
  category: string;
  subcategory: string;
  name: string;
  level: number;
  comment: string;
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingSocial, setIsEditingSocial] = useState(false);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [personalData, setPersonalData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    location: userData.location,
    bio: userData.bio,
  });
  const [socialData, setSocialData] = useState({
    linkedin: userData.socialMedia.linkedin,
    facebook: userData.socialMedia.facebook,
    instagram: userData.socialMedia.instagram,
    tiktok: userData.socialMedia.tiktok,
  });
  const [skills, setSkills] = useState<Skill[]>(userData.skills);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [selectedSkill, setSelectedSkill] = useState<string>("");
  const [skillLevel, setSkillLevel] = useState<number[]>([5]);
  const [comment, setComment] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string>("");

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
    const skillExists = skills.some(
      (s) =>
        s.category === getCategoryName(selectedCategory) &&
        s.subcategory === getSubcategoryName(selectedSubcategory) &&
        s.name === selectedSkill
    );

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
        id: `skill-${Date.now()}`,
        category: category?.name || "",
        subcategory: subcategory?.name || "",
        name: selectedSkill,
        level: skillLevel[0],
        comment,
      };

      setSkills([...skills, newSkill]);

      // Limpiar el formulario
      setSelectedCategory("");
      setSelectedSubcategory("");
      setSelectedSkill("");
      setSkillLevel([5]);
      setComment("");

      // Cerrar el diálogo
      setIsAddingSkill(false);

      // Mostrar mensaje de éxito
      setSuccessMessage("Habilidad agregada correctamente");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  // Eliminar una habilidad
  const removeSkill = (skillId: string) => {
    setSkills(skills.filter((skill) => skill.id !== skillId));
    setSuccessMessage("Habilidad eliminada correctamente");
    setTimeout(() => setSuccessMessage(""), 3000);
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
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Mi Perfil</h1>

      {successMessage && (
        <Alert className="mb-4 bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-600">
            {successMessage}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Columna de información del perfil */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={userData.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute bottom-0 right-0 rounded-full bg-background h-8 w-8"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <h2 className="text-xl font-bold">{userData.name}</h2>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                  <span>{userData.rating}</span>
                  <span className="mx-1">•</span>
                  <span>{userData.reviews} reseñas</span>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <span>{userData.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <span>{userData.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span>{userData.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span>Nacimiento: {userData.birthDate}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold mb-2">Redes sociales</h3>
                <div className="space-y-3">
                  {userData.socialMedia.linkedin && (
                    <div className="flex items-center gap-3">
                      <Linkedin className="h-5 w-5 text-[#0077B5]" />
                      <span>{userData.socialMedia.linkedin}</span>
                    </div>
                  )}
                  {userData.socialMedia.facebook && (
                    <div className="flex items-center gap-3">
                      <Facebook className="h-5 w-5 text-[#1877F2]" />
                      <span>{userData.socialMedia.facebook}</span>
                    </div>
                  )}
                  {userData.socialMedia.instagram && (
                    <div className="flex items-center gap-3">
                      <Instagram className="h-5 w-5 text-[#E4405F]" />
                      <span>{userData.socialMedia.instagram}</span>
                    </div>
                  )}
                  {userData.socialMedia.tiktok && (
                    <div className="flex items-center gap-3">
                      <TikTok className="h-5 w-5" />
                      <span>{userData.socialMedia.tiktok}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold mb-2">Estadísticas</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Miembro desde</span>
                    <span>{userData.memberSince}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Servicios completados
                    </span>
                    <span>{userData.completedServices}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Calificación</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                      <span>{userData.rating}</span>
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
                <TabsList className="w-full rounded-none border-b">
                  <TabsTrigger value="personal" className="flex-1">
                    Información personal
                  </TabsTrigger>
                  <TabsTrigger value="skills" className="flex-1">
                    Habilidades
                  </TabsTrigger>
                  <TabsTrigger value="social" className="flex-1">
                    Redes sociales
                  </TabsTrigger>
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
                        <Edit className="h-4 w-4 mr-2" />
                      )}
                      {isEditingPersonal ? "Cancelar" : "Editar"}
                    </Button>
                  </div>

                  {isEditingPersonal ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre completo</Label>
                        <Input
                          id="name"
                          value={personalData.name}
                          onChange={(e) =>
                            setPersonalData({
                              ...personalData,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input
                          id="email"
                          type="email"
                          value={personalData.email}
                          onChange={(e) =>
                            setPersonalData({
                              ...personalData,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                          id="phone"
                          value={personalData.phone}
                          onChange={(e) =>
                            setPersonalData({
                              ...personalData,
                              phone: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Ubicación</Label>
                        <Input
                          id="location"
                          value={personalData.location}
                          onChange={(e) =>
                            setPersonalData({
                              ...personalData,
                              location: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Biografía</Label>
                        <Textarea
                          id="bio"
                          value={personalData.bio}
                          onChange={(e) =>
                            setPersonalData({
                              ...personalData,
                              bio: e.target.value,
                            })
                          }
                          rows={4}
                        />
                      </div>
                      <Button onClick={savePersonalData}>
                        Guardar cambios
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        {personalData.bio}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                        <div>
                          <h3 className="text-sm font-medium mb-1">
                            Nombre completo
                          </h3>
                          <p>{personalData.name}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium mb-1">
                            Correo electrónico
                          </h3>
                          <p>{personalData.email}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium mb-1">Teléfono</h3>
                          <p>{personalData.phone}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium mb-1">
                            Ubicación
                          </h3>
                          <p>{personalData.location}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>

                {/* Pestaña de habilidades */}
                <TabsContent value="skills" className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Mis habilidades</h2>
                    <Dialog
                      open={isAddingSkill}
                      onOpenChange={setIsAddingSkill}
                    >
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
                            Selecciona una categoría, subcategoría y habilidad
                            para agregar a tu perfil.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-2">
                          <div className="space-y-2">
                            <Label htmlFor="category">Categoría</Label>
                            <Select
                              value={selectedCategory}
                              onValueChange={setSelectedCategory}
                            >
                              <SelectTrigger
                                id="category"
                                className={
                                  errors.category ? "border-red-500" : ""
                                }
                              >
                                <SelectValue placeholder="Selecciona una categoría" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem
                                    key={category.id}
                                    value={category.id}
                                  >
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {errors.category && (
                              <p className="text-sm text-red-500">
                                {errors.category}
                              </p>
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
                                  className={
                                    errors.subcategory ? "border-red-500" : ""
                                  }
                                >
                                  <SelectValue placeholder="Selecciona una subcategoría" />
                                </SelectTrigger>
                                <SelectContent>
                                  {getSubcategories().map((subcategory) => (
                                    <SelectItem
                                      key={subcategory.id}
                                      value={subcategory.id}
                                    >
                                      {subcategory.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {errors.subcategory && (
                                <p className="text-sm text-red-500">
                                  {errors.subcategory}
                                </p>
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
                                  className={
                                    errors.skill ? "border-red-500" : ""
                                  }
                                >
                                  <SelectValue placeholder="Selecciona una habilidad" />
                                </SelectTrigger>
                                <SelectContent>
                                  {getSkills().map((skill) => (
                                    <SelectItem key={skill} value={skill}>
                                      {skill}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {errors.skill && (
                                <p className="text-sm text-red-500">
                                  {errors.skill}
                                </p>
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
                            </>
                          )}
                        </div>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setIsAddingSkill(false)}
                          >
                            Cancelar
                          </Button>
                          <Button onClick={addSkill}>Agregar habilidad</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="space-y-4">
                    {skills.length > 0 ? (
                      skills.map((skill) => (
                        <div
                          key={skill.id}
                          className="flex items-start justify-between p-4 border rounded-md bg-muted/20"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{skill.name}</span>
                              <Badge variant="outline">
                                Nivel {skill.level}
                              </Badge>
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
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>No has agregado ninguna habilidad aún.</p>
                        <p className="mt-2">
                          Haz clic en "Agregar habilidad" para comenzar a
                          mostrar tus talentos.
                        </p>
                      </div>
                    )}
                  </div>
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
      </div>
    </div>
  );
}
