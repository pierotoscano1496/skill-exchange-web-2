import MainMenuUser from "@/components/MainMenuUser";
import ChatPanel from "@/components/chats/ChatPanel";
import Usuario from "@/interfaces/Usuario";
import { backendInstance } from "@/utils/constants.backend"
import { getServerInstanceAuthorized } from "@/utils/constants.server"

export default async ({ children }: { children: React.ReactNode }) => {
    const usuarioResponse = await getServerInstanceAuthorized().get("usuario");
    const usuario = usuarioResponse.data as Usuario;

    if (usuario) {
        return (
            <>
                <MainMenuUser usuario={usuario}>
                    {children}
                </MainMenuUser>
                <ChatPanel idUsuario={usuario.id} />
            </>
        )
    }
    return (
        <>{children}</>
    );
}

