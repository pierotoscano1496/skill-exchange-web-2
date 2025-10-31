"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Usuario } from "@/lib/types/api-responses";
import { getUsuario } from "@/lib/actions/cookies";
import { ca } from "date-fns/locale";

interface UserContextType {
  user: Usuario | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const usuario = await getUsuario();
        setUser(usuario);
      } catch (error) {
        console.error(error);
        setUser(null);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}
