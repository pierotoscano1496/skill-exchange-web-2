import { obtenerUsuarioLogged } from "@/actions/usuario.actions";
import SELinkButton from "@/components/skill-exchange/SELinkButton";
import classNames from "classnames";
import styles from "@/app/styles/tailwind.module.scss";

const MainPage = async () => {
  let usuario = null;
  try {
    usuario = await obtenerUsuarioLogged();
  } catch {
    usuario = null;
  }

  return (
    <main
      className={classNames(
        "flex flex-col items-center justify-between min-h-screen bg-fondo-principal",
        styles.backgroundPrincipal
      )}
    >
      <section className="text-center py-12 px-6" id="inicio">
        <h1 className="text-4xl font-extrabold text-primary">
          Chambita: Encuentra y ofrece trabajos informales
        </h1>
        <h2 className="text-lg font-medium text-gray-700 mt-4">
          Conecta con personas que necesitan tus habilidades, ya sea por hobby o
          experiencia.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {[
            {
              title: "Publica tus habilidades",
              description:
                "¿Sabes hacer algo bien? Publica tus servicios y encuentra personas interesadas en contratarte.",
              bg: "bg-orange-100",
            },
            {
              title: "Encuentra ayuda fácilmente",
              description:
                "Busca personas cerca de ti que puedan ayudarte con tareas del día a día o proyectos específicos.",
              bg: "bg-yellow-100",
            },
            {
              title: "Regístrate gratis",
              description:
                "Crea tu cuenta en minutos y empieza a conectar con otros usuarios.",
              bg: "bg-green-100",
            },
            {
              title: "Fácil y seguro",
              description:
                "Nuestra plataforma te permite comunicarte y coordinar de manera sencilla y confiable.",
              bg: "bg-blue-100",
            },
          ].map((card, index) => (
            <section
              key={index}
              className={`shadow-soft hover:shadow-deep ${card.bg} rounded-xl p-8`}
            >
              <h3 className="text-2xl font-bold text-gray-800">{card.title}</h3>
              <p className="mt-4 text-gray-700">{card.description}</p>
            </section>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-6 mt-16">
          {!usuario ? (
            <>
              <SELinkButton
                link="/registro/usuario"
                size="large"
                className="bg-primary text-white"
              >
                Regístrate ahora
              </SELinkButton>
              <SELinkButton
                link="/login"
                size="large"
                className="bg-secondary text-white"
              >
                Inicia sesión
              </SELinkButton>
            </>
          ) : (
            <>
              <SELinkButton
                link="/profile"
                size="large"
                className="bg-primary text-white"
              >
                Ir a mi perfil
              </SELinkButton>
              <SELinkButton
                link="/servicio"
                size="large"
                className="bg-secondary text-white"
              >
                Busca servicios
              </SELinkButton>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

MainPage.displayName = "MainPage";

export default MainPage;
