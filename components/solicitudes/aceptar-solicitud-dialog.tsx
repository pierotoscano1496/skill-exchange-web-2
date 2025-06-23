"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { CheckCircle, Calendar, FileText, Loader2 } from "lucide-react"
import { dataService } from "@/lib/services/data-service"
import type { SolicitudRecibida } from "@/lib/types/api-responses"

interface AceptarSolicitudDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  solicitud: SolicitudRecibida
  onSuccess: () => void
}

export function AceptarSolicitudDialog({ open, onOpenChange, solicitud, onSuccess }: AceptarSolicitudDialogProps) {
  const [loading, setLoading] = useState(false)
  const [fechaInicio, setFechaInicio] = useState("")
  const [notas, setNotas] = useState("")

  const handleAceptar = async () => {
    try {
      setLoading(true)

      const response = await dataService.aceptarSolicitud({
        idSolicitud: solicitud.id,
        fechaInicioEstimada: fechaInicio || undefined,
        notasProveedor: notas || undefined,
      })

      if (response.success) {
        onSuccess()
        onOpenChange(false)
        // Reset form
        setFechaInicio("")
        setNotas("")
      } else {
        console.error("Error al aceptar solicitud:", response.message)
      }
    } catch (error) {
      console.error("Error al aceptar solicitud:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Aceptar Solicitud
          </DialogTitle>
          <DialogDescription>
            Estás a punto de aceptar la solicitud de{" "}
            <span className="font-medium">
              {solicitud.cliente.nombres} {solicitud.cliente.apellidos}
            </span>{" "}
            para el servicio "{solicitud.servicio.titulo}".
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">¿Qué sucede al aceptar?</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• El cliente será notificado de tu aceptación</li>
              <li>• La solicitud pasará a estado "Pendiente de Pago"</li>
              <li>• El cliente deberá realizar el pago acordado</li>
              <li>• Una vez pagado, podrás iniciar el servicio</li>
            </ul>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fecha-inicio" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Fecha estimada de inicio (opcional)
            </Label>
            <Input
              id="fecha-inicio"
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notas" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Notas adicionales para el cliente (opcional)
            </Label>
            <Textarea
              id="notas"
              placeholder="Ej: Necesito que tengas los materiales listos, confirma la dirección exacta..."
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              rows={3}
            />
          </div>

          <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
            <p className="text-sm text-amber-800">
              <strong>Importante:</strong> Al aceptar te comprometes a realizar el servicio. Asegúrate de tener
              disponibilidad y los recursos necesarios.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancelar
          </Button>
          <Button onClick={handleAceptar} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Aceptando...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Aceptar Solicitud
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
