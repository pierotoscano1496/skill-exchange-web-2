"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Clock, User, Plus } from "lucide-react";
import {
  buscarServicios,
  getCategorias,
  getSubCategoriasByCategoria,
  getSkillsBySubCategoria,
} from "@/lib/actions/data";
import type {
  ServicioBusqueda,
  Categoria,
  Subcategoria,
  Skill,
} from "@/lib/types/api-responses";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useUser } from "@/hooks/use-user";

export default function ExplorarPage() {
  const { user } = useUser();
  const [servicios, setServicios] = useState<ServicioBusqueda[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [subcategorias, setSubcategorias] = useState<Subcategoria[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoria, setSelectedCategoria] = useState<string>("all");
  const [selectedSubcategoria, setSelectedSubcategoria] =
    useState<string>("all");
  const [selectedSkill, setSelectedSkill] = useState<string>("all");

  const router = useRouter();

  // Cargar categorías iniciales
  useEffect(() => {
    const cargarCategorias = async () => {
      setLoading(true);
      try {
        const categoriasResponse = await getCategorias();
        if (categoriasResponse.success) {
          setCategorias(categoriasResponse.data || []);
        }
        const serviciosResponse = await buscarServicios({});
        if (serviciosResponse.success) {
          setServicios(serviciosResponse.data || []);
        }
      } catch (error) {
        console.error("Error cargando datos iniciales:", error);
        setCategorias([]);
        setServicios([]);
      } finally {
        setLoading(false);
      }
    };

    cargarCategorias();
  }, []);

  // Cargar subcategorías cuando cambia la categoría
  useEffect(() => {
    const cargarSubcategorias = async () => {
      if (selectedCategoria && selectedCategoria !== "all") {
        setLoading(true);
        try {
          const response = await getSubCategoriasByCategoria(
            selectedCategoria
          );
          if (response.success) {
            setSubcategorias(response.data || []);
          }
        } catch (error) {
          console.error("Error cargando subcategorías:", error);
          setSubcategorias([]);
        } finally {
          setLoading(false);
        }
      } else {
        setSubcategorias([]);
        setSkills([]);
        setSelectedSubcategoria("all");
        setSelectedSkill("all");
      }
    };

    cargarSubcategorias();
  }, [selectedCategoria]);

  // Cargar skills cuando cambia la subcategoría
  useEffect(() => {
    const cargarSkills = async () => {
      if (selectedSubcategoria && selectedSubcategoria !== "all") {
        setLoading(true);
        try {
          const response = await getSkillsBySubCategoria(
            selectedSubcategoria
          );
          if (response.success) {
            setSkills(response.data || []);
          }
        } catch (error) {
          console.error("Error cargando skills:", error);
          setSkills([]);
        } finally {
          setLoading(false);
        }
      } else {
        setSkills([]);
        setSelectedSkill("all");
      }
    };

    cargarSkills();
  }, [selectedSubcategoria]);

  // Función de búsqueda
  const realizarBusqueda = async () => {
    setLoading(true);
    try {
      const filtros = {
        keyWord: searchTerm || undefined,
        idCategoria:
          selectedCategoria !== "all" ? selectedCategoria : undefined,
        idSubcategoria:
          selectedSubcategoria !== "all" ? selectedSubcategoria : undefined,
        idSkill: selectedSkill !== "all" ? selectedSkill : undefined,
      };

      const response = await buscarServicios(filtros);
      if (response.success) {
        setServicios(response.data || []);
      }
    } catch (error) {
      console.error("Error en búsqueda:", error);
      setServicios([]);
    } finally {
      setLoading(false);
    }
  };

  // Formatear precio
  const formatearPrecio = (servicio: ServicioBusqueda) => {
    if (servicio.tipoPrecio === "fijo") {
      return `S/ ${servicio.precio}`;
    } else if (servicio.tipoPrecio === "hora") {
      return `S/ ${servicio.precio}/hora`;
    } else if (servicio.tipoPrecio === "rango") {
      return `S/ ${servicio.precioMinimo || 0} - S/ ${
        servicio.precioMaximo || 0
      }`;
    }
    return `S/ ${servicio.precio || 0}`;
  };

  // Formatear horarios
  const formatearHorario = (hora: { hour: number; minute: number }) => {
    if (!hora) return "00:00";
    return `${hora.hour.toString().padStart(2, "0")}:${hora.minute
      .toString()
      .padStart(2, "0")}`;
  };

  // Obtener emoji de categoría
  const getCategoriaEmoji = (nombreCategoria: string) => {
    const nombre = nombreCategoria.toLowerCase();
    if (nombre.includes("hogar")) return "🏠";
    if (nombre.includes("tecnología") || nombre.includes("tecnologia"))
      return "💻";
    if (nombre.includes("educación") || nombre.includes("educacion"))
      return "📚";
    if (nombre.includes("mascotas")) return "🐾";
    if (nombre.includes("belleza")) return "💇";
    if (nombre.includes("transporte")) return "🚗";
    return "⭐";
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* Header de bienvenida */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">¡Hola, {user?.nombres}!</h1>
          <p className="text-muted-foreground">
            Explora servicios disponibles o publica el tuyo.
          </p>
        </div>
        <Link href="/mis-chambitas/nueva">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nueva chambita
          </Button>
        </Link>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <div className="relative flex-1">
          <Input
            placeholder="¿Qué chambita necesitas?"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && realizarBusqueda()}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>

        <Select value={selectedCategoria} onValueChange={setSelectedCategoria}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Todas las categorías" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            {categorias.map((categoria) => (
              <SelectItem key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedSubcategoria}
          onValueChange={setSelectedSubcategoria}
          disabled={!selectedCategoria || selectedCategoria === "all"}
        >
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Todas las subcategorías" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las subcategorías</SelectItem>
            {subcategorias.map((sub) => (
              <SelectItem key={sub.id} value={sub.id}>
                {sub.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedSkill}
          onValueChange={setSelectedSkill}
          disabled={!selectedSubcategoria || selectedSubcategoria === "all"}
        >
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Todas las habilidades" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las habilidades</SelectItem>
            {skills.map((skill) => (
              <SelectItem key={skill.id} value={skill.id}>
                {skill.descripcion}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={realizarBusqueda} disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </Button>
      </div>

      {/* Categorías rápidas */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-6">
        {categorias.slice(0, 6).map((categoria) => (
          <Card
            key={categoria.id}
            className="bg-muted/30 hover:bg-muted/50 cursor-pointer transition-colors"
            onClick={() => {
              setSelectedCategoria(categoria.id);
              realizarBusqueda();
            }}
          >
            <CardContent className="p-4 text-center">
              <div className="text-3xl mb-2">
                {getCategoriaEmoji(categoria.nombre)}
              </div>
              <h3 className="font-medium text-sm">{categoria.nombre}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Resultados de búsqueda */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>
            {loading
              ? "Buscando servicios..."
              : `Servicios encontrados (${servicios?.length || 0})`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-muted-foreground">
                Cargando servicios...
              </p>
            </div>
          ) : !servicios || servicios.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No se encontraron servicios con los filtros seleccionados.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {servicios.map((servicio) => (
                <Card
                  key={servicio.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4">
                    {/* Imagen del servicio */}
                    {servicio.urlImagePreview && (
                      <div className="mb-3">
                        <img
                          src={servicio.urlImagePreview || "/placeholder.svg"}
                          alt={servicio.titulo}
                          className="w-full h-32 object-cover rounded-md"
                        />
                      </div>
                    )}

                    {/* Información del proveedor */}
                    <div className="flex items-center gap-2 mb-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        {servicio.proveedor?.nombres || "N/A"}{" "}
                        {servicio.proveedor?.apellidos || ""}
                      </span>
                    </div>

                    {/* Título y descripción */}
                    <h3 className="font-medium mb-1">{servicio.titulo}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {servicio.descripcion}
                    </p>

                    {/* Modalidad y ubicación */}
                    <div className="flex items-center gap-4 mb-2 text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span className="capitalize">{servicio.modalidad}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {servicio.ubicacion}
                      </Badge>
                    </div>

                    {/* Disponibilidad */}
                    {servicio.disponibilidades &&
                      servicio.disponibilidades.length > 0 && (
                        <div className="flex items-center gap-1 mb-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span className="capitalize">
                            {servicio.disponibilidades[0].dia}{" "}
                            {formatearHorario(
                              servicio.disponibilidades[0].horaInicio
                            )}{" "}
                            -{" "}
                            {formatearHorario(
                              servicio.disponibilidades[0].horaFin
                            )}
                          </span>
                        </div>
                      )}

                    {/* Precio */}
                    <div className="flex justify-between items-center mt-3">
                      <span className="font-medium text-lg">
                        {formatearPrecio(servicio)}
                      </span>
                      <Button
                        size="sm"
                        onClick={() => router.push(`/explorar/${servicio.id}`)}
                      >
                        Ver detalles
                      </Button>
                    </div>

                    {/* Modalidades de pago */}
                    {servicio.modalidadesPago &&
                      servicio.modalidadesPago.length > 0 && (
                        <div className="flex gap-1 mt-2">
                          {servicio.modalidadesPago.map((modalidad) => (
                            <Badge
                              key={modalidad.id}
                              variant="secondary"
                              className="text-xs"
                            >
                              {modalidad.tipo}
                            </Badge>
                          ))}
                        </div>
                      )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
