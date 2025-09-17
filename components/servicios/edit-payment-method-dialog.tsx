'use client'

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ModalidadPagoTipo } from '@/lib/constants/enums'
import { ModalidadPagoServicio } from '@/lib/types/api-responses'
import { CreditCard, Smartphone, Globe, Banknote, Plus } from 'lucide-react'

interface EditPaymentMethodDialogProps {
  metodo?: ModalidadPagoServicio
  onSave: (metodo: ModalidadPagoServicio) => void
  children: React.ReactNode
}

const tiposPago = [
  {
    id: ModalidadPagoTipo.YAPE,
    nombre: 'Yape',
    descripcion: 'Pago móvil con Yape',
    icono: Smartphone,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    id: ModalidadPagoTipo.TARJETA,
    nombre: 'Tarjeta',
    descripcion: 'Transferencia bancaria',
    icono: CreditCard,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    id: ModalidadPagoTipo.LINEA,
    nombre: 'Pago en línea',
    descripcion: 'PayPal, Stripe, etc.',
    icono: Globe,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    id: ModalidadPagoTipo.EFECTIVO,
    nombre: 'Efectivo',
    descripcion: 'Pago en persona',
    icono: Banknote,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
  },
]

export function EditPaymentMethodDialog({ metodo, onSave, children }: EditPaymentMethodDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [nuevaModalidad, setNuevaModalidad] = useState<ModalidadPagoServicio>(metodo || { id: '', tipo: ModalidadPagoTipo.YAPE })
  const [erroresModalidad, setErroresModalidad] = useState<Record<string, string>>({})

  const validarNuevaModalidad = (): boolean => {
    const errores: Record<string, string> = {}

    if (nuevaModalidad.tipo === ModalidadPagoTipo.YAPE) {
      if (!nuevaModalidad.numeroCelular) {
        errores.numeroCelular = 'El número de celular es requerido.'
      } else if (!/^9\d{8}$/.test(nuevaModalidad.numeroCelular)) {
        errores.numeroCelular =
          'Ingresa un número de celular válido (9 dígitos, empezando con 9).'
      }
    } else if (nuevaModalidad.tipo === ModalidadPagoTipo.TARJETA) {
      if (!nuevaModalidad.cuentaBancaria) {
        errores.cuentaBancaria = 'La cuenta bancaria es requerida.'
      } else if (nuevaModalidad.cuentaBancaria.length < 10) {
        errores.cuentaBancaria =
          'La cuenta bancaria debe tener al menos 10 caracteres.'
      }
    } else if (nuevaModalidad.tipo === ModalidadPagoTipo.LINEA) {
      if (!nuevaModalidad.url) {
        errores.url = 'La URL del proveedor es requerida.'
      } else if (!/^https?:\/\/.+/.test(nuevaModalidad.url)) {
        errores.url =
          'Ingresa una URL válida (debe empezar con http:// o https://).'
      }
    }

    setErroresModalidad(errores)
    return Object.keys(errores).length === 0
  }

  const handleSave = () => {
    if (validarNuevaModalidad()) {
      onSave(nuevaModalidad)
      setIsDialogOpen(false)
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{metodo ? 'Editar' : 'Agregar'} modalidad de pago</DialogTitle>
          <DialogDescription>
            Configura una forma de pago para tu servicio.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="tipo-pago">Tipo de pago</Label>
            <Select
              value={nuevaModalidad.tipo}
              onValueChange={(value: ModalidadPagoTipo) =>
                setNuevaModalidad({ ...nuevaModalidad, tipo: value })
              }
            >
              <SelectTrigger
                id="tipo-pago"
                className={erroresModalidad.tipo ? 'border-red-500' : ''}
              >
                <SelectValue placeholder="Selecciona un tipo de pago" />
              </SelectTrigger>
              <SelectContent>
                {tiposPago.map((tipo) => (
                  <SelectItem key={tipo.id} value={tipo.id}>
                    <div className="flex items-center gap-2">
                      <tipo.icono className={`h-4 w-4 ${tipo.color}`} />
                      <span>{tipo.nombre}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {erroresModalidad.tipo && (
              <p className="text-sm text-red-500">{erroresModalidad.tipo}</p>
            )}
          </div>

          {nuevaModalidad.tipo === ModalidadPagoTipo.YAPE && (
            <div className="space-y-2">
              <Label htmlFor="numero-celular">Número de celular</Label>
              <Input
                id="numero-celular"
                placeholder="987654321"
                value={nuevaModalidad.numeroCelular || ''}
                onChange={(e) =>
                  setNuevaModalidad({
                    ...nuevaModalidad,
                    numeroCelular: e.target.value,
                  })
                }
                className={erroresModalidad.numeroCelular ? 'border-red-500' : ''}
              />
              {erroresModalidad.numeroCelular && (
                <p className="text-sm text-red-500">{erroresModalidad.numeroCelular}</p>
              )}
            </div>
          )}

          {nuevaModalidad.tipo === ModalidadPagoTipo.TARJETA && (
            <div className="space-y-2">
              <Label htmlFor="cuenta-bancaria">Cuenta bancaria</Label>
              <Input
                id="cuenta-bancaria"
                placeholder="1234567890123456"
                value={nuevaModalidad.cuentaBancaria || ''}
                onChange={(e) =>
                  setNuevaModalidad({
                    ...nuevaModalidad,
                    cuentaBancaria: e.target.value,
                  })
                }
                className={erroresModalidad.cuentaBancaria ? 'border-red-500' : ''}
              />
              {erroresModalidad.cuentaBancaria && (
                <p className="text-sm text-red-500">{erroresModalidad.cuentaBancaria}</p>
              )}
            </div>
          )}

          {nuevaModalidad.tipo === ModalidadPagoTipo.LINEA && (
            <div className="space-y-2">
              <Label htmlFor="url-proveedor">URL del proveedor</Label>
              <Input
                id="url-proveedor"
                placeholder="https://paypal.me/tuusuario"
                value={nuevaModalidad.url || ''}
                onChange={(e) =>
                  setNuevaModalidad({
                    ...nuevaModalidad,
                    url: e.target.value,
                  })
                }
                className={erroresModalidad.url ? 'border-red-500' : ''}
              />
              {erroresModalidad.url && (
                <p className="text-sm text-red-500">{erroresModalidad.url}</p>
              )}
            </div>
          )}

          {nuevaModalidad.tipo === ModalidadPagoTipo.EFECTIVO && (
            <div className="p-4 bg-muted/50 rounded-md">
              <p className="text-sm text-muted-foreground">
                El pago en efectivo se realizará al momento de prestar el servicio. No se requieren datos adicionales.
              </p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
