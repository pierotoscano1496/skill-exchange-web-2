import { RegistroUsuarioProvider } from "@/contexts/RegistroUsuarioProvider"

export default ({
    children
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <RegistroUsuarioProvider>
            {children}
        </RegistroUsuarioProvider>
    )
};