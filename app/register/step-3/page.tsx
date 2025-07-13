"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Check,
  Facebook,
  Instagram,
  Linkedin,
  Loader2,
  TwitterIcon as TikTok,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { userService, RegisterUserRequest } from "@/lib/services/user-service";

export default function RegisterStep3Page() {
  const router = useRouter();
  const [linkedin, setLinkedin] = useState<string>("");
  const [facebook, setFacebook] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [tiktok, setTiktok] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!linkedin && !facebook && !instagram && !tiktok) {
      newErrors.social = "Debes proporcionar al menos una red social";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setApiError(null);

    try {
      const savedData = localStorage.getItem("registrationData");
      if (!savedData) {
        throw new Error("No se encontraron datos de registro.");
      }

      const registrationData = JSON.parse(savedData);

      const requestData: RegisterUserRequest = {
        ...registrationData,
        perfilLinkedin: linkedin,
        perfilFacebook: facebook,
        perfilInstagram: instagram,
        perfilTiktok: tiktok,
      };

      const response = await userService.registerUser(requestData);

      if (response.success) {
        setSuccess(true);
        localStorage.removeItem("registrationData");
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        setApiError(response.message || "Ocurrió un error desconocido.");
      }
    } catch (error) {
      setApiError(
        error instanceof Error ? error.message : "Ocurrió un error inesperado."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push("/register/step-2");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                3
              </div>
              <CardTitle>Redes Sociales</CardTitle>
            </div>
            <div className="text-sm text-muted-foreground">Paso 3 de 3</div>
          </div>
          <CardDescription>
            Conecta tus perfiles para dar más confianza a otros usuarios.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {success ? (
            <Alert variant="default">
              <Check className="h-4 w-4" />
              <AlertTitle>¡Registro completado!</AlertTitle>
              <AlertDescription>
                Tu cuenta ha sido creada exitosamente. Serás redirigido al
                inicio de sesión en unos segundos.
              </AlertDescription>
            </Alert>
          ) : (
            <>
              {apiError && (
                <Alert variant="destructive">
                  <AlertTitle>Error en el registro</AlertTitle>
                  <AlertDescription>{apiError}</AlertDescription>
                </Alert>
              )}

              <div className="pt-4">
                <h3 className="text-sm font-medium mb-2">
                  Perfiles sociales (al menos uno)
                </h3>
                {errors.social && (
                  <p className="text-sm text-red-500 mb-2">{errors.social}</p>
                )}

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Linkedin className="h-5 w-5 text-[#0077B5]" />
                    <Input
                      placeholder="URL de LinkedIn"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      className="flex-1"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Facebook className="h-5 w-5 text-[#1877F2]" />
                    <Input
                      placeholder="URL de Facebook"
                      value={facebook}
                      onChange={(e) => setFacebook(e.target.value)}
                      className="flex-1"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Instagram className="h-5 w-5 text-[#E4405F]" />
                    <Input
                      placeholder="Usuario de Instagram"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      className="flex-1"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <TikTok className="h-5 w-5" />
                    <Input
                      placeholder="Usuario de TikTok"
                      value={tiktok}
                      onChange={(e) => setTiktok(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={isLoading || success}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Atrás
          </Button>
          <Button onClick={handleRegister} disabled={isLoading || success}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Finalizar registro"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
