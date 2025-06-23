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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { XCircle, AlertTriangle, Loader2 } from "lucide-react"
import { dataService } from "@/lib/services/data-service"
import type { SolicitudRecibida } from "@/lib/types/api-responses"

interface RechazarSolicitudDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  solicitud: SolicitudRecibida
  onSuccess: () => void
}

const motivosRechazo = [
  { value: "no_disponible", label: "No estoy disponible en esa fecha/hora" },
  { value: "fuera_area", label: "Está fuera de mi área de servicio" },
  { value: "precio_inadecuado", label: "El precio propuesto no es adecuado" },
  { value: "otro", label: "Otro motivo" },
]

export function RechazarSolicitudDialog({ open, onOpenChange, solicitud, onSuccess }: RechazarSolicitudDialogProps) {
  const [loading, setLoading] = useState(false)
  const [motivo, setMotivo] = useState<string>("")
  const [detalleMotivo, setDetalleMotivo] = useState("")
  const [sugerencia, setSugerencia] = useState("")

  const handleRechazar = async () => {
    if (!motivo || !detalleMotivo.trim()) {
      return
    }

    try {
      setLoading(true)

      const response = await dataService.rechazarSolicitud({
        idSolicitud: solicitud.id,
        motivo: motivo as any,
        detalleMotivo: detalleMotivo,
        sugerenciaAlternativa: sugerencia || undefined,
      })

      if (response.success) {
        onSuccess()
        onOpenChange(false)
        // Reset form
        setMotivo("")
        setDetalleMotivo("")
        setSugerencia("")
      } else {
        console.error("Error al rechazar solicitud:", response.message)
      }
    } catch (error) {
      console.error("Error al rechazar solicitud:", error)
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = motivo && detalleMotivo.trim()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-600" />
            Rechazar Solicitud
          </DialogTitle>
          <DialogDescription>
            Vas a rechazar la solicitud de{" "}
            <span className="font-medium">
              {solicitud.cliente.nombres} {solicitud.cliente.apellidos}
            </span>{" "}
            para el servicio "{solicitud.servicio.titulo}".
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-red-900 mb-1">Importante</h4>
                <p className="text-sm text-red-800">
                  Al rechazar esta solicitud, el cliente será notificado y no podrás cambiar esta decisión. Proporciona
                  un motivo claro y profesional.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="motivo">Motivo del rechazo *</Label>
            <Select value={motivo} onValueChange={setMotivo}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el motivo principal" />
              </SelectTrigger>
              <SelectContent>
                {motivosRechazo.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="detalle">Explicación detallada *</Label>
            <Textarea
              id="detalle"
              placeholder="Explica de manera clara y profesional el motivo del rechazo..."
              value={detalleMotivo}
              onChange={(e) => setDetalleMotivo(e.target.value)}
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sugerencia">Sugerencia alternativa (opcional)</Label>
            <Textarea
              id="sugerencia"
              placeholder="Ej: Podrías contactar a [otro proveedor], o podríamos reagendar para [fecha alternativa]..."
              value={sugerencia}
              onChange={(e) => setSugerencia(e.target.value)}
              rows={2}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleRechazar} disabled={loading || !isFormValid}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Rechazando...
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 mr-2" />
                Rechazar Solicitud
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
