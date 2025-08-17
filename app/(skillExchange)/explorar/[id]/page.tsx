"use client";

import { useState, useEffect, use } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, ChevronLeft } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getServicioDetalle, getServicioReviews } from "@/lib/actions/data";
import { ServiceDetailView } from "@/components/servicios/servicio-details-preview";
import type {
  ServicioDetalle,
  ReviewsServicio,
} from "@/lib/types/api-responses";
import { useUser } from "@/hooks/use-user";

export default function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { user } = useUser();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [servicio, setServicio] = useState<ServicioDetalle | null>(null);
  const [reviews, setReviews] = useState<ReviewsServicio | null>(null);

  useEffect(() => {
    const fetchServicioData = async () => {
      try {
        setLoading(true);
        const [servicioResponse, reviewsResponse] = await Promise.all([
          getServicioDetalle(id),
          getServicioReviews(id),
        ]);

        if (!servicioResponse.success) {
          setError(servicioResponse.message);
        } else {
          setServicio(servicioResponse.data);
        }

        if (reviewsResponse.success) {
          setReviews(reviewsResponse.data);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al cargar el servicio"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchServicioData();
  }, [id]);

  const handleBack = () => {
    window.history.back();
  };

  if (loading) {
    return (
      <div className="container mx-auto py-20 flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
        <p className="text-lg">Cargando detalles del servicio...</p>
      </div>
    );
  }

  if (error || !servicio) {
    return (
      <div className="container mx-auto py-10">
        <Button variant="ghost" onClick={handleBack} className="mb-4">
          <ChevronLeft className="mr-2 h-4 w-4" /> Volver
        </Button>

        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error ||
              "No se pudo cargar el servicio. Por favor, intenta nuevamente."}
          </AlertDescription>
        </Alert>

        <Button onClick={handleBack}>Volver</Button>
      </div>
    );
  }

  const isOwnService = user?.id === servicio.proveedor.id;

  return (
    <ServiceDetailView
      servicio={servicio}
      reviews={reviews}
      isOwnService={isOwnService}
    />
  );
}
