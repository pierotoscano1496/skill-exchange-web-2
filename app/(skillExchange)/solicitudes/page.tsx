"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle,
  Clock,
  XCircle,
  User,
  Calendar,
  MapPin,
  DollarSign,
  MessageSquare,
  Loader2,
  AlertCircle,
  Play,
  Square,
} from "lucide-react"
import { dataService } from "@/lib/services/data-service"
import { getCurrentUserId } from "@/lib/config/environment"
import type { SolicitudRecibida } from "@/lib/types/api-responses"
import { AceptarSolicitudDialog } from "@/components/solicitudes/aceptar-solicitud-dialog"
import { RechazarSolicitudDialog } from "@/components/solicitudes/rechazar-solicitud-dialog"
import { ConfirmarPagoDialog } from "@/components/solicitudes/confirmar-pago-dialog"
import { FinalizarServicioDialog } from "@/components/solicitudes/finalizar-servicio-dialog"

export default function SolicitudesRecibidasPage() {
  const [solicitudes, setSolicitudes] = useState<SolicitudRecibida[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState<SolicitudRecibida | null>(null)
  const [dialogoAceptar, setDialogoAceptar] = useState(false)
  const [dialogoRechazar, setDialogoRechazar] = useState(false)
  const [dialogoConfirmarPago, setDialogoConfirmarPago] = useState(false)
  const [dialogoFinalizar, setDialogoFinalizar] = useState(false)

  useEffect(() => {
    cargarSolicitudes()
  }, [])

  const cargarSolicitudes = async () => {
    try {
      setLoading(true)
      setError(null)
      const idPrestamista = getCurrentUserId()
      const response = await dataService.getSolicitudesPrestamista(idPrestamista)

      if (response.success) {
        setSolicitudes(response.data)
      } else {
        setError(response.message)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido")
    } finally {
      setLoading(false)
    }
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "solicitado":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-300">
            <Clock className="w-3 h-3 mr-1" />
            Solicitado
          </Badge>
        )
      case "pendiente_pago":
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-300">
            <DollarSign className="w-3 h-3 mr-1" />
            Pendiente Pago
          </Badge>
        )
      case "rechazado":
        return (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" />
            Rechazado
          </Badge>
        )
      case "ejecucion":
        return (
          <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">
            <Play className="w-3 h-3 mr-1" />
            En Ejecución
          </Badge>
        )
      case "finalizado":
        return (
          <Badge variant="default" className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="w-3 h-3 mr-1" />
            Finalizado
          </Badge>
        )
      default:
        return <Badge variant="outline">{estado}</Badge>
    }
  }

  const formatearFecha = (fechaISO: string) => {
    const fecha = new Date(fechaISO)
    return fecha.toLocaleDateString("es-PE", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatearPrecio = (precio: number) => {
    return `S/ ${precio.toFixed(2)}`
  }

  const contarPorEstado = (estado: string) => {
    return solicitudes.filter((s) => s.estado === estado).length
  }

  const renderAcciones = (solicitud: SolicitudRecibida) => {
    switch (solicitud.estado) {
      case "solicitado":
        return (
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => {
                setSolicitudSeleccionada(solicitud)
                setDialogoAceptar(true)
              }}
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Aceptar
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setSolicitudSeleccionada(solicitud)
                setDialogoRechazar(true)
              }}
            >
              <XCircle className="w-4 h-4 mr-1" />
              Rechazar
            </Button>
            <Button size="sm" variant="ghost">
              <MessageSquare className="w-4 h-4 mr-1" />
              Responder
            </Button>
          </div>
        )
      case "pendiente_pago":
        return (
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                setSolicitudSeleccionada(solicitud)
                setDialogoConfirmarPago(true)
              }}
            >
              <Play className="w-4 h-4 mr-1" />
              Confirmar Pago
            </Button>
            <Button size="sm" variant="outline">
              <MessageSquare className="w-4 h-4 mr-1" />
              Contactar Cliente
            </Button>
            <Button size="sm" variant="ghost">
              Ver Detalles
            </Button>
          </div>
        )
      case "ejecucion":
        return (
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => {
                setSolicitudSeleccionada(solicitud)
                setDialogoFinalizar(true)
              }}
            >
              <Square className="w-4 h-4 mr-1" />
              Finalizar Servicio
            </Button>
            <Button size="sm" variant="outline">
              <MessageSquare className="w-4 h-4 mr-1" />
              Contactar Cliente
            </Button>
            <Button size="sm" variant="ghost">
              Ver Progreso
            </Button>
          </div>
        )
      case "finalizado":
        return (
          <div className="flex gap-2 pt-2">
            <Button size="sm" variant="outline">
              Ver Detalles
            </Button>
            <Button size="sm" variant="ghost">
              Ver Calificación
            </Button>
          </div>
        )
      case "rechazado":
        return (
          <div className="flex gap-2 pt-2">
            <Button size="sm" variant="outline">
              Ver Detalles
            </Button>
          </div>
        )
      default:
        return null
    }
  }

  const handleOperacionExitosa = () => {
    cargarSolicitudes() // Recargar las solicitudes
  }

  const renderSolicitudCard = (solicitud: SolicitudRecibida) => (
    <Card key={solicitud.id}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{solicitud.servicio.titulo}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <User className="w-4 h-4" />
              <span>
                {solicitud.cliente.nombres} {solicitud.cliente.apellidos}
              </span>
            </div>
          </div>
          {getEstadoBadge(solicitud.estado)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="text-sm font-medium mb-1">Mensaje del cliente:</p>
            <p className="text-sm">{solicitud.mensaje}</p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatearFecha(solicitud.fecha)}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{solicitud.servicio.ubicacion}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              <span className="font-medium text-foreground">{formatearPrecio(solicitud.costo)}</span>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            <p>Cliente: {solicitud.cliente.correo}</p>
            <p>Modalidad: {solicitud.servicio.modalidad}</p>
            {solicitud.estado === "finalizado" && solicitud.puntuacion > 0 && (
              <p>Calificación: {solicitud.puntuacion}/5 ⭐</p>
            )}
          </div>

          {renderAcciones(solicitud)}
        </div>
      </CardContent>
    </Card>
  )

  const filtrarPorEstado = (estado: string) => {
    if (estado === "todas") return solicitudes
    return solicitudes.filter((s) => s.estado === estado)
  }

  if (loading) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Cargando solicitudes...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <AlertCircle className="w-8 h-8 text-destructive mx-auto mb-4" />
            <p className="text-destructive mb-4">Error al cargar las solicitudes</p>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={cargarSolicitudes}>Reintentar</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Solicitudes Recibidas</h1>
        <Button variant="outline" onClick={cargarSolicitudes}>
          Actualizar
        </Button>
      </div>
      <p className="text-muted-foreground">
        Gestiona las solicitudes que has recibido para tus servicios como prestamista.
      </p>

      <Tabs defaultValue="todas" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="todas">Todas ({solicitudes.length})</TabsTrigger>
          <TabsTrigger value="solicitado">Solicitadas ({contarPorEstado("solicitado")})</TabsTrigger>
          <TabsTrigger value="pendiente_pago">Pendiente Pago ({contarPorEstado("pendiente_pago")})</TabsTrigger>
          <TabsTrigger value="ejecucion">En Ejecución ({contarPorEstado("ejecucion")})</TabsTrigger>
          <TabsTrigger value="finalizado">Finalizadas ({contarPorEstado("finalizado")})</TabsTrigger>
          <TabsTrigger value="rechazado">Rechazadas ({contarPorEstado("rechazado")})</TabsTrigger>
        </TabsList>

        <TabsContent value="todas">
          <div className="space-y-4">
            {solicitudes.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No tienes solicitudes recibidas</p>
              </div>
            ) : (
              solicitudes.map(renderSolicitudCard)
            )}
          </div>
        </TabsContent>

        <TabsContent value="solicitado">
          <div className="space-y-4">{filtrarPorEstado("solicitado").map(renderSolicitudCard)}</div>
        </TabsContent>

        <TabsContent value="pendiente_pago">
          <div className="space-y-4">{filtrarPorEstado("pendiente_pago").map(renderSolicitudCard)}</div>
        </TabsContent>

        <TabsContent value="ejecucion">
          <div className="space-y-4">{filtrarPorEstado("ejecucion").map(renderSolicitudCard)}</div>
        </TabsContent>

        <TabsContent value="finalizado">
          <div className="space-y-4">{filtrarPorEstado("finalizado").map(renderSolicitudCard)}</div>
        </TabsContent>

        <TabsContent value="rechazado">
          <div className="space-y-4">{filtrarPorEstado("rechazado").map(renderSolicitudCard)}</div>
        </TabsContent>
      </Tabs>
      {/* Diálogos para gestión de solicitudes */}
      {solicitudSeleccionada && (
        <>
          <AceptarSolicitudDialog
            open={dialogoAceptar}
            onOpenChange={setDialogoAceptar}
            solicitud={solicitudSeleccionada}
            onSuccess={handleOperacionExitosa}
          />
          <RechazarSolicitudDialog
            open={dialogoRechazar}
            onOpenChange={setDialogoRechazar}
            solicitud={solicitudSeleccionada}
            onSuccess={handleOperacionExitosa}
          />
          <ConfirmarPagoDialog
            open={dialogoConfirmarPago}
            onOpenChange={setDialogoConfirmarPago}
            solicitud={solicitudSeleccionada}
            onSuccess={handleOperacionExitosa}
          />
          <FinalizarServicioDialog
            open={dialogoFinalizar}
            onOpenChange={setDialogoFinalizar}
            solicitud={solicitudSeleccionada}
            onSuccess={handleOperacionExitosa}
          />
        </>
      )}
    </div>
  )
}
