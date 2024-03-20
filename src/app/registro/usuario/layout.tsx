import { RegistroUsuarioProvider } from "@/contexts/RegistroUsuarioProvider"

const RegistroUsuarioLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <RegistroUsuarioProvider>
            {children}
        </RegistroUsuarioProvider>
    )
}