"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Clock, LogIn, AlertTriangle, RefreshCw, ShieldCheck } from "lucide-react"
import Link from "next/link"

export default function SessionExpiredPage() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)

  // Countdown effect for auto-redirect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      router.push("/login")
    }
  }, [countdown, router])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto bg-yellow-100 text-yellow-700 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <Clock className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl font-bold">Sesión finalizada</CardTitle>
          <CardDescription className="text-lg">Tu sesión ha expirado por motivos de seguridad</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Alert className="bg-muted border-muted-foreground/20">
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            <AlertDescription>
              Serás redirigido a la página de inicio de sesión en {countdown} segundos...
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Protegemos tu seguridad</h3>
                <p className="text-sm text-muted-foreground">
                  Tu sesión ha finalizado automáticamente después de un período de inactividad para proteger tu
                  información.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <RefreshCw className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">¿Qué ocurrió?</h3>
                <p className="text-sm text-muted-foreground">Las sesiones expiran cuando:</p>
                <ul className="text-sm text-muted-foreground list-disc list-inside ml-2 mt-1">
                  <li>No has interactuado con la plataforma por un tiempo</li>
                  <li>Has cerrado sesión en otro dispositivo</li>
                  <li>Se ha detectado un cambio en tu conexión</li>
                  <li>Se ha actualizado la plataforma</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-3">
          <Button className="w-full" onClick={() => router.push("/login")}>
            <LogIn className="mr-2 h-4 w-4" /> Iniciar sesión nuevamente
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            ¿Necesitas ayuda?{" "}
            <Link href="/ayuda" className="text-primary hover:underline">
              Contacta con soporte
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
