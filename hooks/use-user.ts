import { useState, useEffect } from "react";
import { dataService } from "@/lib/services/data-service";
import { Usuario } from "@/lib/types/api-responses";

export function useUser() {
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const response = await dataService.getUsuario();
      if (response.success) {
        setUser(response.data);
      } else {
        console.error("Error fetching user data:", response.message);
        setUser(null);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  return { user, loading };
}
