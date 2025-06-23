import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { ServicioFormData } from "../page"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, ShieldCheck } from "lucide-react"

interface StepTerminosCondicionesProps {
  formData: ServicioFormData
  updateFormData: (data: Partial<ServicioFormData>) => void
  errors: Record<string, string>
}

export function StepTerminosCondiciones({ formData, updateFormData, errors }: StepTerminosCondicionesProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Términos y condiciones del servicio</h3>

        <Card>
          <CardContent className="p-4 text-sm text-muted-foreground space-y-4">
            <p>Al publicar un servicio en Chambita, aceptas los siguientes términos y condiciones:</p>

            <div className="space-y-2">
              <h4 className="font-medium text-foreground flex items-center">
                <ShieldCheck className="h-4 w-4 mr-2 text-primary" />
                Responsabilidad del servicio
              </h4>
              <p>
                Eres responsable de la calidad y cumplimiento del servicio que ofreces. Chambita actúa como
                intermediario y no se hace responsable por la calidad o resultado final del servicio prestado.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-foreground flex items-center">
                <ShieldCheck className="h-4 w-4 mr-2 text-primary" />
                Veracidad de la información
              </h4>
              <p>
                Toda la información proporcionada debe ser veraz y precisa. No debes exagerar tus habilidades o
                experiencia, ni prometer resultados que no puedas cumplir.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-foreground flex items-center">
                <ShieldCheck className="h-4 w-4 mr-2 text-primary" />
                Comunicación con clientes
              </h4>
              <p>
                Te comprometes a mantener una comunicación respetuosa y profesional con los clientes potenciales,
                respondiendo a sus consultas en un tiempo razonable.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-foreground flex items-center">
                <ShieldCheck className="h-4 w-4 mr-2 text-primary" />
                Comisiones y pagos
              </h4>
              <p>
                Chambita cobra una comisión del 10% por cada servicio completado a través de la plataforma. Los pagos se
                procesarán según los términos establecidos en nuestras políticas de pago.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-foreground flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                Servicios prohibidos
              </h4>
              <p>
                No está permitido ofrecer servicios ilegales, fraudulentos, que infrinjan derechos de propiedad
                intelectual, que promuevan actividades peligrosas o que violen nuestras políticas comunitarias.
              </p>
            </div>

            <p>
              El incumplimiento de estos términos puede resultar en la suspensión o eliminación de tu cuenta y servicios
              publicados. Para más detalles, consulta nuestros{" "}
              <a href="#" className="text-primary hover:underline">
                Términos y Condiciones completos
              </a>
              .
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-start space-x-2 pt-4">
        <Checkbox
          id="aceptar-terminos"
          checked={formData.aceptaTerminos}
          onCheckedChange={(checked) => updateFormData({ aceptaTerminos: checked as boolean })}
          className={errors.aceptaTerminos ? "border-red-500" : ""}
        />
        <div className="grid gap-1.5 leading-none">
          <Label
            htmlFor="aceptar-terminos"
            className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
              errors.aceptaTerminos ? "text-red-500" : ""
            }`}
          >
            Acepto los términos y condiciones
          </Label>
          {errors.aceptaTerminos && <p className="text-sm text-red-500">{errors.aceptaTerminos}</p>}
        </div>
      </div>
    </div>
  )
}
