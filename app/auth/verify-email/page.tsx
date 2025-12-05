"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { emailVerificationService } from "@/lib/services/email-verification-service";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Token no encontrado en la URL.");
      return;
    }

    const verify = async () => {
      const result = await emailVerificationService.verifyEmail(token);
      if (result.ok) {
        setStatus("success");
        setMessage("¡Tu email ha sido verificado exitosamente!");
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        setStatus("error");
        setMessage(result.error);
      }
    };

    verify();
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="text-center text-primary font-bold text-2xl mb-2">
            Chambita
          </div>
          <CardTitle className="text-2xl font-bold">
            Verificación de Email
          </CardTitle>
          <CardDescription>
            Estamos verificando tu dirección de email...
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          {status === "loading" && (
            <div className="flex flex-col items-center space-y-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p>Verificando...</p>
            </div>
          )}
          {status === "success" && (
            <div className="flex flex-col items-center space-y-2">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <p className="text-green-600">{message}</p>
              <p className="text-sm text-muted-foreground">
                Serás redirigido al inicio de sesión en unos segundos.
              </p>
            </div>
          )}
          {status === "error" && (
            <div className="flex flex-col items-center space-y-2">
              <XCircle className="h-8 w-8 text-red-500" />
              <p className="text-red-600">{message}</p>
              <p className="text-sm text-muted-foreground">
                El enlace puede haber expirado o ser inválido.
              </p>
            </div>
          )}
        </CardContent>
        {status === "error" && (
          <CardFooter>
            <Button onClick={() => router.push("/login")} className="w-full">
              Ir al inicio de sesión
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
