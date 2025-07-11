"use client";

import { ENV_CONFIG } from "@/lib/config/environment";

class AuthService {
  private baseUrl = ENV_CONFIG.API.BASE_URL;
  private loginEndpoint = ENV_CONFIG.API.ENDPOINTS.LOGIN;

  async login(email: string, password: string): Promise<string | null> {
    try {
      const response = await fetch(`${this.baseUrl}${this.loginEndpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        console.error("Login failed with status:", response.status);
        return null;
      }

      const token = response.headers.get("Authorization");

      if (token) {
        // Assuming the token is "Bearer <jwt>", let's store the whole string.
        // The api-service already adds the "Bearer " prefix if it's missing,
        // but it's better to be consistent.
        localStorage.setItem("token", token);
        return token;
      }

      console.error("Authorization header not found in response.");
      return null;
    } catch (error) {
      console.error("An unexpected error occurred during login:", error);
      return null;
    }
  }

  logout() {
    localStorage.removeItem("token");
  }
}

export const authService = new AuthService();
