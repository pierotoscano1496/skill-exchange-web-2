import { obtenerUsuarioLogged } from "@/actions/usuario.actions";
import SENavbar from "@/components/skill-exchange/SENavbar";

export default async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-12">
      {children}
    </main>
  );
};
