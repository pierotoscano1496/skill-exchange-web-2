"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Edit, Eye, PlusCircle, Star } from "lucide-react";
import Link from "next/link";
import { getServiciosByProveedor } from "@/lib/actions/data";
import { getCurrentUserId } from "@/lib/config/environment";
import type { ServicioBusqueda } from "@/lib/types/api-responses";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function MisChambitasPage() {
  const [servicios, setServicios] = useState<ServicioBusqueda[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        setLoading(true);
        const response = await getServiciosByProveedor();

        if (response.success) {
          setServicios(response.data);
        } else {
          setError(response.message || "Error al cargar los servicios");
        }
      } catch (err) {
        setError(
          "Error al cargar los servicios. Por favor, intenta de nuevo más tarde."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServicios();
  }, []);

  // Función para formatear el precio según el tipo
  const formatearPrecio = (servicio: ServicioBusqueda) => {
    switch (servicio.tipoPrecio) {
      case "fijo":
        return `S/ ${servicio.precio}`;
      case "hora":
        return `S/ ${servicio.precio}/hora`;
      case "rango":
        return `S/ ${servicio.precioMinimo} - S/ ${servicio.precioMaximo}`;
      default:
        return `S/ ${servicio.precio}`;
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mis Chambitas</h1>
        <Link href="/mis-chambitas/nueva">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nueva chambita
          </Button>
        </Link>
      </div>
      <p className="text-muted-foreground">
        Administra los servicios que ofreces.
      </p>

      <Tabs defaultValue="todos" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="todos">Todos ({servicios.length})</TabsTrigger>
          <TabsTrigger value="activos">
            Activos ({servicios.length})
          </TabsTrigger>
          <TabsTrigger value="borradores">Borradores (0)</TabsTrigger>
        </TabsList>

        <TabsContent value="todos">
          <Card>
            <CardHeader>
              <CardTitle>Todos mis servicios</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading ? (
                // Skeleton loaders mientras carga
                Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between border-b pb-4"
                    >
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-16 w-16 rounded-md" />
                        <div>
                          <Skeleton className="h-5 w-40 mb-2" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Skeleton className="h-9 w-24" />
                        <Skeleton className="h-9 w-20" />
                      </div>
                    </div>
                  ))
              ) : servicios.length > 0 ? (
                servicios.map((servicio) => (
                  <div
                    key={servicio.id}
                    className="flex items-center justify-between border-b pb-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-md bg-gray-100 overflow-hidden">
                        {servicio.urlImagePreview ? (
                          <img
                            src={servicio.urlImagePreview || "/placeholder.svg"}
                            alt={servicio.titulo}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-gray-200 text-gray-500">
                            Sin imagen
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{servicio.titulo}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{formatearPrecio(servicio)}</span>
                          <span>•</span>
                          <Badge variant="outline" className="capitalize">
                            {servicio.modalidad}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/explorar/${servicio.id}`}>
                        <Button size="sm" variant="outline">
                          <Eye className="mr-1 h-4 w-4" />
                          Ver
                        </Button>
                      </Link>
                      <Link href={`/mis-chambitas/editar/${servicio.id}`}>
                        <Button size="sm">
                          <Edit className="mr-1 h-4 w-4" />
                          Editar
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    No tienes servicios publicados.
                  </p>
                  <Link href="/mis-chambitas/nueva">
                    <Button className="mt-4">Crear mi primer servicio</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activos">
          <Card>
            <CardHeader>
              <CardTitle>Servicios activos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading ? (
                // Skeleton loaders mientras carga
                Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between border-b pb-4"
                    >
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-16 w-16 rounded-md" />
                        <div>
                          <Skeleton className="h-5 w-40 mb-2" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Skeleton className="h-9 w-24" />
                        <Skeleton className="h-9 w-20" />
                      </div>
                    </div>
                  ))
              ) : servicios.length > 0 ? (
                servicios.map((servicio) => (
                  <div
                    key={servicio.id}
                    className="flex items-center justify-between border-b pb-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-md bg-gray-100 overflow-hidden">
                        {servicio.urlImagePreview ? (
                          <img
                            src={servicio.urlImagePreview || "/placeholder.svg"}
                            alt={servicio.titulo}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-gray-200 text-gray-500">
                            Sin imagen
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{servicio.titulo}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{formatearPrecio(servicio)}</span>
                          <span>•</span>
                          <Badge variant="outline" className="capitalize">
                            {servicio.modalidad}
                          </Badge>
                          <span>•</span>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                            <span>4.8</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/explorar/${servicio.id}`}>
                        <Button size="sm" variant="outline">
                          <Eye className="mr-1 h-4 w-4" />
                          Ver
                        </Button>
                      </Link>
                      <Link href={`/mis-chambitas/editar/${servicio.id}`}>
                        <Button size="sm">
                          <Edit className="mr-1 h-4 w-4" />
                          Editar
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    No tienes servicios activos.
                  </p>
                  <Link href="/mis-chambitas/nueva">
                    <Button className="mt-4">Crear un servicio</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="borradores">
          <Card>
            <CardHeader>
              <CardTitle>Borradores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No tienes borradores guardados.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
