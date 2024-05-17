import { RegistroUsuarioProvider } from "@/contexts/RegistroUsuarioProvider"

export default ({
    children
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <main className="hero">
            <RegistroUsuarioProvider>
                {children}
            </RegistroUsuarioProvider>
        </main>
    )
};