"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { loginAction } from "../(auth)/actions";
import { HOME_PATH } from "@/lib/constants/auth";
import { emailVerificationService } from "@/lib/services/email-verification-service";

export default function LoginPage({ next = HOME_PATH }: { next?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [emailNotVerified, setEmailNotVerified] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setEmailNotVerified(false);
    const result = await loginAction(email, password);
    if (result.ok) {
      router.replace(next);
      router.refresh();
    } else {
      const errMsg = result.error || "Error al iniciar sesión";
      setError(errMsg);
      if (errMsg.includes("verificar") || errMsg.includes("email")) {
        setEmailNotVerified(true);
      }
    }
  };

  const handleResendVerification = async () => {
    setResendMessage(null);
    const result = await emailVerificationService.resendVerification(email);
    if (result.ok) {
      setResendMessage(
        "Email de verificación reenviado. Revisa tu bandeja de entrada."
      );
    } else {
      setResendMessage(result.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="text-center text-primary font-bold text-2xl mb-2">
            Chambita
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            ¡Hola de nuevo!
          </CardTitle>
          <CardDescription className="text-center">
            Ingresa a tu cuenta para continuar
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo o teléfono</Label>
              <Input
                id="email"
                type="text"
                placeholder="tu@correo.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  ¿La olvidaste?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {resendMessage && (
              <p className="text-green-500 text-sm">{resendMessage}</p>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              Entrar
            </Button>
            {emailNotVerified && (
              <div className="flex flex-col space-y-2">
                <Button
                  variant="outline"
                  onClick={handleResendVerification}
                  className="w-full"
                >
                  Reenviar email de verificación
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Revisa tu bandeja de entrada y carpeta de spam.
                </p>
              </div>
            )}
            <div className="text-center text-sm">
              ¿No tienes cuenta?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Regístrate aquí
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
