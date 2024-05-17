import { obtenerUsuarioLogged } from "@/actions/usuario.actions";
import MainMenuUser from "@/components/MainMenuUser";

export default async ({ children }: Readonly<{ children: React.ReactNode }>) => {
    let usuario = undefined;
    try {
        usuario = await obtenerUsuarioLogged();
    } catch {
        usuario = undefined;
    }

    return (
        <MainMenuUser usuario={usuario}>
            {children}
        </MainMenuUser>
    );
}