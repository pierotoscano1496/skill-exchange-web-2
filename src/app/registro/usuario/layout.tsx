import { RegistroUsuarioProvider } from "@/contexts/RegistroUsuarioProvider";

const RegistroUsuarioLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="bg-gradient-to-r from-blue-50 to-blue-100 p-12">
      <RegistroUsuarioProvider>{children}</RegistroUsuarioProvider>
    </main>
  );
};

RegistroUsuarioLayout.displayName = "RegistroUsuarioLayout";

export default RegistroUsuarioLayout;
