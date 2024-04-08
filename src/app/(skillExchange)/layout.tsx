import MainMenuUser from "@/components/MainMenuUser";
import Usuario from "@/interfaces/Usuario";
import { backendInstance } from "@/utils/constants.backend"
import { getServerInstanceAuthorized } from "@/utils/constants.server"

export default async ({ children }: { children: React.ReactNode }) => {
    const usuarioResponse = await getServerInstanceAuthorized().get("usuario");
    const usuario = usuarioResponse.data as Usuario;

    if (usuario) {
        return (
            <MainMenuUser usuario={usuario}>
                {children}
            </MainMenuUser>
        )
    }
    return (
        <>{children}</>
    );
}

