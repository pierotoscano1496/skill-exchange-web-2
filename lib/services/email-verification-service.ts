import { ENV_CONFIG } from "@/lib/config/environment";

class EmailVerificationService {
  private baseUrl = ENV_CONFIG.API.BASE_URL;

  async verifyEmail(
    token: string
  ): Promise<{ ok: true } | { ok: false; error: string }> {
    try {
      const response = await fetch(
        `${this.baseUrl}${
          ENV_CONFIG.API.ENDPOINTS.VERIFY_EMAIL
        }?token=${encodeURIComponent(token)}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          ok: false,
          error: errorData.message || "Token inválido o expirado.",
        };
      }

      return { ok: true };
    } catch (err) {
      console.error("Verify email error:", err);
      return { ok: false, error: "Error al verificar el email." };
    }
  }

  async resendVerification(
    email: string
  ): Promise<{ ok: true } | { ok: false; error: string }> {
    try {
      const response = await fetch(
        `${this.baseUrl}${ENV_CONFIG.API.ENDPOINTS.RESEND_VERIFICATION}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          ok: false,
          error: errorData.message || "Error al reenviar verificación.",
        };
      }

      return { ok: true };
    } catch (err) {
      console.error("Resend verification error:", err);
      return { ok: false, error: "Error al reenviar la verificación." };
    }
  }
}

export const emailVerificationService = new EmailVerificationService();
